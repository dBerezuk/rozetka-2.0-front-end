import Link from 'next/link'

import { pagesConfig } from '@/config/pages.config'
import type { ICategory, ICategoryListItem } from '@/types/category.types'
import { cn } from '@/utils/cn.util'

interface ICatalogCategoryGroupProps {
	category: ICategory
	categories: ICategoryListItem[]
	onClose: () => void
	isNested?: boolean
}

export function CatalogCategoryGroup({
	category,
	categories,
	onClose,
	isNested = false
}: ICatalogCategoryGroupProps) {
	const children = categories.filter(item => item.parentId === category.id)

	return (
		<div
			className={cn('break-inside-avoid space-y-2', isNested ? 'mb-1' : 'mb-5')}
		>
			<Link
				href={pagesConfig.getCategoryProducts(category.slug)}
				onClick={onClose}
				className={cn(
					'rounded text-sm leading-6 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary',
					isNested ? 'text-gray-600' : 'font-semibold text-gray-950'
				)}
			>
				{category.title}
			</Link>
			{children.length > 0 && (
				<div className={isNested ? 'pl-3' : ''}>
					{children.map(child => (
						<CatalogCategoryGroup
							key={child.id}
							category={child}
							categories={categories}
							onClose={onClose}
							isNested
						/>
					))}
				</div>
			)}
		</div>
	)
}
