'use client'

import Image from 'next/image'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import { Field } from '@/components/ui/field/Field'
import { mediaConfig } from '@/config/media.config'
import type { TProductFormValues } from '@/schemas/product.schema'

interface IProductImageFieldsProps {
	index: number
	onRemove: () => void
	onMoveToCover?: () => void
}

export function ProductImageFields({
	index,
	onRemove,
	onMoveToCover
}: IProductImageFieldsProps) {
	const {
		register,
		control,
		setValue,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const image = useWatch({ control, name: `images.${index}` })

	const imagesFolder = mediaConfig.folders.products

	const options = useWatch({ control, name: 'options' })

	const selections = options.flatMap(option =>
		option.values.map(item => ({ title: option.title, value: item.value }))
	)
	const selectedValue = image.optionValue
		? JSON.stringify(image.optionValue)
		: ''

	return (
		<div className='flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row'>
			<Image
				src={mediaConfig.getFileUrl(imagesFolder, image.fileName)}
				alt={image.alt || 'Product image'}
				width={112}
				height={112}
				className='size-28 shrink-0 bg-white object-contain'
			/>
			<div className='min-w-0 flex-1 space-y-3'>
				<Field
					label={`Image ${index + 1} description`}
					error={errors.images?.[index]?.alt?.message}
					{...register(`images.${index}.alt`)}
				/>
				<Dropdown
					isField
					label='Show for'
					value={selectedValue}
					error={errors.images?.[index]?.optionValue?.message}
					options={[
						{ value: '', label: 'All variants' },
						...selections.map(selection => ({
							value: JSON.stringify(selection),
							label: `${selection.title}: ${selection.value}`
						}))
					]}
					onChange={value => {
						const selection = selections.find(
							item => JSON.stringify(item) === value
						)

						setValue(`images.${index}.optionValue`, selection ?? null, {
							shouldDirty: true,
							shouldValidate: true
						})
					}}
				/>
				<div className='flex flex-wrap gap-2'>
					{onMoveToCover && (
						<Button size='small' variant='outline' onClick={onMoveToCover}>
							Make cover
						</Button>
					)}
					<Button
						size='small'
						variant='ghost'
						onClick={onRemove}
						aria-label={`Remove image ${index + 1}`}
					>
						Remove
					</Button>
				</div>
			</div>
		</div>
	)
}
