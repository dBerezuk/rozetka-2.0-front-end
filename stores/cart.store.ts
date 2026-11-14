import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { IGuestCartItem } from '@/types/cart.types'

export const guestCartItemsAtom = atomWithStorage<IGuestCartItem[]>(
	'guest-cart',
	[]
)
export const isCartOpenAtom = atom(false)

export const updateGuestCartItemAtom = atom(
	null,
	(get, set, item: IGuestCartItem) => {
		const items = get(guestCartItemsAtom)
		const isExisting = items.some(
			current => current.variantId === item.variantId
		)

		const updatedItems =
			item.quantity === 0
				? items.filter(current => current.variantId !== item.variantId)
				: isExisting
					? items.map(current =>
							current.variantId === item.variantId ? item : current
						)
					: [...items, item]

		set(guestCartItemsAtom, updatedItems)
	}
)
