import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

import { queryKeysConfig } from '@/config/query-keys.config'
import { useProfile } from '@/hooks/useProfile'
import { ordersService } from '@/services/orders.service'
import { paymentsService } from '@/services/payments.service'
import { checkoutDraftAtom } from '@/stores/checkout.store'
import type { IApiError } from '@/types/api.types'
import type { IOrder } from '@/types/order.types'

export function useOrderResult(orderId: IOrder['id'] = '') {
	const profile = useProfile()
	const [draft, setDraft] = useAtom(checkoutDraftAtom)
	const queryClient = useQueryClient()
	const syncedOrder = useRef('')

	const userId = profile.data?.id
	const queryKey = queryKeysConfig.getOrder(userId, orderId)

	const query = useQuery<IOrder, IApiError>({
		queryKey,
		queryFn: ({ signal }) => ordersService.getById(orderId, signal),
		enabled: !!userId && !!orderId,
		staleTime: 0
	})

	const sync = useMutation<IOrder, IApiError>({
		mutationFn: () => paymentsService.sync(orderId),
		onSuccess: order => queryClient.setQueryData(queryKey, order)
	})

	const { mutate: syncPaymentStatus } = sync

	useEffect(() => {
		const order = query.data
		const key = `${userId}:${orderId}`

		if (
			order?.status === 'PENDING_PAYMENT' &&
			order.transaction?.invoiceId &&
			syncedOrder.current !== key
		) {
			syncedOrder.current = key

			syncPaymentStatus()
		}
	}, [query.data, userId, orderId, syncPaymentStatus])

	useEffect(() => {
		if (query.data && userId) {
			void queryClient.invalidateQueries({
				queryKey: queryKeysConfig.getCart(userId)
			})

			if (
				draft?.userId === userId &&
				draft.request.requestId === query.data.requestId
			) {
				setDraft(null)
			}
		}
	}, [query.data, userId, draft, setDraft, queryClient])

	return {
		profile,
		query,
		sync,
		onRefreshStatus: () => {
			if (query.data?.transaction?.invoiceId) {
				syncPaymentStatus()
			} else {
				void query.refetch()
			}
		}
	}
}
