'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { ProductImageFields } from '@/app/(store)/profile/stores/[slug]/products/form/images/ProductImageFields'
import { FileUpload } from '@/components/elements/FileUpload'
import { mediaConfig } from '@/config/media.config'
import { productImageSchema } from '@/schemas/product.schema'
import type { TProductFormValues } from '@/schemas/product.schema'

interface IProductImagesFieldsProps {
	onUploadingChange: (isUploading: boolean) => void
}

export function ProductImagesFields({
	onUploadingChange
}: IProductImagesFieldsProps) {
	const { control } = useFormContext<TProductFormValues>()

	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'images'
	})

	return (
		<section className='space-y-4' aria-label='Product images'>
			<div className='flex justify-end'>
				<FileUpload
					label='Add image'
					accept='image/jpeg,image/png,image/webp'
					schema={productImageSchema}
					folder={mediaConfig.folders.products}
					onUploadingChange={onUploadingChange}
					onUpload={({ filename }) =>
						append({ fileName: filename, alt: '', optionValue: null })
					}
				/>
			</div>
			<p className='text-sm text-gray-500'>
				JPEG, PNG or WebP, up to 5 MB each. The first image is the cover.
			</p>
			{fields.length ? (
				fields.map((field, index) => (
					<ProductImageFields
						key={field.id}
						index={index}
						onRemove={() => remove(index)}
						onMoveToCover={index > 0 ? () => move(index, 0) : undefined}
					/>
				))
			) : (
				<p className='text-sm text-gray-500'>No images added yet.</p>
			)}
		</section>
	)
}
