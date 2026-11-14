import { OrderItems } from '@/app/(store)/payment/result/order/items/OrderItems'
import { OrderDetails } from '@/app/(store)/payment/result/order/OrderDetails'
import { OrderPaymentStatus } from '@/app/(store)/payment/result/payment/OrderPaymentStatus'
import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import type { IOrder } from '@/types/order.types'

interface IOrderResultContentProps {
	order: IOrder
	isRefreshing: boolean
	onRefreshStatus: () => void
}

export function OrderResultContent({
	order,
	isRefreshing,
	onRefreshStatus
}: IOrderResultContentProps) {
	return (
		<div className='space-y-5'>
			<OrderPaymentStatus
				order={order}
				isRefreshing={isRefreshing}
				onRefreshStatus={onRefreshStatus}
			/>
			{!isRefreshing &&
				order.status === 'PENDING_PAYMENT' &&
				order.transaction?.pageUrl &&
				order.transaction.status === 'CREATED' && (
					<div className='flex justify-end'>
						<Button url={order.transaction.pageUrl}>Continue payment</Button>
					</div>
				)}
			<div className='grid items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]'>
				<OrderItems order={order} />
				<div className='space-y-5'>
					<OrderDetails order={order} />
					<Button
						url={pagesConfig.home}
						size='large'
						className='w-full bg-accent hover:bg-accent/90 focus-visible:outline-accent'
					>
						Continue shopping
					</Button>
				</div>
			</div>
		</div>
	)
}
