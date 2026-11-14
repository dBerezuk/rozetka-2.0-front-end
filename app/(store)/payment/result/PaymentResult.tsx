'use client'

import { OrderResultContent } from '@/app/(store)/payment/result/order/OrderResultContent'
import { useOrderResult } from '@/app/(store)/payment/result/order/useOrderResult'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { pagesConfig } from '@/config/pages.config'
import type { IOrder } from '@/types/order.types'

interface IPaymentResultProps {
	orderId?: IOrder['id']
}

export function PaymentResult({ orderId }: IPaymentResultProps) {
	const { profile, query, sync, onRefreshStatus } = useOrderResult(orderId)
	const isLoading = profile.isPending || (profile.data && query.isPending)

	return (
		<PageContent
			title='Your order'
			description='Order details and payment confirmation.'
		>
			{!orderId ? (
				<p role='alert'>
					This link is missing an order number. Please open your order link.
				</p>
			) : isLoading ? (
				<div role='status' aria-label='Loading order' className='space-y-5'>
					<Skeleton className='h-28 rounded-2xl' />
					<Skeleton className='h-80 rounded-2xl' />
				</div>
			) : !profile.data || query.error?.statusCode === 401 ? (
				<div className='space-y-4'>
					<p>Sign in to the account used for this order to view its details.</p>
					<Button
						url={`${pagesConfig.login}?${new URLSearchParams({ orderId })}`}
					>
						Sign in
					</Button>
				</div>
			) : (
				query.data && (
					<OrderResultContent
						order={query.data}
						isRefreshing={sync.isPending || query.isFetching}
						onRefreshStatus={onRefreshStatus}
					/>
				)
			)}
		</PageContent>
	)
}
