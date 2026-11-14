import {
	useIsMutating,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'

import { queryKeysConfig } from '@/config/query-keys.config'
import { cartService } from '@/services/cart.service'
import type { ICart, IGuestCartItem } from '@/types/cart.types'

export function useCartMutation(userId: string | undefined) {
	const queryClient = useQueryClient()
	const queryKey = queryKeysConfig.getCart(userId)
	const isMutating = useIsMutating({ mutationKey: queryKey }) > 0

	const mutation = useMutation({
		mutationKey: queryKey,
		scope: { id: `cart-${userId}` },
		mutationFn: ({ variantId, quantity }: IGuestCartItem) => {
			const cart = queryClient.getQueryData<ICart>(queryKey)
			const item = cart?.items.find(item => item.variantId === variantId)

			return item
				? quantity
					? cartService.updateItem(item.id, { quantity })
					: cartService.deleteItem(item.id)
				: cartService.addItem({ variantId, quantity })
		},
		onMutate: () => queryClient.cancelQueries({ queryKey }),
		onSuccess: cart => queryClient.setQueryData(queryKey, cart)
	})

	return {
		onUpdateItem: mutation.mutate,
		isPending: mutation.isPending || isMutating
	}
}
