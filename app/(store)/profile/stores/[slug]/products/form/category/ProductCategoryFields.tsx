'use client'

import { ListChecks } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'

import { ProductCharacteristicsFields } from '@/app/(store)/profile/stores/[slug]/products/form/category/ProductCharacteristicsFields'
import { useProductCategories } from '@/app/(store)/profile/stores/[slug]/products/form/category/useProductCategories'
import { ProductFormSection } from '@/app/(store)/profile/stores/[slug]/products/form/ProductFormSection'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import type { TProductFormValues } from '@/schemas/product.schema'
import type { IProductDetails } from '@/types/product.types'

interface IProductCategoryFieldsProps {
	product?: IProductDetails
	onReadyChange: (isReady: boolean) => void
}

export function ProductCategoryFields({
	product,
	onReadyChange
}: IProductCategoryFieldsProps) {
	const {
		control,
		setValue,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const categoryId = useWatch({ control, name: 'categoryId' })

	const { categories, categoryOptions, details } = useProductCategories(
		categoryId,
		product?.category,
		onReadyChange
	)

	return (
		<section
			className='space-y-3 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5'
			aria-label='Category and characteristics'
		>
			<Dropdown
				isField
				label='Category'
				error={errors.categoryId?.message}
				disabled={categories.isPending}
				value={categoryId}
				options={categoryOptions}
				isLoadingMore={categories.isFetchingNextPage}
				onLoadMore={
					categories.hasNextPage
						? () => void categories.fetchNextPage({ cancelRefetch: false })
						: undefined
				}
				onChange={value => {
					if (value === categoryId) {
						return
					}

					setValue('categoryId', value, {
						shouldDirty: true,
						shouldValidate: true
					})
					setValue('characteristics', [], { shouldDirty: true })
				}}
			/>
			{details.data && (
				<ProductFormSection
					key={categoryId}
					name='characteristics'
					title='Characteristics'
					summary={`${details.data.characteristics.length} available fields`}
					icon={ListChecks}
				>
					<ProductCharacteristicsFields category={details.data} />
				</ProductFormSection>
			)}
		</section>
	)
}
