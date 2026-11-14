import { FilterOptions } from '@/components/elements/product-filters/FilterOptions'
import { FilterSection } from '@/components/elements/product-filters/FilterSection'
import type { IProductFiltersProps } from '@/types/catalog.types'

type TSearchCategoryFilterProps = Pick<
	IProductFiltersProps,
	'query' | 'onChange' | 'searchFilters'
>

export function SearchCategoryFilter({
	query,
	onChange,
	searchFilters
}: TSearchCategoryFilterProps) {
	return (
		searchFilters &&
		searchFilters.categories.length > 0 && (
			<FilterSection title='Category'>
				<FilterOptions
					isSingle
					options={searchFilters.categories.map(category => ({
						value: category.slug,
						label: category.title
					}))}
					selected={query.categorySlug ? [query.categorySlug] : []}
					onChange={values =>
						onChange({
							...query,
							categorySlug: values[0],
							minPrice: undefined,
							maxPrice: undefined
						})
					}
				/>
			</FilterSection>
		)
	)
}
