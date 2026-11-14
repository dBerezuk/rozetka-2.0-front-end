import { CircleAlert, CircleCheck, Clock3, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { ORDER_STATUS_DETAILS } from '@/constants/order.constants'
import type { IOrder } from '@/types/order.types'
import { cn } from '@/utils/cn.util'

interface IOrderPaymentStatusProps {
	order: IOrder
	isRefreshing: boolean
	onRefreshStatus: () => void
}

export function OrderPaymentStatus({
	order,
	isRefreshing,
	onRefreshStatus
}: IOrderPaymentStatusProps) {
	const details = ORDER_STATUS_DETAILS[order.status]
	const isPaid = order.status === 'PAID'
	const isPending = order.status === 'PENDING_PAYMENT'
	const Icon = isPaid ? CircleCheck : isPending ? Clock3 : CircleAlert
	const isAwaitingConfirmation =
		isPending &&
		(order.transaction?.status === 'UNKNOWN' ||
			order.transaction?.status === 'INITIALIZING')

	return (
		<section
			aria-live='polite'
			className='flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6'
		>
			<div
				className={cn(
					'shrink-0 rounded-xl p-3',
					isPaid ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'
				)}
			>
				<Icon size={28} aria-hidden='true' />
			</div>
			<div className='min-w-0 flex-1 space-y-2'>
				<h2 className='text-xl font-semibold'>{details.title}</h2>
				<p className='text-sm leading-relaxed text-gray-500'>
					{isAwaitingConfirmation
						? 'We are waiting for bank confirmation. Do not create another payment for this order.'
						: details.description}
				</p>
			</div>
			<Button
				variant='outline'
				className='ml-auto'
				onClick={onRefreshStatus}
				disabled={isRefreshing}
			>
				<RefreshCw size={16} aria-hidden='true' />
				{isRefreshing ? 'Checking payment...' : 'Refresh payment status'}
			</Button>
		</section>
	)
}
