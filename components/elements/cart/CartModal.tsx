'use client'

import { useAtom } from 'jotai'
import { useState } from 'react'

import { CartCheckout } from '@/components/elements/cart/checkout/CartCheckout'
import { CartContent } from '@/components/elements/cart/content/CartContent'
import { CartFooter } from '@/components/elements/cart/content/CartFooter'
import { useCartLines } from '@/components/elements/cart/content/useCartLines'
import { Modal } from '@/components/elements/modal/Modal'
import { useCart } from '@/hooks/cart/useCart'
import { useCartSync } from '@/hooks/cart/useCartSync'
import { useProfile } from '@/hooks/useProfile'
import { isCartOpenAtom } from '@/stores/cart.store'
import { checkoutDraftAtom } from '@/stores/checkout.store'

export function CartModal() {
	const [isOpen, setIsOpen] = useAtom(isCartOpenAtom)
	const [draft] = useAtom(checkoutDraftAtom)
	const [isCheckout, setIsCheckout] = useState(false)
	const profile = useProfile()
	const cart = useCart()
	const sync = useCartSync()
	const data = useCartLines(cart.items, cart.cart, cart.isGuest, isOpen)

	const onClose = () => {
		setIsOpen(false)
		setIsCheckout(false)
	}
	const count = cart.items.reduce((total, item) => total + item.quantity, 0)

	return isCheckout && profile.data ? (
		<CartCheckout
			key={profile.data.id}
			profile={profile.data}
			isOpen={isOpen}
			amount={data.amount}
			onClose={onClose}
			onBack={() => setIsCheckout(false)}
		/>
	) : (
		<Modal
			isOpen={isOpen}
			title='Shopping cart'
			description={count ? `${count} items in your cart` : undefined}
			onClose={onClose}
			footer={
				<CartFooter
					count={count}
					amount={data.amount}
					isIncomplete={data.isIncomplete}
					isDisabled={cart.isDisabled || sync.isError}
					isGuest={cart.isGuest}
					isResuming={Boolean(
						profile.data && draft?.userId === profile.data.id
					)}
					onCheckout={() => setIsCheckout(true)}
					onClose={onClose}
				/>
			}
		>
			<CartContent cart={cart} sync={sync} data={data} onClose={onClose} />
		</Modal>
	)
}
