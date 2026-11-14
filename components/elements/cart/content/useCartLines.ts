import { useQueries } from '@tanstack/react-query'

import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { ICart, ICartLine, IGuestCartItem } from '@/types/cart.types'

export function useCartLines(
	items: IGuestCartItem[],
	cart: ICart | undefined,
	isGuest: boolean,
	isOpen: boolean
) {
	const slugs = [...new Set(isGuest ? items.map(item => item.productSlug) : [])]
	const products = useQueries({
		queries: slugs.map(slug => ({
			queryKey: queryKeysConfig.getCartProduct(slug),
			queryFn: () => productsService.getBySlug(slug),
			enabled: isOpen
		}))
	})

	const lines: ICartLine[] = items.map(item => {
		const serverItem = cart?.items.find(
			serverItem => serverItem.variantId === item.variantId
		)
		const query = products[slugs.indexOf(item.productSlug)]
		const product = isGuest ? query?.data : serverItem?.variant.product
		const variant = isGuest
			? query?.data?.variants.find(variant => variant.id === item.variantId)
			: serverItem?.variant

		return {
			...item,
			product,
			variant,
			isLoading: isGuest && Boolean(query?.isPending),
			isError: isGuest && Boolean(query?.isError || (query?.data && !variant))
		}
	})
	const amount = lines.reduce(
		(total, line) => total + Number(line.variant?.price ?? 0) * line.quantity,
		0
	)
	const isIncomplete = lines.some(
		line => !line.variant || !line.product || line.isLoading || line.isError
	)

	return {
		lines,
		amount,
		isIncomplete,
		onRetry: () =>
			products.forEach(query => {
				if (query.isError) void query.refetch()
			})
	}
}
