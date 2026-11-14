import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { IStore } from '@/types/store.types'

export function useStoreProducts() {
	const { slug } = useParams<Pick<IStore, 'slug'>>()

	const query = useInfiniteQuery({
		queryKey: queryKeysConfig.getStoreProducts(slug),
		queryFn: ({ pageParam, signal }) =>
			productsService.getMyStoreProducts(
				slug,
				{ skip: pageParam, take: 20 },
				signal
			),
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) =>
			lastPage.more
				? pages.reduce((count, page) => count + page.data.length, 0)
				: undefined
	})

	return { ...query, items: query.data?.pages.flatMap(page => page.data) ?? [] }
}
