import type { ICategory, ICategoryFilters } from '@/types/category.types'
import type { IProductQuery } from '@/types/product-query.types'

export interface IProductSearchFilters extends Pick<
	ICategoryFilters,
	'minPrice' | 'maxPrice'
> {
	categories: Pick<ICategory, 'id' | 'title' | 'slug'>[]
}

export interface IProductFiltersProps {
	query: IProductQuery
	onChange: (query: IProductQuery) => void
	onReset: () => void
	categoryFilters?: ICategoryFilters
	isLoading?: boolean
	searchFilters?: IProductSearchFilters
}
