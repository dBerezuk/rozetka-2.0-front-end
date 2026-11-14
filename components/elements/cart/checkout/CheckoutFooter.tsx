import { ArrowLeft, CreditCard } from 'lucide-react'

import type { useCheckoutForm } from '@/components/elements/cart/checkout/useCheckoutForm'
import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import { formatPrice } from '@/utils/format-price.util'

interface ICheckoutFooterProps {
	checkout: ReturnType<typeof useCheckoutForm>
	amount: number
	onBack: () => void
	onClose: () => void
}

export function CheckoutFooter({
	checkout,
	amount,
	onBack,
	onClose
}: ICheckoutFooterProps) {
	const { draft, formId, mutation } = checkout

	return (
		<div className='flex w-full flex-wrap items-center justify-between gap-3'>
			{!draft && (
				<div>
					<p className='text-xs text-gray-500'>Total · EUR</p>
					<p className='text-xl font-semibold tabular-nums'>
						{formatPrice(amount)}
					</p>
				</div>
			)}
			<div className='ml-auto flex flex-wrap gap-2'>
				{mutation.data ? (
					<Button
						url={pagesConfig.getPaymentResult(mutation.data.id)}
						variant='outline'
						onClick={onClose}
					>
						View order
					</Button>
				) : (
					<Button
						variant='outline'
						onClick={onBack}
						disabled={mutation.isPending || Boolean(draft)}
					>
						<ArrowLeft size={16} aria-hidden='true' /> Back
					</Button>
				)}
				<Button type='submit' form={formId} disabled={mutation.isPending}>
					<CreditCard size={16} aria-hidden='true' />
					{mutation.isPending
						? 'Preparing payment...'
						: draft
							? 'Continue payment'
							: 'Pay with monobank'}
				</Button>
			</div>
		</div>
	)
}
