'use client'

import { useQuery } from '@tanstack/react-query'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { blogCategoriesService } from '@/services/blog-categories.service'
import type { IBlogCategory } from '@/types/blog-category.types'

export function BlogSidebar({ categories }: { categories: IBlogCategory[] }) {
	const { data } = useQuery({
		queryKey: queryKeysConfig.blogCategories,
		queryFn: ({ signal }) => blogCategoriesService.getAllForSidebar(signal),
		placeholderData: categories
	})

	return (
		<Sidebar
			label='Blog categories'
			sections={[
				{
					label: 'Blog',
					links: [
						{ label: 'All articles', url: pagesConfig.blog },
						...(data ?? categories).map(category => ({
							label: category.title,
							url: pagesConfig.getBlogCategory(category.slug)
						}))
					]
				}
			]}
		/>
	)
}
