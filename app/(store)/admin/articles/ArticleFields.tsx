import { Controller, useFormContext } from 'react-hook-form'

import { AdminCategorySelect } from '@/app/(store)/admin/AdminCategorySelect'
import { Checkbox } from '@/components/ui/Checkbox'
import { Field } from '@/components/ui/field/Field'
import { Textarea } from '@/components/ui/Textarea'
import type { TAdminArticleValues } from '@/schemas/admin.schema'

interface IArticleFieldsProps {
	categoryTitle?: string
}

export function ArticleFields({ categoryTitle }: IArticleFieldsProps) {
	const {
		register,
		control,
		formState: { errors }
	} = useFormContext<TAdminArticleValues>()

	return (
		<>
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
			<Controller
				control={control}
				name='categoryId'
				render={({ field }) => (
					<AdminCategorySelect
						isBlog
						value={field.value}
						onChange={field.onChange}
						selectedLabel={categoryTitle}
						error={errors.categoryId?.message}
					/>
				)}
			/>
			<Textarea
				label='Description'
				rows={3}
				error={errors.description?.message}
				{...register('description')}
			/>
			<Textarea
				label='Content'
				rows={12}
				error={errors.content?.message}
				{...register('content')}
			/>
			<Checkbox label='Published' {...register('published')} />
		</>
	)
}
