import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useId } from 'react'
import { useForm } from 'react-hook-form'

import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import {
	checkoutSchema,
	type TCheckoutFormValues
} from '@/schemas/checkout.schema'
import { paymentsService } from '@/services/payments.service'
import { checkoutDraftAtom } from '@/stores/checkout.store'
import type { IApiError } from '@/types/api.types'
import type { TCreatePaymentRequest } from '@/types/payment.types'
import type { IUser } from '@/types/user.types'
import { setServerValidationErrors } from '@/utils/set-server-validation-errors.util'

export function useCheckoutForm(profile: IUser, onClose: () => void) {
	const [storedDraft, setDraft] = useAtom(checkoutDraftAtom)
	const draft = storedDraft?.userId === profile.id ? storedDraft : null

	const queryClient = useQueryClient()
	const router = useRouter()
	const formId = useId()

	const form = useForm<TCheckoutFormValues>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			fullname: draft?.request.fullname ?? profile.fullname,
			email: draft?.request.email ?? profile.email,
			phone: draft?.request.phone ?? '',
			shippingAddress: draft?.request.shippingAddress ?? '',
			comment: draft?.request.comment ?? ''
		}
	})

	const mutation = useMutation({
		mutationFn: (request: TCreatePaymentRequest) =>
			paymentsService.create(request),
		onMutate: request => setDraft({ userId: profile.id, request }),
		onSuccess: order => {
			queryClient.setQueryData(
				queryKeysConfig.getOrder(profile.id, order.id),
				order
			)

			if (
				order.status === 'PENDING_PAYMENT' &&
				order.transaction?.pageUrl &&
				['CREATED', 'PROCESSING'].includes(order.transaction.status)
			) {
				window.location.assign(order.transaction.pageUrl)
			} else {
				onClose()

				router.replace(pagesConfig.getPaymentResult(order.id))
			}
		},
		onError: (error: IApiError) => {
			if (error.statusCode === 400 || error.statusCode === 422) {
				setDraft(null)

				setServerValidationErrors(error.fields, form.setError)
			}

			if (error.statusCode === 401) {
				void queryClient.invalidateQueries({
					queryKey: queryKeysConfig.profile
				})
			}
		},
		onSettled: () => {
			void queryClient.invalidateQueries({
				queryKey: queryKeysConfig.getCart(profile.id)
			})
		}
	})

	const onSubmitOrder = form.handleSubmit(values => {
		if (mutation.isPending) {
			return
		}

		mutation.mutate(
			draft?.request ?? { ...values, requestId: crypto.randomUUID() }
		)
	})

	return { ...form, formId, draft, mutation, onSubmitOrder }
}
