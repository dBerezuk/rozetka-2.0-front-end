import { FilterOptions } from '@/components/elements/product-filters/FilterOptions'
import { FilterSection } from '@/components/elements/product-filters/FilterSection'
import type { IProductFiltersProps } from '@/types/catalog.types'

type TCategoryAttributeFiltersProps = Pick<
	IProductFiltersProps,
	'categoryFilters' | 'query' | 'onChange'
>

export function CategoryAttributeFilters({
	categoryFilters,
	query,
	onChange
}: TCategoryAttributeFiltersProps) {
	return (
		<>
			{categoryFilters?.filters.map(filter => (
				<FilterSection key={filter.id} title={filter.title}>
					<FilterOptions
						options={filter.values.map(value => ({ value, label: value }))}
						selected={
							query.characteristics?.find(
								item => item.characteristicId === filter.id
							)?.values ?? []
						}
						onChange={values => {
							const others =
								query.characteristics?.filter(
									item => item.characteristicId !== filter.id
								) ?? []

							onChange({
								...query,
								characteristics: values.length
									? [...others, { characteristicId: filter.id, values }]
									: others
							})
						}}
					/>
				</FilterSection>
			))}
			{categoryFilters?.variants.map(filter => (
				<FilterSection key={filter.title} title={filter.title}>
					<FilterOptions
						options={filter.values.map(value => ({ value, label: value }))}
						selected={
							query.options?.find(item => item.title === filter.title)
								?.values ?? []
						}
						onChange={values => {
							const others =
								query.options?.filter(item => item.title !== filter.title) ?? []

							onChange({
								...query,
								options: values.length
									? [...others, { title: filter.title, values }]
									: others
							})
						}}
					/>
				</FilterSection>
			))}
		</>
	)
}
