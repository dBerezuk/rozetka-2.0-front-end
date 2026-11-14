import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { CatalogCategoryButton } from '@/components/layout/catalog/CatalogCategoryButton'
import { CatalogCategoryGroup } from '@/components/layout/catalog/CatalogCategoryGroup'
import { CatalogMenuLoading } from '@/components/layout/catalog/CatalogMenuLoading'
import { useCatalogCategories } from '@/components/layout/catalog/useCatalogCategories'
import { pagesConfig } from '@/config/pages.config'

interface ICatalogMenuProps {
	isOpen: boolean
	onClose: () => void
}

export function CatalogMenu({ isOpen, onClose }: ICatalogMenuProps) {
	const [selectedId, setSelectedId] = useState<string>()
	const { data: categories = [], isPending } = useCatalogCategories(isOpen)

	const roots = categories.filter(category => !category.parentId)
	const selected =
		roots.find(category => category.id === selectedId) ?? roots[0]
	const children = categories.filter(
		category => category.parentId === selected?.id
	)

	return (
		<div className='h-[clamp(0px,calc(85dvh-8rem),22rem)] md:h-[min(60dvh,32rem)]'>
			{isPending ? (
				<CatalogMenuLoading />
			) : selected ? (
				<div className='grid h-full grid-rows-[auto_minmax(0,1fr)] gap-4 md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-1 md:gap-6'>
					<nav
						aria-label='Catalog categories'
						className='min-h-0 max-h-[min(9rem,24dvh)] overflow-y-auto rounded-lg bg-bg p-2 md:max-h-none'
					>
						<ul className='space-y-1'>
							{roots.map(category => (
								<li key={category.id}>
									<CatalogCategoryButton
										category={category}
										isActive={selected.id === category.id}
										onSelect={() => setSelectedId(category.id)}
									/>
								</li>
							))}
						</ul>
					</nav>
					<section
						aria-label={selected.title}
						className='min-h-0 min-w-0 space-y-4 overflow-y-auto md:space-y-6 md:pr-2'
					>
						<div className='flex items-baseline justify-between gap-3 border-b border-gray-100 pb-3'>
							<h3 className='min-w-0 text-lg font-semibold wrap-break-word md:text-xl'>
								{selected.title}
							</h3>
							<Link
								href={pagesConfig.getCategoryProducts(selected.slug)}
								onClick={onClose}
								className='inline-flex shrink-0 items-center gap-1 rounded text-sm font-medium whitespace-nowrap text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary'
							>
								View all <ArrowUpRight size={16} aria-hidden='true' />
							</Link>
						</div>
						{children.length > 0 ? (
							<div className='columns-1 gap-6 sm:columns-2 xl:columns-3'>
								{children.map(category => (
									<CatalogCategoryGroup
										key={category.id}
										category={category}
										categories={categories}
										onClose={onClose}
									/>
								))}
							</div>
						) : (
							<p className='text-sm text-gray-500'>
								Explore all products in this category.
							</p>
						)}
					</section>
				</div>
			) : (
				<p role='status' className='py-8 text-center text-sm text-gray-500'>
					No categories available.
				</p>
			)}
		</div>
	)
}
