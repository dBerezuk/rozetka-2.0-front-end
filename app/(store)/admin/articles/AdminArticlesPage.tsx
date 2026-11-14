'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { AdminDeleteDialog } from '@/app/(store)/admin/AdminDeleteDialog'
import { AdminRowActions } from '@/app/(store)/admin/AdminRowActions'
import { AdminStatusBadge } from '@/app/(store)/admin/AdminStatusBadge'
import { ArticleForm } from '@/app/(store)/admin/articles/ArticleForm'
import { useAdminList } from '@/app/(store)/admin/useAdminList'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { LoadMore } from '@/components/ui/LoadMore'
import { Table } from '@/components/ui/Table'
import { articlesService } from '@/services/articles.service'
import type { IArticleDetails } from '@/types/article.types'
import { formatDate } from '@/utils/format-date.util'

export function AdminArticlesPage() {
	const query = useAdminList('articles', params =>
		articlesService.getAllForManagement(params)
	)

	const [editor, setEditor] = useState<{ item?: IArticleDetails } | null>(null)
	const [deleted, setDeleted] = useState<IArticleDetails | null>(null)

	return (
		<PageContent
			title='Articles'
			description='Create drafts and publish content on your website.'
			actions={
				<Button onClick={() => setEditor({})}>
					<Plus size={16} aria-hidden='true' />
					New article
				</Button>
			}
		>
			<Table
				data={query.items}
				isLoading={query.isLoading}
				getRowKey={item => item.id}
				caption='Articles and drafts'
				columns={[
					{
						id: 'title',
						header: 'Title',
						cell: item => <span className='font-medium'>{item.title}</span>
					},
					{
						id: 'category',
						header: 'Category',
						cell: item => item.category.title
					},
					{
						id: 'published',
						header: 'Status',
						cell: item => (
							<AdminStatusBadge
								isEnabled={item.published}
								enabledLabel='Published'
								disabledLabel='Draft'
							/>
						)
					},
					{
						id: 'updated',
						header: 'Updated',
						cell: item => formatDate(item.updatedAt)
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
				<ArticleForm article={editor.item} onClose={() => setEditor(null)} />
			)}
			<AdminDeleteDialog
				item={deleted}
				onDelete={id => articlesService.delete(id)}
				onClose={() => setDeleted(null)}
			/>
		</PageContent>
	)
}
