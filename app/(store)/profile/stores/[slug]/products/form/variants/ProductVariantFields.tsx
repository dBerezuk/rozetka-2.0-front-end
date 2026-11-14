'use client'

import { useFormContext } from 'react-hook-form'

import { ProductVariantOptionsFields } from '@/app/(store)/profile/stores/[slug]/products/form/variants/ProductVariantOptionsFields'
import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import type { TProductFormValues } from '@/schemas/product.schema'

interface IProductVariantFieldsProps {
	index: number
	onRemove: () => void
}

export function ProductVariantFields({
	index,
	onRemove
}: IProductVariantFieldsProps) {
	const {
		register,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const variantErrors = errors.variants?.[index]

	return (
		<div className='space-y-4 rounded-xl border border-gray-200 p-4'>
			<div className='flex items-center justify-between gap-3'>
				<h3 className='text-sm font-semibold'>Variant {index + 1}</h3>
				<Button
					variant='ghost'
					size='small'
					onClick={onRemove}
					aria-label={`Remove variant ${index + 1}`}
				>
					Remove
				</Button>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				<Field
					label='SKU'
					error={variantErrors?.sku?.message}
					{...register(`variants.${index}.sku`)}
				/>
				<Field
					label='Price (EUR)'
					type='number'
					min={0}
					max={9999999999.99}
					step='0.01'
					error={variantErrors?.price?.message}
					{...register(`variants.${index}.price`, { valueAsNumber: true })}
				/>
			</div>
			<ProductVariantOptionsFields index={index} />
		</div>
	)
}
