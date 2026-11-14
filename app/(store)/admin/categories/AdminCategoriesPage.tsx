'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { AdminDeleteDialog } from '@/app/(store)/admin/AdminDeleteDialog'
import { AdminRowActions } from '@/app/(store)/admin/AdminRowActions'
import { CategoryForm } from '@/app/(store)/admin/categories/CategoryForm'
import { useAdminList } from '@/app/(store)/admin/useAdminList'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { LoadMore } from '@/components/ui/LoadMore'
import { Table } from '@/components/ui/Table'
import { categoriesService } from '@/services/categories.service'
import type { ICategoryListItem } from '@/types/category.types'

export function AdminCategoriesPage() {
	const query = useAdminList('categories', params =>
		categoriesService.getAll(params)
	)

	const [editor, setEditor] = useState<{ item?: ICategoryListItem } | null>(
		null
	)
	const [deleted, setDeleted] = useState<ICategoryListItem | null>(null)

	return (
		<PageContent
			title='Product categories'
			description='Manage categories, their hierarchy and images.'
			actions={
				<Button onClick={() => setEditor({})}>
					<Plus size={16} aria-hidden='true' />
					New category
				</Button>
			}
		>
			<Table
				data={query.items}
				isLoading={query.isLoading}
				getRowKey={item => item.id}
				caption='Product categories'
				columns={[
					{
						id: 'title',
						header: 'Title',
						cell: item => <span className='font-medium'>{item.title}</span>
					},
					{ id: 'slug', header: 'Address', cell: item => item.slug },
					{
						id: 'children',
						header: 'Subcategories',
						cell: item => item.children.length
					},
					{
						id: 'actions',
						header: <span className='sr-only'>Actions</span>,
						cell: item => (
							<AdminRowActions
								title={item.title}
								onEdit={() => setEditor({ item })}
								onDelete={() => setDeleted(item)}
							/>
						)
					}
				]}
			/>
			<LoadMore query={query} />
			{editor && (
				<CategoryForm category={editor.item} onClose={() => setEditor(null)} />
			)}
			<AdminDeleteDialog
				item={deleted}
				onDelete={id => categoriesService.delete(id)}
				onClose={() => setDeleted(null)}
			/>
		</PageContent>
	)
}
