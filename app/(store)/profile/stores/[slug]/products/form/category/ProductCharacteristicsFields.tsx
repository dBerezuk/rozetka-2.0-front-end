'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Field } from '@/components/ui/field/Field'
import type { TProductFormValues } from '@/schemas/product.schema'
import type { ICategoryDetails } from '@/types/category.types'

interface IProductCharacteristicsFieldsProps {
	category: ICategoryDetails
}

export function ProductCharacteristicsFields({
	category
}: IProductCharacteristicsFieldsProps) {
	const {
		register,
		getValues,
		setValue,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	useEffect(() => {
		const currentValues = getValues('characteristics')

		setValue(
			'characteristics',
			category.characteristics.map(characteristic => ({
				characteristicId: characteristic.id,
				value:
					currentValues.find(
						item => item.characteristicId === characteristic.id
					)?.value ?? ''
			}))
		)
	}, [category, getValues, setValue])

	return (
		<div className='space-y-5'>
			{category.characteristics.length ? (
				category.characteristics.map((characteristic, index) => (
					<div key={characteristic.id}>
						<input
							type='hidden'
							{...register(`characteristics.${index}.characteristicId`)}
						/>
						<Field
							label={characteristic.title}
							error={errors.characteristics?.[index]?.value?.message}
							{...register(`characteristics.${index}.value`)}
						/>
					</div>
				))
			) : (
				<p className='text-sm text-gray-500'>
					No additional characteristics for this category.
				</p>
			)}
		</div>
	)
}
