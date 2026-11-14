'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { ProductDeleteButton } from '@/app/(store)/profile/stores/[slug]/products/delete/ProductDeleteButton'
import { ProductForm } from '@/app/(store)/profile/stores/[slug]/products/form/ProductForm'
import { useProfileStore } from '@/app/(store)/profile/stores/useProfileStore'
import { PageContent } from '@/components/layout/PageContent'
import { Skeleton } from '@/components/ui/Skeleton'
import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { IProduct } from '@/types/product.types'

type TProductEditorParams = { productSlug?: IProduct['slug'] }

export function ProductEditorPage() {
	const { productSlug } = useParams<TProductEditorParams>()

	const { data: store, isPending: isStorePending } = useProfileStore()

	const { data: product, isPending: isProductsPending } = useQuery({
		queryKey: queryKeysConfig.getProductDetails(productSlug ?? ''),
		queryFn: () => productsService.getBySlug(productSlug!),
		enabled: !!productSlug
	})

	const isPending = isStorePending || (!!productSlug && isProductsPending)

	return (
		<PageContent
			title={productSlug ? 'Edit product' : 'Create product'}
			description={
				productSlug
					? 'Update your product details, images and pricing.'
					: 'Add a new product to your store.'
			}
			actions={
				store &&
				product && (
					<ProductDeleteButton product={product} storeSlug={store.slug} />
				)
			}
		>
			{isPending ? (
				<Skeleton className='h-96 rounded-2xl' />
			) : store && (!productSlug || product) ? (
				<ProductForm
					key={product?.id ?? store.id}
					store={store}
					product={product}
				/>
			) : (
				<p className='text-sm text-gray-500'>
					This product or store is not available in your profile.
				</p>
			)}
		</PageContent>
	)
}
