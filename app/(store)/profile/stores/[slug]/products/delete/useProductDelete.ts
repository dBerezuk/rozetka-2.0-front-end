import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'

export function useProductDelete(product: IProduct, storeSlug: IStore['slug']) {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const router = useRouter()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => productsService.delete(product.id),
		onSuccess: async () => {
			queryClient.removeQueries({
				queryKey: queryKeysConfig.getProductDetails(product.slug)
			})

			await queryClient.invalidateQueries({
				queryKey: queryKeysConfig.getStoreProducts(storeSlug)
			})

			setIsConfirmOpen(false)

			toast.success('Product deleted successfully.')

			router.replace(pagesConfig.getStoreProducts(storeSlug))
		}
	})

	return {
		isConfirmOpen,
		isPending: mutation.isPending,
		onOpenConfirm: () => setIsConfirmOpen(true),
		onCloseConfirm: () => setIsConfirmOpen(false),
		onDeleteProduct: () => mutation.mutate()
	}
}
