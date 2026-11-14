import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

import { queryKeysConfig } from '@/config/query-keys.config'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { useProfile } from '@/hooks/useProfile'
import { cartService } from '@/services/cart.service'
import { guestCartItemsAtom } from '@/stores/cart.store'
import type { IGuestCartItem } from '@/types/cart.types'

export function useCartSync() {
	const isHydrated = useIsHydrated()
	const { data: profile } = useProfile()
	const queryClient = useQueryClient()
	const [guestItems, setGuestItems] = useAtom(guestCartItemsAtom)
	const isStarted = useRef(false)
	const queryKey = queryKeysConfig.getCart(profile?.id)

	const mutation = useMutation({
		mutationKey: queryKey,
		scope: { id: `cart-${profile?.id}` },
		mutationFn: (items: IGuestCartItem[]) =>
			cartService.merge({
				items: items.map(({ variantId, quantity }) => ({ variantId, quantity }))
			}),
		onMutate: () => queryClient.cancelQueries({ queryKey }),
		onSuccess: (cart, transferredItems) => {
			queryClient.setQueryData(queryKey, cart)
			setGuestItems(current =>
				current.filter(
					item =>
						!transferredItems.some(
							transferred => transferred.variantId === item.variantId
						)
				)
			)
		}
	})

	useEffect(() => {
		if (!profile) isStarted.current = false

		if (isHydrated && profile && guestItems.length && !isStarted.current) {
			isStarted.current = true
			mutation.mutate(guestItems)
		}
	}, [isHydrated, profile, guestItems, mutation])

	return {
		isError: Boolean(profile && guestItems.length && mutation.isError),
		onRetry: () => mutation.mutate(guestItems)
	}
}
