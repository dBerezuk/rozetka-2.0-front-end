import type { IOrder } from '@/types/order.types'
import { formatDate } from '@/utils/format-date.util'

interface IOrderDetailsProps {
	order: IOrder
}

export function OrderDetails({ order }: IOrderDetailsProps) {
	return (
		<section className='rounded-2xl border border-gray-200 bg-white p-5 sm:p-6'>
			<h2 className='text-lg font-semibold'>Order details</h2>
			<dl className='mt-5 space-y-5 text-sm'>
				<div>
					<dt className='text-gray-500'>Order number</dt>
					<dd className='mt-1 break-all font-medium'>{order.id}</dd>
				</div>
				<div>
					<dt className='text-gray-500'>Placed on</dt>
					<dd className='mt-1'>{formatDate(order.createdAt)}</dd>
				</div>
				<div>
					<dt className='text-gray-500'>Recipient</dt>
					<dd className='mt-1 space-y-1 break-words'>
						<p className='font-medium'>{order.fullname}</p>
						<p>{order.email}</p>
						<p>{order.phone}</p>
					</dd>
				</div>
				<div>
					<dt className='text-gray-500'>Delivery</dt>
					<dd className='mt-1 whitespace-pre-wrap break-words'>
						{order.shippingAddress}
					</dd>
				</div>
				{order.comment && (
					<div>
						<dt className='text-gray-500'>Comment</dt>
						<dd className='mt-1 whitespace-pre-wrap break-words'>
							{order.comment}
						</dd>
					</div>
				)}
				{order.transaction?.invoiceId && (
					<div>
						<dt className='text-gray-500'>Payment reference</dt>
						<dd className='mt-1 break-all'>{order.transaction.invoiceId}</dd>
					</div>
				)}
			</dl>
		</section>
	)
}
