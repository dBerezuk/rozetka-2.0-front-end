'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { IPaginatedResponse } from '@/types/api.types'
import type { ICategoryDetails, ICategoryFilters } from '@/types/category.types'
import type { IProductQuery } from '@/types/product-query.types'
import type { IProduct } from '@/types/product.types'

export interface ICatalogProps {
	search?: string
	category?: ICategoryDetails
	categoryFilters?: ICategoryFilters
	initialProducts?: IPaginatedResponse<IProduct>
}

const PAGE_SIZE = 24

export function useCatalog({
	search = '',
	category,
	initialProducts
}: ICatalogProps) {
	const scope = JSON.stringify([category?.slug, search])

	const [selection, setSelection] = useState<{
		scope: string
		query: IProductQuery
	}>({ scope, query: {} })

	const query: IProductQuery = selection.scope === scope ? selection.query : {}

	if (selection.scope !== scope) {
		setSelection({ scope, query: {} })
	}

	const parameters: IProductQuery = {
		...query,
		search: search || undefined,
		categorySlug: category?.slug ?? query.categorySlug,
		take: PAGE_SIZE
	}

	const isEnabled = !!category || !!search
	const isInitial = Object.keys(query).length === 0

	const products = useInfiniteQuery({
		queryKey: queryKeysConfig.getCatalog(parameters),
		queryFn: ({ pageParam, signal }) =>
			productsService.getAll({ ...parameters, skip: pageParam }, signal),
		initialPageParam: 0,
		getNextPageParam: (last, pages) =>
			last.more
				? pages.reduce((count, page) => count + page.data.length, 0)
				: undefined,
		initialData:
			initialProducts && isInitial
				? { pages: [initialProducts], pageParams: [0] }
				: undefined,
		enabled: isEnabled
	})

	const filters = useQuery({
		queryKey: queryKeysConfig.getSearchFilters(search, query.categorySlug),
		queryFn: ({ signal }) =>
			productsService.getFilters(
				{ search, categorySlug: query.categorySlug },
				signal
			),
		enabled: !category && !!search
	})

	const onChange = (updated: IProductQuery) =>
		setSelection({ scope, query: updated })

	const onReset = () => onChange(query.sort ? { sort: query.sort } : {})

	return { query, products, filters, isEnabled, onChange, onReset }
}
