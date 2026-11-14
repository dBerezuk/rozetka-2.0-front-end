import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import { formatPrice } from '@/utils/format-price.util'

interface ICartFooterProps {
	count: number
	amount: number
	isIncomplete: boolean
	isDisabled: boolean
	isGuest: boolean
	isResuming: boolean
	onClose: () => void
	onCheckout: () => void
}

export function CartFooter({
	count,
	amount,
	isIncomplete,
	isDisabled,
	isGuest,
	isResuming,
	onClose,
	onCheckout
}: ICartFooterProps) {
	return (
		<div className='flex w-full flex-wrap items-center justify-between gap-4'>
			{count > 0 && (
				<div>
					<p className='text-xs text-gray-500'>Total</p>
					<p aria-live='polite' className='text-2xl font-semibold tabular-nums'>
						{isIncomplete ? '—' : formatPrice(amount)}
					</p>
				</div>
			)}
			<Button variant='outline' className='ml-auto' onClick={onClose}>
				Continue shopping
			</Button>
			{(count > 0 || isResuming) &&
				(isGuest ? (
					<Button url={pagesConfig.login} onClick={onClose}>
						Sign in to pay
					</Button>
				) : (
					<Button
						onClick={onCheckout}
						disabled={!isResuming && (isDisabled || isIncomplete)}
					>
						{isResuming ? 'Resume payment' : 'Checkout'}
					</Button>
				))}
		</div>
	)
}
