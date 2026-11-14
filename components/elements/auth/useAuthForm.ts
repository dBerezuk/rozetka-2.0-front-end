import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { PASSWORD_RESET_TOKEN_REGEX } from '@/constants/regex.constants'
import { getAuthSchema, type TAuthFormValues } from '@/schemas/auth.schema'
import { authService } from '@/services/auth.service'
import type { IApiError } from '@/types/api.types'
import type { TAuthMode } from '@/types/auth.types'
import { setServerValidationErrors } from '@/utils/set-server-validation-errors.util'

export function useAuthForm(initialMode: TAuthMode) {
	const searchParams = useSearchParams()
	const router = useRouter()
	const queryClient = useQueryClient()

	const token = searchParams.get('token')
	const orderId = searchParams.get('orderId')
	const mode =
		initialMode === 'resetPassword' && token !== null
			? 'newPassword'
			: initialMode

	const form = useForm<TAuthFormValues>({
		defaultValues: { fullname: '', email: '', password: '' },
		resolver: zodResolver(getAuthSchema(mode))
	})

	const mutation = useMutation({
		mutationFn: async ({ fullname, email, password }: TAuthFormValues) => {
			if (mode === 'resetPassword') {
				return authService.forgotPassword({ email })
			}

			if (mode === 'newPassword') {
				return authService.resetPassword({ token: token ?? '', password })
			}

			return mode === 'register'
				? authService.register({ fullname, email, password })
				: authService.login({ email, password })
		},
		onSuccess: data => {
			if ('id' in data) {
				queryClient.removeQueries({ queryKey: queryKeysConfig.myStores })
				queryClient.removeQueries({ queryKey: queryKeysConfig.profileStores })
				queryClient.removeQueries({ queryKey: queryKeysConfig.storeProducts })

				queryClient.setQueryData(queryKeysConfig.profile, data)

				toast.success(
					mode === 'register'
						? 'Account created successfully.'
						: 'Signed in successfully.'
				)

				router.replace(
					orderId ? pagesConfig.getPaymentResult(orderId) : pagesConfig.profile
				)

				return
			}

			if (mode === 'newPassword') {
				queryClient.setQueryData(queryKeysConfig.profile, null)
			}

			form.reset()

			toast.success(data.message)
		},
		onError: (error: IApiError) =>
			setServerValidationErrors(error.fields, form.setError)
	})

	const onSubmit = form.handleSubmit(values => {
		if (
			mode === 'newPassword' &&
			(!token || !PASSWORD_RESET_TOKEN_REGEX.test(token))
		) {
			toast.error('Invalid password reset link. Please request a new one.')

			return
		}

		mutation.mutate(values)
	})

	return {
		...form,
		mode,
		onSubmit,
		isPending: mutation.isPending,
		isSuccess: mutation.isSuccess
	}
}
