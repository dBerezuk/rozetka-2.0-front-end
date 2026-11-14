import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { toast } from 'sonner'

import { queryKeysConfig } from '@/config/query-keys.config'
import {
	CART_MAX_QUANTITY,
	CART_TRANSFER_LIMIT
} from '@/constants/cart.constants'
import { useCartMutation } from '@/hooks/cart/useCartMutation'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { useProfile } from '@/hooks/useProfile'
import { cartService } from '@/services/cart.service'
import {
	guestCartItemsAtom,
	updateGuestCartItemAtom
} from '@/stores/cart.store'
import type { IGuestCartItem } from '@/types/cart.types'

export function useCart() {
	const isHydrated = useIsHydrated()
	const profile = useProfile()
	const guestItems = useAtomValue(guestCartItemsAtom)
	const onUpdateGuestItem = useSetAtom(updateGuestCartItemAtom)

	const isGuest = !profile.data
	const queryKey = queryKeysConfig.getCart(profile.data?.id)
	const { onUpdateItem, isPending } = useCartMutation(profile.data?.id)

	const cart = useQuery({
		queryKey,
		queryFn: () => cartService.getCurrent(),
		enabled: isHydrated && !isGuest && !guestItems.length
	})

	const items: IGuestCartItem[] = !isHydrated
		? []
		: isGuest
			? guestItems
			: (cart.data?.items.map(item => ({
					variantId: item.variantId,
					quantity: item.quantity,
					productSlug: item.variant.product.slug
				})) ?? [])

	const isLoading =
		!isHydrated ||
		profile.isLoading ||
		(!isGuest && (cart.isPending || guestItems.length > 0))
	const isError = !isGuest && cart.isError
	const isDisabled = isLoading || isPending || isError

	const onSetQuantity = (item: IGuestCartItem) => {
		if (
			isDisabled ||
			!Number.isInteger(item.quantity) ||
			item.quantity < 0 ||
			item.quantity > CART_MAX_QUANTITY
		)
			return

		if (isGuest) {
			if (
				item.quantity > 0 &&
				guestItems.length >= CART_TRANSFER_LIMIT &&
				!guestItems.some(current => current.variantId === item.variantId)
			) {
				toast.error(`Cart limit: ${CART_TRANSFER_LIMIT} variants.`)

				return
			}

			onUpdateGuestItem(item)

			return
		}

		onUpdateItem(item)
	}

	return {
		items,
		cart: cart.data,
		isGuest,
		isLoading,
		isPending,
		isError,
		isDisabled,
		onSetQuantity,
		onRetry: () => {
			void cart.refetch()
		}
	}
}
