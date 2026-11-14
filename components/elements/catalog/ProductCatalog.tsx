'use client'

import { useCatalog } from '@/components/elements/catalog/useCatalog'
import type { ICatalogProps } from '@/components/elements/catalog/useCatalog'
import { Collection } from '@/components/elements/collection/Collection'
import { ProductFilters } from '@/components/elements/product-filters/ProductFilters'

export function ProductCatalog(props: ICatalogProps) {
	const { query, products, filters, isEnabled, onChange, onReset } =
		useCatalog(props)

	return (
		<Collection
			productsQuery={products}
			sort={query.sort}
			onChangeSort={
				isEnabled ? sort => onChange({ ...query, sort }) : undefined
			}
			emptyMessage={
				!isEnabled
					? 'Enter a product name to start searching.'
					: 'No products match your filters.'
			}
			filters={
				isEnabled && (
					<ProductFilters
						query={query}
						onChange={onChange}
						onReset={onReset}
						categoryFilters={props.categoryFilters}
						searchFilters={filters.data}
						isLoading={!props.category && filters.isLoading}
					/>
				)
			}
		>
			{props.search && (
				<p className='text-sm text-gray-500'>Results for “{props.search}”</p>
			)}
		</Collection>
	)
}
