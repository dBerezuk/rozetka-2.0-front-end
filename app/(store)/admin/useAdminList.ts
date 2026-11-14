import { useInfiniteQuery } from '@tanstack/react-query'

import { queryKeysConfig } from '@/config/query-keys.config'
import type { IPaginatedResponse, IPaginationQuery } from '@/types/api.types'

export function useAdminList<TItem>(
	resource: string,
	load: (query: IPaginationQuery) => Promise<IPaginatedResponse<TItem>>,
	scope = '',
	isEnabled = true
) {
	const query = useInfiniteQuery({
		queryKey: queryKeysConfig.getAdminList(resource, scope),
		queryFn: ({ pageParam }) => load({ skip: pageParam, take: 20 }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) =>
			lastPage.more
				? pages.reduce((count, page) => count + page.data.length, 0)
				: undefined,
		enabled: isEnabled
	})

	return { ...query, items: query.data?.pages.flatMap(page => page.data) ?? [] }
}
