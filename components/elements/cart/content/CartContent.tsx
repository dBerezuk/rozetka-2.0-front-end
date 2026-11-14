import { ShoppingCart } from 'lucide-react'

import { CartLoading } from '@/components/elements/cart/content/CartLoading'
import type { useCartLines } from '@/components/elements/cart/content/useCartLines'
import { CartItem } from '@/components/elements/cart/item/CartItem'
import { Button } from '@/components/ui/button/Button'
import type { useCart } from '@/hooks/cart/useCart'
import type { useCartSync } from '@/hooks/cart/useCartSync'

interface ICartContentProps {
	cart: ReturnType<typeof useCart>
	sync: ReturnType<typeof useCartSync>
	data: ReturnType<typeof useCartLines>
	onClose: () => void
}

export function CartContent({ cart, sync, data, onClose }: ICartContentProps) {
	const isLoading = cart.isLoading || (cart.isPending && !cart.items.length)
	const isError = sync.isError || cart.isError

	return isError ? (
		<div role='alert' className='space-y-4 text-sm'>
			<p>
				{sync.isError
					? 'Unable to transfer your guest cart. Your saved items are still on this device.'
					: 'Unable to load your cart.'}
			</p>
			<Button
				variant='outline'
				onClick={sync.isError ? sync.onRetry : cart.onRetry}
			>
				Try again
			</Button>
		</div>
	) : isLoading ? (
		<CartLoading />
	) : data.lines.length ? (
		<ul className='divide-y divide-gray-200' aria-busy={cart.isPending}>
			{data.lines.map(line => (
				<CartItem
					key={line.variantId}
					line={line}
					isDisabled={cart.isDisabled}
					onClose={onClose}
					onRetry={data.onRetry}
					onChangeQuantity={quantity =>
						cart.onSetQuantity({
							variantId: line.variantId,
							productSlug: line.productSlug,
							quantity
						})
					}
				/>
			))}
		</ul>
	) : (
		<div className='flex flex-col items-center gap-3 py-10 text-center'>
			<ShoppingCart size={40} className='text-gray-400' aria-hidden='true' />
			<p className='text-lg font-semibold'>Your cart is empty</p>
			<p className='text-sm text-gray-500'>Add products to keep them here.</p>
		</div>
	)
}
