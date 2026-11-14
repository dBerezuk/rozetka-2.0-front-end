'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { Collection } from '@/components/elements/collection/Collection'
import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { IPaginatedResponse } from '@/types/api.types'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'

interface IStoreCatalogProps {
	slug: IStore['slug']
	initialProducts: IPaginatedResponse<IProduct>
}

export function StoreCatalog({ slug, initialProducts }: IStoreCatalogProps) {
	const products = useInfiniteQuery({
		queryKey: queryKeysConfig.getPublicStoreProducts(slug),
		queryFn: ({ pageParam, signal }) =>
			productsService.getAllByStoreSlug(slug, { skip: pageParam }, signal),
		initialPageParam: 0,
		initialData: { pages: [initialProducts], pageParams: [0] },
		getNextPageParam: (lastPage, _pages, lastOffset) =>
			lastPage.more ? lastOffset + lastPage.data.length : undefined
	})

	return (
		<Collection
			productsQuery={products}
			emptyMessage='This store has no products yet.'
		/>
	)
}
