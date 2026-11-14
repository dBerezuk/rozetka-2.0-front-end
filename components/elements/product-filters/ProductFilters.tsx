'use client'

import { CategoryAttributeFilters } from '@/components/elements/product-filters/CategoryAttributeFilters'
import { FilterSection } from '@/components/elements/product-filters/FilterSection'
import { PriceFilter } from '@/components/elements/product-filters/PriceFilter'
import { SearchCategoryFilter } from '@/components/elements/product-filters/SearchCategoryFilter'
import { Button } from '@/components/ui/button/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import type { IProductFiltersProps } from '@/types/catalog.types'

export function ProductFilters({
	query,
	onChange,
	onReset,
	categoryFilters,
	searchFilters,
	isLoading
}: IProductFiltersProps) {
	const prices = categoryFilters ?? searchFilters
	const isActive =
		query.minPrice !== undefined ||
		query.maxPrice !== undefined ||
		!!query.characteristics?.length ||
		!!query.options?.length ||
		(!categoryFilters && !!query.categorySlug)

	return (
		<aside aria-label='Filters' className='self-start rounded-xl bg-white p-5'>
			<h2 className='font-semibold'>Filters</h2>
			<div className='mt-5' aria-busy={isLoading}>
				{isLoading ? (
					<div className='space-y-4' role='status' aria-label='Loading filters'>
						<Skeleton className='h-4 w-16' />
						<Skeleton className='h-10 w-full' />
						<Skeleton className='h-4 w-full' />
					</div>
				) : (
					<>
						{prices?.minPrice != null && prices.maxPrice != null && (
							<FilterSection title='Price'>
								<PriceFilter
									min={Number(prices.minPrice)}
									max={Number(prices.maxPrice)}
									query={query}
									onChange={onChange}
								/>
							</FilterSection>
						)}
						<SearchCategoryFilter
							searchFilters={searchFilters}
							query={query}
							onChange={onChange}
						/>
						<CategoryAttributeFilters
							categoryFilters={categoryFilters}
							query={query}
							onChange={onChange}
						/>
						{prices?.minPrice == null &&
							!searchFilters?.categories.length &&
							!categoryFilters?.filters.length &&
							!categoryFilters?.variants.length && (
								<p className='text-sm text-gray-500'>No filters available.</p>
							)}
					</>
				)}
				{isActive && (
					<Button
						variant='ghost'
						size='small'
						className='mt-5 w-full text-gray-500'
						onClick={onReset}
					>
						Reset filters
					</Button>
				)}
			</div>
		</aside>
	)
}
