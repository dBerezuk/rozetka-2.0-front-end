'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Field } from '@/components/ui/field/Field'
import type { TProductFormValues } from '@/schemas/product.schema'

interface IProductOptionFieldsProps {
	index: number
	onRemove: () => void
}

export function ProductOptionFields({
	index,
	onRemove
}: IProductOptionFieldsProps) {
	const {
		register,
		control,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const { fields, append, remove } = useFieldArray({
		control,
		name: `options.${index}.values`
	})

	const optionErrors = errors.options?.[index]

	return (
		<div className='space-y-4 rounded-xl border border-gray-200 p-4'>
			<Field
				label={`Option ${index + 1} name`}
				placeholder='Color'
				error={optionErrors?.title?.message}
				{...register(`options.${index}.title`)}
			/>
			<Checkbox
				label='Use this option for the image gallery'
				{...register(`options.${index}.isGallery`)}
			/>
			{fields.map((field, valueIndex) => (
				<div key={field.id} className='flex items-start gap-3'>
					<Field
						label={`Value ${valueIndex + 1}`}
						placeholder='Black'
						wrapperClassName='flex-1'
						error={optionErrors?.values?.[valueIndex]?.value?.message}
						{...register(`options.${index}.values.${valueIndex}.value`)}
					/>
					<Button
						className='mt-7'
						variant='ghost'
						size='small'
						onClick={() => remove(valueIndex)}
						aria-label={`Remove value ${valueIndex + 1} from option ${index + 1}`}
					>
						Remove
					</Button>
				</div>
			))}
			{(optionErrors?.values?.root?.message ||
				optionErrors?.values?.message) && (
				<p role='alert' className='text-sm text-red-600'>
					{optionErrors.values.root?.message ?? optionErrors.values.message}
				</p>
			)}
			<div className='flex flex-wrap gap-2'>
				<Button
					variant='outline'
					size='small'
					onClick={() => append({ value: '' })}
				>
					Add value
				</Button>
				<Button variant='ghost' size='small' onClick={onRemove}>
					Remove option
				</Button>
			</div>
		</div>
	)
}
