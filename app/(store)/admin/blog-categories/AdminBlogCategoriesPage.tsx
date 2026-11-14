'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { AdminDeleteDialog } from '@/app/(store)/admin/AdminDeleteDialog'
import { AdminRowActions } from '@/app/(store)/admin/AdminRowActions'
import { BlogCategoryForm } from '@/app/(store)/admin/blog-categories/BlogCategoryForm'
import { useAdminList } from '@/app/(store)/admin/useAdminList'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { LoadMore } from '@/components/ui/LoadMore'
import { Table } from '@/components/ui/Table'
import { blogCategoriesService } from '@/services/blog-categories.service'
import type { IBlogCategory } from '@/types/blog-category.types'

export function AdminBlogCategoriesPage() {
	const query = useAdminList('blog-categories', params =>
		blogCategoriesService.getAll(params)
	)

	const [editor, setEditor] = useState<{ item?: IBlogCategory } | null>(null)
	const [deleted, setDeleted] = useState<IBlogCategory | null>(null)

	return (
		<PageContent
			title='Blog categories'
			description='Organize articles into categories.'
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
				caption='Blog categories'
				columns={[
					{
						id: 'title',
						header: 'Title',
						cell: item => <span className='font-medium'>{item.title}</span>
					},
					{ id: 'slug', header: 'Address', cell: item => item.slug },
					{
						id: 'description',
						header: 'Description',
						cell: item => (
							<span className='line-clamp-2 max-w-xs text-gray-500'>
								{item.description}
							</span>
						)
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
				<BlogCategoryForm
					category={editor.item}
					onClose={() => setEditor(null)}
				/>
			)}
			<AdminDeleteDialog
				item={deleted}
				onDelete={id => blogCategoriesService.delete(id)}
				onClose={() => setDeleted(null)}
			/>
		</PageContent>
	)
}
