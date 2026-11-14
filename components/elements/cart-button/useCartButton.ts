import { useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'

import { queryKeysConfig } from '@/config/query-keys.config'
import { useCart } from '@/hooks/cart/useCart'
import { isCartOpenAtom } from '@/stores/cart.store'
import type { IProductVariant } from '@/types/product-variant.types'
import type { IProduct } from '@/types/product.types'

export function useCartButton(
	product: IProduct,
	variantId?: IProductVariant['id']
) {
	const cart = useCart()
	const queryClient = useQueryClient()
	const setIsOpen = useSetAtom(isCartOpenAtom)

	const isInCart = cart.items.some(item => item.variantId === variantId)

	const onToggleCart = () => {
		if (!variantId || cart.isDisabled) return

		queryClient.setQueryData(
			queryKeysConfig.getCartProduct(product.slug),
			product
		)
		cart.onSetQuantity({
			variantId,
			productSlug: product.slug,
			quantity: isInCart ? 0 : 1
		})

		if (!isInCart) setIsOpen(true)
	}

	return {
		isInCart,
		isLoading: cart.isLoading,
		isPending: cart.isPending,
		isDisabled: cart.isDisabled || !variantId,
		onToggleCart
	}
}
