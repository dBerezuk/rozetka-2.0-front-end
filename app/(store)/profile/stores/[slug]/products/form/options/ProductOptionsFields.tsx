'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { ProductOptionFields } from '@/app/(store)/profile/stores/[slug]/products/form/options/ProductOptionFields'
import { Button } from '@/components/ui/button/Button'
import type { TProductFormValues } from '@/schemas/product.schema'

export function ProductOptionsFields() {
	const {
		control,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const { fields, append, remove } = useFieldArray({ control, name: 'options' })

	return (
		<section className='space-y-4' aria-label='Product options'>
			<div className='flex justify-end'>
				<Button
					variant='outline'
					size='small'
					onClick={() =>
						append({ title: '', isGallery: false, values: [{ value: '' }] })
					}
				>
					Add option
				</Button>
			</div>
			<p className='text-sm text-gray-500'>
				Add choices such as color or size, then select a value for each variant
				below.
			</p>
			{fields.map((field, index) => (
				<ProductOptionFields
					key={field.id}
					index={index}
					onRemove={() => remove(index)}
				/>
			))}
			{errors.options?.root?.message && (
				<p role='alert' className='text-sm text-red-600'>
					{errors.options.root.message}
				</p>
			)}
		</section>
	)
}
