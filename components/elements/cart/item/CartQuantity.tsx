import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { CART_MAX_QUANTITY } from '@/constants/cart.constants'

interface ICartQuantityProps {
	quantity: number
	isDisabled: boolean
	onChange: (quantity: number) => void
}

export function CartQuantity({
	quantity,
	isDisabled,
	onChange
}: ICartQuantityProps) {
	return (
		<div className='inline-flex items-center rounded-lg border border-gray-200'>
			<Button
				variant='ghost'
				size='icon'
				className='size-9 rounded-lg'
				aria-label='Decrease quantity'
				disabled={isDisabled || quantity <= 1}
				onClick={() => onChange(quantity - 1)}
			>
				<Minus size={14} aria-hidden='true' />
			</Button>
			<span
				aria-live='polite'
				className='min-w-8 text-center text-sm tabular-nums'
			>
				{quantity}
			</span>
			<Button
				variant='ghost'
				size='icon'
				className='size-9 rounded-lg'
				aria-label='Increase quantity'
				disabled={isDisabled || quantity >= CART_MAX_QUANTITY}
				onClick={() => onChange(quantity + 1)}
			>
				<Plus size={14} aria-hidden='true' />
			</Button>
		</div>
	)
}
