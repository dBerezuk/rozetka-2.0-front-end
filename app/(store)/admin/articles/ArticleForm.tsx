'use client'

import { useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { AdminImageField } from '@/app/(store)/admin/AdminImageField'
import { ArticleFields } from '@/app/(store)/admin/articles/ArticleFields'
import { useAdminForm } from '@/app/(store)/admin/useAdminForm'
import { Modal } from '@/components/elements/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { mediaConfig } from '@/config/media.config'
import { adminArticleSchema } from '@/schemas/admin.schema'
import { articlesService } from '@/services/articles.service'
import type { IArticleDetails } from '@/types/article.types'

interface IArticleFormProps {
	article?: IArticleDetails
	onClose: () => void
}

export function ArticleForm({ article, onClose }: IArticleFormProps) {
	const [isUploading, setIsUploading] = useState(false)

	const { form, onSubmit, isPending } = useAdminForm(
		adminArticleSchema,
		{
			title: article?.title ?? '',
			slug: article?.slug ?? '',
			description: article?.description ?? '',
			content: article?.content ?? '',
			categoryId: article?.categoryId ?? '',
			published: article?.published ?? false,
			imageFileName: article?.imageFileName ?? null
		},
		values =>
			article
				? articlesService.update(article.id, values)
				: articlesService.create(values),
		onClose
	)

	return (
		<Modal
			isOpen
			title={article ? 'Edit article' : 'New article'}
			isBusy={isPending || isUploading}
			onClose={onClose}
		>
			<FormProvider {...form}>
				<form noValidate onSubmit={onSubmit}>
					<fieldset disabled={isPending || isUploading} className='space-y-5'>
						<ArticleFields categoryTitle={article?.category.title} />
						<AdminImageField
							value={form.watch('imageFileName')}
							folder={mediaConfig.folders.articles}
							onChange={value => form.setValue('imageFileName', value)}
							onUploadingChange={setIsUploading}
							isPending={isPending}
						/>
						<div className='flex justify-end gap-3 border-t border-gray-100 pt-5'>
							<Button
								variant='outline'
								disabled={isUploading}
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button type='submit' disabled={isUploading}>
								{isPending ? 'Saving...' : 'Save article'}
							</Button>
						</div>
					</fieldset>
				</form>
			</FormProvider>
		</Modal>
	)
}
