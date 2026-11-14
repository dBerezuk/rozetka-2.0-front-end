'use client'

import { useAdminForm } from '@/app/(store)/admin/useAdminForm'
import { Modal } from '@/components/elements/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { Textarea } from '@/components/ui/Textarea'
import { adminBlogCategorySchema } from '@/schemas/admin.schema'
import { blogCategoriesService } from '@/services/blog-categories.service'
import type { IBlogCategory } from '@/types/blog-category.types'

interface IBlogCategoryFormProps {
	category?: IBlogCategory
	onClose: () => void
}

export function BlogCategoryForm({
	category,
	onClose
}: IBlogCategoryFormProps) {
	const { form, onSubmit, isPending } = useAdminForm(
		adminBlogCategorySchema,
		{
			title: category?.title ?? '',
			slug: category?.slug ?? '',
			description: category?.description ?? ''
		},
		values =>
			category
				? blogCategoriesService.update(category.id, values)
				: blogCategoriesService.create(values),
		onClose
	)

	const {
		register,
		formState: { errors }
	} = form

	return (
		<Modal
			isOpen
			title={category ? 'Edit blog category' : 'New blog category'}
			isBusy={isPending}
			onClose={onClose}
		>
			<form noValidate onSubmit={onSubmit}>
				<fieldset disabled={isPending} className='space-y-5'>
					<Field
						label='Title'
						error={errors.title?.message}
						{...register('title')}
					/>
					<Field
						label='Address'
						error={errors.slug?.message}
						{...register('slug')}
					/>
					<Textarea
						label='Description'
						rows={4}
						error={errors.description?.message}
						{...register('description')}
					/>
					<div className='flex justify-end gap-3 border-t border-gray-100 pt-5'>
						<Button variant='outline' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit'>
							{isPending ? 'Saving...' : 'Save category'}
						</Button>
					</div>
				</fieldset>
			</form>
		</Modal>
	)
}
