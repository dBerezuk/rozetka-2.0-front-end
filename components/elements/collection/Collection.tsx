import type {
	InfiniteData,
	UseInfiniteQueryResult
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { SORT_OPTIONS } from '@/components/elements/collection/collection.data'
import { CollectionLoading } from '@/components/elements/collection/CollectionLoading'
import { ProductCard } from '@/components/elements/product-card/ProductCard'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import { LoadMore } from '@/components/ui/LoadMore'
import type { IPaginatedResponse } from '@/types/api.types'
import type { TProductSort } from '@/types/product-query.types'
import type { IProduct } from '@/types/product.types'
import { cn } from '@/utils/cn.util'

interface ICollectionProps {
	productsQuery: UseInfiniteQueryResult<
		InfiniteData<IPaginatedResponse<IProduct>>
	>
	emptyMessage?: string
	children?: ReactNode
	filters?: ReactNode
	sort?: TProductSort
	onChangeSort?: (sort: TProductSort) => void
}

export function Collection({
	productsQuery,
	emptyMessage = 'No products found.',
	children,
	filters,
	sort = 'newest',
	onChangeSort
}: ICollectionProps) {
	const products = productsQuery.data?.pages.flatMap(page => page.data) ?? []
	const { isLoading } = productsQuery

	return (
		<div
			className={cn(
				'grid gap-6',
				filters && 'lg:grid-cols-[250px_minmax(0,1fr)]'
			)}
		>
			{filters}
			<div className='min-w-0 space-y-4' aria-busy={isLoading}>
				{(children || onChangeSort) && (
					<div className='flex flex-wrap items-center justify-between gap-3'>
						{children}
						{onChangeSort && (
							<div className='ml-auto'>
								<Dropdown
									label='Sort by'
									options={SORT_OPTIONS}
									value={sort}
									onChange={onChangeSort}
								/>
							</div>
						)}
					</div>
				)}
				{isLoading ? (
					<CollectionLoading />
				) : products.length ? (
					<ul className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4'>
						{products.map((product, index) => (
							<li key={product.id}>
								<ProductCard product={product} isImageEager={index < 4} />
							</li>
						))}
					</ul>
				) : (
					<p
						role='status'
						className='rounded-xl bg-white px-6 py-12 text-center text-gray-500'
					>
						{emptyMessage}
					</p>
				)}
				<LoadMore query={productsQuery} />
			</div>
		</div>
	)
}
