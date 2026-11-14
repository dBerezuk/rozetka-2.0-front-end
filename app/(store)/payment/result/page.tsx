import type { Metadata } from 'next'

import { PaymentResult } from '@/app/(store)/payment/result/PaymentResult'

interface IPaymentResultPageProps {
	searchParams: Promise<{ orderId?: string | string[] }>
}

export const metadata: Metadata = {
	title: 'Order and payment status',
	robots: { index: false, follow: false }
}

export default async function Page({ searchParams }: IPaymentResultPageProps) {
	const { orderId } = await searchParams
	const paymentOrderId = Array.isArray(orderId) ? orderId[0] : orderId

	return (
		<div className='p-4 sm:p-6 lg:p-8'>
			<PaymentResult orderId={paymentOrderId} />
		</div>
	)
}
