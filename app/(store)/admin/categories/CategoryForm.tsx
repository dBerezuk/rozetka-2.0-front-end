'use client'

import { Controller } from 'react-hook-form'

import { AdminCategorySelect } from '@/app/(store)/admin/AdminCategorySelect'
import { AdminImageField } from '@/app/(store)/admin/AdminImageField'
import { useCategoryForm } from '@/app/(store)/admin/categories/useCategoryForm'
import { Modal } from '@/components/elements/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { mediaConfig } from '@/config/media.config'
import type { ICategory } from '@/types/category.types'

interface ICategoryFormProps {
	category?: ICategory
	onClose: () => void
}

export function CategoryForm({ category, onClose }: ICategoryFormProps) {
	const { form, onSubmit, isPending, isUploading, setIsUploading } =
		useCategoryForm(category, onClose)

	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors }
	} = form

	return (
		<Modal
			isOpen
			title={category ? 'Edit category' : 'New category'}
			isBusy={isPending || isUploading}
			onClose={onClose}
		>
			<form noValidate onSubmit={onSubmit}>
				<fieldset disabled={isPending || isUploading} className='space-y-5'>
					<Field
						label='Title'
						error={errors.title?.message}
						{...register('title')}
					/>
					<Field
						label='Address'
						placeholder='game-consoles'
						error={errors.slug?.message}
						{...register('slug')}
					/>
					<Controller
						control={control}
						name='parentId'
						render={({ field }) => (
							<AdminCategorySelect
								isParent
								excludeId={category?.id}
								value={field.value}
								onChange={field.onChange}
								error={errors.parentId?.message}
							/>
						)}
					/>
					<Field
						label='Icon path (optional)'
						placeholder='/categories/icon.svg'
						error={errors.iconPathName?.message}
						{...register('iconPathName')}
					/>
					<AdminImageField
						value={watch('imageFileName')}
						folder={mediaConfig.folders.categories}
						onChange={value => setValue('imageFileName', value)}
						onUploadingChange={setIsUploading}
						isPending={isPending}
					/>
					<div className='flex justify-end gap-3 border-t border-gray-100 pt-5'>
						<Button variant='outline' disabled={isUploading} onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit' disabled={isUploading}>
							{isPending ? 'Saving...' : 'Save category'}
						</Button>
					</div>
				</fieldset>
			</form>
		</Modal>
	)
}
