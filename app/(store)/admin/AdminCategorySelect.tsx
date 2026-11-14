'use client'

import { useAdminList } from '@/app/(store)/admin/useAdminList'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import { blogCategoriesService } from '@/services/blog-categories.service'
import { categoriesService } from '@/services/categories.service'
import type { IBlogCategory } from '@/types/blog-category.types'
import type { ICategory } from '@/types/category.types'

interface IAdminCategorySelectProps {
	value: string
	onChange: (value: string) => void
	isBlog?: boolean
	isParent?: boolean
	excludeId?: string
	selectedLabel?: string
	error?: string
	disabled?: boolean
}

type TCategoryOption = Pick<ICategory | IBlogCategory, 'id' | 'title'>

export function AdminCategorySelect({
	value,
	onChange,
	isBlog = false,
	isParent = false,
	excludeId,
	selectedLabel,
	error,
	disabled
}: IAdminCategorySelectProps) {
	const query = useAdminList<TCategoryOption>(
		isBlog ? 'blog-category-options' : 'category-options',
		params =>
			isBlog
				? blogCategoriesService.getAll(params)
				: categoriesService.getAll(params)
	)

	const options = query.items
		.filter(item => item.id !== excludeId)
		.map(item => ({ value: item.id, label: item.title }))

	if (value && !options.some(option => option.value === value)) {
		options.unshift({ value, label: selectedLabel ?? 'Selected category' })
	}

	return (
		<Dropdown
			isField
			label={isParent ? 'Parent category' : 'Category'}
			value={value}
			onChange={onChange}
			options={[
				{
					value: '',
					label: isParent ? 'No parent category' : 'Choose a category'
				},
				...options
			]}
			error={error}
			disabled={disabled || query.isLoading}
			onLoadMore={
				query.hasNextPage
					? () => void query.fetchNextPage({ cancelRefetch: false })
					: undefined
			}
			isLoadingMore={query.isFetchingNextPage}
		/>
	)
}
