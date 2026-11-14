import { useState } from 'react'

import { useAdminForm } from '@/app/(store)/admin/useAdminForm'
import { adminCategorySchema } from '@/schemas/admin.schema'
import { categoriesService } from '@/services/categories.service'
import type { ICategory } from '@/types/category.types'

export function useCategoryForm(
	category: ICategory | undefined,
	onClose: () => void
) {
	const [isUploading, setIsUploading] = useState(false)

	const state = useAdminForm(
		adminCategorySchema,
		{
			title: category?.title ?? '',
			slug: category?.slug ?? '',
			parentId: category?.parentId ?? '',
			imageFileName: category?.imageFileName ?? null,
			iconPathName: category?.iconPathName ?? ''
		},
		values => {
			const body = {
				...values,
				parentId: values.parentId || null,
				iconPathName: values.iconPathName || null
			}

			return category
				? categoriesService.update(category.id, body)
				: categoriesService.create(body)
		},
		onClose
	)

	return { ...state, isUploading, setIsUploading }
}
