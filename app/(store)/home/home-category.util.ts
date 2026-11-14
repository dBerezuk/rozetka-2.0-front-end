import type { ICategoryListItem } from '@/types/category.types'

export function getHomeCategories(categories: ICategoryListItem[]) {
	return categories
		.flatMap(category =>
			category.children.length ? category.children : [category]
		)
		.filter(
			(category, index, categories) =>
				categories.findIndex(item => item.id === category.id) === index
		)
		.slice(0, 3)
}
