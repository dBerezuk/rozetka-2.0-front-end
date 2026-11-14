import { useQuery } from '@tanstack/react-query'

import { queryKeysConfig } from '@/config/query-keys.config'
import { categoriesService } from '@/services/categories.service'
import type { ICategoryListItem } from '@/types/category.types'

export function useCatalogCategories(isOpen: boolean) {
	return useQuery({
		queryKey: queryKeysConfig.catalogCategories,
		enabled: isOpen,
		queryFn: async () => {
			const categories: ICategoryListItem[] = []
			let isMore = true

			while (isMore) {
				const page = await categoriesService.getAll({
					skip: categories.length,
					take: 100
				})

				categories.push(...page.data)

				isMore = page.more && page.data.length > 0
			}

			return categories
		},
		staleTime: 60_000
	})
}
