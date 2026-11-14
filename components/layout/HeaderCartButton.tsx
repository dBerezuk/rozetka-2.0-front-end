'use client'

import { useSetAtom } from 'jotai'
import { ShoppingBasket } from 'lucide-react'

import { CartModal } from '@/components/elements/cart/CartModal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { useCart } from '@/hooks/cart/useCart'
import { isCartOpenAtom } from '@/stores/cart.store'

export function HeaderCartButton() {
	const setIsOpen = useSetAtom(isCartOpenAtom)
	const { items, isLoading } = useCart()
	const count = items.reduce((total, item) => total + item.quantity, 0)

	return (
		<>
			{isLoading ? (
				<Skeleton
					variant='dark'
					className='h-11 w-12 rounded-xl sm:w-14 xl:w-[138.16px]'
				/>
			) : (
				<Button
					variant='soft'
					aria-label={`Shopping cart, ${count} items`}
					className='relative gap-3 bg-primary/5 px-3 hover:bg-primary/10 sm:px-4'
					onClick={() => setIsOpen(true)}
				>
					<span className='relative flex size-6 shrink-0 items-center justify-center'>
						<ShoppingBasket size={24} strokeWidth={1.75} aria-hidden='true' />
						{count > 0 && (
							<Badge
								aria-hidden='true'
								className='absolute -top-1 -right-3 h-5 min-w-5 -translate-y-1/2 justify-center bg-primary px-1 py-0 text-[10px] leading-none text-white'
							>
								{count > 99 ? '99+' : count}
							</Badge>
						)}
					</span>
					<span className='hidden text-sm font-medium whitespace-nowrap xl:inline'>
						{count > 0 ? 'Order now' : 'Cart'}
					</span>
				</Button>
			)}
			<CartModal />
		</>
	)
}
