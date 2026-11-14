import type { TOrderStatus } from '@/types/order.types'

export const ORDER_STATUS_DETAILS: Record<
	TOrderStatus,
	{ title: string; description: string }
> = {
	PENDING_PAYMENT: {
		title: 'Payment pending',
		description: 'Your order is saved. Payment has not been confirmed yet.'
	},
	PAID: {
		title: 'Thank you for your order!',
		description:
			'Your payment has been confirmed. Your order is ready for processing.'
	},
	PAYMENT_FAILED: {
		title: 'Payment unsuccessful',
		description:
			'The bank did not confirm this payment. Your order details are saved.'
	},
	EXPIRED: {
		title: 'Payment link expired',
		description:
			'This payment link is no longer active. Your order remains unpaid.'
	},
	PARTIALLY_REFUNDED: {
		title: 'Payment partially refunded',
		description: 'Part of the payment for this order has been returned.'
	},
	REFUNDED: {
		title: 'Payment refunded',
		description: 'The payment for this order has been returned.'
	}
}
