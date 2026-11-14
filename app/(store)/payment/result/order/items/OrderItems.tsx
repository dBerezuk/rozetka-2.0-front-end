import { OrderItem } from '@/app/(store)/payment/result/order/items/OrderItem'
import type { IOrder } from '@/types/order.types'
import { formatPrice } from '@/utils/format-price.util'

interface IOrderItemsProps {
	order: IOrder
}

export function OrderItems({ order }: IOrderItemsProps) {
	const isRefunded =
		order.status === 'REFUNDED' || order.status === 'PARTIALLY_REFUNDED'

	return (
		<section className='rounded-2xl border border-gray-200 bg-white p-5 sm:p-6'>
			<h2 className='text-lg font-semibold'>Order items</h2>
			<ul className='mt-2 divide-y divide-gray-200'>
				{order.items.map(item => (
					<OrderItem key={item.id} item={item} currency={order.currency} />
				))}
			</ul>
			<div className='flex items-center justify-between gap-4 border-t border-gray-200 pt-5'>
				<p className='font-medium'>Order total</p>
				<p className='text-2xl font-semibold tabular-nums'>
					{formatPrice(order.amount, order.currency)}
				</p>
			</div>
			{order.transaction?.providerAmount != null &&
				order.transaction.providerCurrency != null && (
					<p className='mt-3 text-sm text-gray-500'>
						Bank payment amount:{' '}
						{formatPrice(
							order.transaction.providerAmount / 100,
							order.transaction.providerCurrency
						)}
					</p>
				)}
			{isRefunded && order.transaction?.finalAmount != null && (
				<p className='mt-3 text-sm text-gray-500'>
					Remaining paid amount:{' '}
					{formatPrice(
						order.transaction.finalAmount / 100,
						order.transaction.providerCurrency ?? order.transaction.currency
					)}
				</p>
			)}
		</section>
	)
}
