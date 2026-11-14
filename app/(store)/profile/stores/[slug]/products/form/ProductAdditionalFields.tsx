'use client'

import { Images, SlidersHorizontal, Tags } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'

import { ProductImagesFields } from '@/app/(store)/profile/stores/[slug]/products/form/images/ProductImagesFields'
import { ProductOptionsFields } from '@/app/(store)/profile/stores/[slug]/products/form/options/ProductOptionsFields'
import { ProductFormSection } from '@/app/(store)/profile/stores/[slug]/products/form/ProductFormSection'
import { ProductVariantsFields } from '@/app/(store)/profile/stores/[slug]/products/form/variants/ProductVariantsFields'
import type { TProductFormValues } from '@/schemas/product.schema'
import { formatPrice } from '@/utils/format-price.util'

interface IProductAdditionalFieldsProps {
	isUploading: boolean
	onUploadingChange: (isUploading: boolean) => void
}

export function ProductAdditionalFields({
	isUploading,
	onUploadingChange
}: IProductAdditionalFieldsProps) {
	const { control } = useFormContext<TProductFormValues>()

	const [images, options, variants] = useWatch({
		control,
		name: ['images', 'options', 'variants']
	})

	const prices = variants.map(variant => variant.price).filter(Number.isFinite)
	const priceSummary = prices.length
		? ` · from ${formatPrice(Math.min(...prices))}`
		: ''

	return (
		<div className='grid gap-3 sm:grid-cols-2'>
			<ProductFormSection
				name='images'
				title='Images'
				summary={`${images.length} images`}
				icon={Images}
				isBusy={isUploading}
			>
				<ProductImagesFields onUploadingChange={onUploadingChange} />
			</ProductFormSection>
			<ProductFormSection
				name='options'
				title='Options'
				summary={
					options.length
						? options.map(option => option.title || 'Untitled').join(', ')
						: 'No options added'
				}
				icon={SlidersHorizontal}
			>
				<ProductOptionsFields />
			</ProductFormSection>
			<ProductFormSection
				name='variants'
				title='Variants and pricing'
				summary={`${variants.length} variants${priceSummary}`}
				icon={Tags}
			>
				<ProductVariantsFields />
			</ProductFormSection>
		</div>
	)
}
