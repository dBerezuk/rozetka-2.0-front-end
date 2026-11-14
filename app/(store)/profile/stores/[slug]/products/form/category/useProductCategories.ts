import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { queryKeysConfig } from '@/config/query-keys.config'
import { categoriesService } from '@/services/categories.service'
import type { ICategory } from '@/types/category.types'

export function useProductCategories(
	categoryId: ICategory['id'],
	currentCategory: ICategory | undefined,
	onReadyChange: (isReady: boolean) => void
) {
	const categories = useInfiniteQuery({
		queryKey: queryKeysConfig.productCategories,
		initialPageParam: 0,
		queryFn: ({ pageParam }) =>
			categoriesService.getAll({ skip: pageParam, take: 100 }),
		getNextPageParam: (lastPage, pages) =>
			lastPage.more
				? pages.reduce((count, page) => count + page.data.length, 0)
				: undefined
	})

	const categoryList = categories.data?.pages.flatMap(page => page.data) ?? []
	const selectedCategory =
		categoryList.find(category => category.id === categoryId) ??
		(currentCategory?.id === categoryId ? currentCategory : undefined)
	const selectableCategories =
		selectedCategory &&
		!categoryList.some(category => category.id === categoryId)
			? [selectedCategory, ...categoryList]
			: categoryList
	const categoryOptions = [
		{
			value: '',
			label: categories.isPending
				? 'Loading categories...'
				: 'Choose a category'
		},
		...selectableCategories.map(category => ({
			value: category.id,
			label: category.title
		}))
	]

	const details = useQuery({
		queryKey: queryKeysConfig.getCategoryDetails(selectedCategory?.slug ?? ''),
		queryFn: () => categoriesService.getBySlug(selectedCategory!.slug),
		enabled: !!selectedCategory
	})

	useEffect(() => {
		onReadyChange(!categoryId || !!details.data)
	}, [categoryId, details.data, onReadyChange])

	return { categories, categoryOptions, details }
}
