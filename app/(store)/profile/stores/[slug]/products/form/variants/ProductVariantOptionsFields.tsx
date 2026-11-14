'use client'

import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import type { TProductFormValues } from '@/schemas/product.schema'

interface IProductVariantOptionsFieldsProps {
	index: number
}

export function ProductVariantOptionsFields({
	index
}: IProductVariantOptionsFieldsProps) {
	const {
		control,
		setValue,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const options = useWatch({ control, name: 'options' })
	const selections = useWatch({
		control,
		name: `variants.${index}.optionValues`
	})

	const selectionErrors = errors.variants?.[index]?.optionValues

	const onChangeSelection = (title: string, value: string) => {
		const values = options.map(option => ({
			title: option.title,
			value:
				option.title === title
					? value
					: (selections.find(selection => selection.title === option.title)
							?.value ?? '')
		}))

		setValue(`variants.${index}.optionValues`, values, {
			shouldDirty: true,
			shouldValidate: true
		})
	}

	return (
		<div className='space-y-4'>
			<div className='grid gap-4 sm:grid-cols-2'>
				{options.map((option, optionIndex) => (
					<Dropdown
						isField
						key={optionIndex}
						label={option.title || `Option ${optionIndex + 1}`}
						value={
							selections.find(item => item.title === option.title)?.value ?? ''
						}
						onChange={value => onChangeSelection(option.title, value)}
						options={[
							{ value: '', label: 'Choose a value' },
							...option.values.map(item => ({
								value: item.value,
								label: item.value
							}))
						]}
					/>
				))}
			</div>
			{options.length === 0 && selections.length > 0 && (
				<Button
					variant='outline'
					size='small'
					onClick={() =>
						setValue(`variants.${index}.optionValues`, [], {
							shouldDirty: true,
							shouldValidate: true
						})
					}
				>
					Clear removed options
				</Button>
			)}
			{selectionErrors && (
				<p role='alert' className='text-sm text-red-600'>
					{selectionErrors.root?.message ??
						selectionErrors.message ??
						'Review the option values for this variant.'}
				</p>
			)}
		</div>
	)
}
