import Link from 'next/link'

import { pagesConfig } from '@/config/pages.config'
import type { ICategoryDetails } from '@/types/category.types'

interface ICategoryHeadingProps {
	category: ICategoryDetails
}

export function CategoryHeading({ category }: ICategoryHeadingProps) {
	return (
		<header className='space-y-3'>
			{category.parent && (
				<Link
					href={pagesConfig.getCategoryProducts(category.parent.slug)}
					className='text-sm text-gray-500 hover:text-primary'
				>
					{category.parent.title}
				</Link>
			)}
			<h1 className='text-2xl font-semibold sm:text-3xl'>{category.title}</h1>
			{category.children.length > 0 && (
				<nav aria-label='Subcategories' className='flex flex-wrap gap-2'>
					{category.children.map(child => (
						<Link
							key={child.id}
							href={pagesConfig.getCategoryProducts(child.slug)}
							className='rounded-lg bg-white px-3 py-2 text-sm hover:text-primary'
						>
							{child.title}
						</Link>
					))}
				</nav>
			)}
		</header>
	)
}
