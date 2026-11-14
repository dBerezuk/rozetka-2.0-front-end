'use client'

import { useFormContext } from 'react-hook-form'

import { Field } from '@/components/ui/field/Field'
import { Textarea } from '@/components/ui/Textarea'
import type { TProductFormValues } from '@/schemas/product.schema'

export function ProductDetailsFields() {
	const {
		register,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	return (
		<section
			className='space-y-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5'
			aria-labelledby='product-details-title'
		>
			<h2 id='product-details-title' className='text-base font-semibold'>
				Product details
			</h2>
			<div className='grid gap-4 sm:grid-cols-2'>
				<Field
					label='Product name'
					placeholder='Wireless headphones'
					error={errors.title?.message}
					{...register('title')}
				/>
				<Field
					label='Product address'
					placeholder='wireless-headphones'
					autoCapitalize='none'
					spellCheck={false}
					error={errors.slug?.message}
					{...register('slug')}
				/>
			</div>
			<Textarea
				label='Description'
				placeholder='Describe the product and its key features.'
				rows={3}
				className='min-h-24'
				error={errors.description?.message}
				{...register('description')}
			/>
		</section>
	)
}
