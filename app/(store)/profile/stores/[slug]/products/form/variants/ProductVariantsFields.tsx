'use client'

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { ProductVariantFields } from '@/app/(store)/profile/stores/[slug]/products/form/variants/ProductVariantFields'
import { Button } from '@/components/ui/button/Button'
import type { TProductFormValues } from '@/schemas/product.schema'

export function ProductVariantsFields() {
	const {
		control,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'variants'
	})

	const options = useWatch({ control, name: 'options' })

	return (
		<section className='space-y-4' aria-label='Product variants and pricing'>
			<div className='flex justify-end'>
				<Button
					variant='outline'
					size='small'
					onClick={() =>
						append({
							sku: '',
							price: 0,
							optionValues: options.map(option => ({
								title: option.title,
								value: option.values[0]?.value ?? ''
							}))
						})
					}
				>
					Add variant
				</Button>
			</div>
			<p className='text-sm text-gray-500'>
				Each variant needs a unique SKU, a price and a unique combination of
				option values.
			</p>
			{fields.map((field, index) => (
				<ProductVariantFields
					key={field.id}
					index={index}
					onRemove={() => remove(index)}
				/>
			))}
			{(errors.variants?.root?.message || errors.variants?.message) && (
				<p role='alert' className='text-sm text-red-600'>
					{errors.variants.root?.message ?? errors.variants.message}
				</p>
			)}
		</section>
	)
}
