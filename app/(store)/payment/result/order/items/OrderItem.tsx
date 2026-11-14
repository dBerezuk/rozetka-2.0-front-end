import Link from 'next/link'

import { OrderItemImage } from '@/app/(store)/payment/result/order/items/OrderItemImage'
import { pagesConfig } from '@/config/pages.config'
import type { IOrder, IOrderItem } from '@/types/order.types'
import { formatPrice } from '@/utils/format-price.util'

interface IOrderItemProps {
	item: IOrderItem
	currency: IOrder['currency']
}

export function OrderItem({ item, currency }: IOrderItemProps) {
	return (
		<li className='flex flex-wrap items-start gap-4 py-5'>
			<OrderItemImage item={item} />
			<div className='min-w-0 flex-1 space-y-1'>
				<h3 className='font-medium break-words'>
					{item.product ? (
						<Link
							href={pagesConfig.getProduct(item.product.slug)}
							className='rounded-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-primary'
						>
							{item.title}
						</Link>
					) : (
						item.title
					)}
				</h3>
				<p className='text-xs text-gray-500'>SKU: {item.sku}</p>
				{item.optionValues.length > 0 && (
					<p className='text-xs text-gray-500'>
						{item.optionValues
							.map(option => `${option.name}: ${option.value}`)
							.join(' · ')}
					</p>
				)}
				<p className='text-sm text-gray-500'>
					{item.quantity} × {formatPrice(item.price, currency)}
				</p>
			</div>
			<p className='ml-auto font-semibold tabular-nums'>
				{formatPrice(Number(item.price) * item.quantity, currency)}
			</p>
		</li>
	)
}
