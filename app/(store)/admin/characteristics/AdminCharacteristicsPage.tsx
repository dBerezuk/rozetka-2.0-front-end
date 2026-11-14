'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { AdminCategorySelect } from '@/app/(store)/admin/AdminCategorySelect'
import { AdminDeleteDialog } from '@/app/(store)/admin/AdminDeleteDialog'
import { AdminRowActions } from '@/app/(store)/admin/AdminRowActions'
import { AdminStatusBadge } from '@/app/(store)/admin/AdminStatusBadge'
import { CharacteristicForm } from '@/app/(store)/admin/characteristics/CharacteristicForm'
import { useAdminList } from '@/app/(store)/admin/useAdminList'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { Table } from '@/components/ui/Table'
import { queryKeysConfig } from '@/config/query-keys.config'
import { categoriesService } from '@/services/categories.service'
import { characteristicsService } from '@/services/characteristics.service'
import type { ICharacteristic } from '@/types/characteristic.types'

export function AdminCharacteristicsPage() {
	const [categoryId, setCategoryId] = useState('')
	const [editor, setEditor] = useState<{ item?: ICharacteristic } | null>(null)
	const [deleted, setDeleted] = useState<ICharacteristic | null>(null)

	const categories = useAdminList('category-options', params =>
		categoriesService.getAll(params)
	)

	const category = categories.items.find(item => item.id === categoryId)

	const query = useQuery({
		queryKey: queryKeysConfig.getAdminList('characteristics', category?.slug),
		queryFn: () => characteristicsService.getAllByCategorySlug(category!.slug),
		enabled: !!category
	})

	return (
		<PageContent
			title='Characteristics'
			description='Choose a category to manage specifications and product filters.'
			actions={
				<Button disabled={!category} onClick={() => setEditor({})}>
					<Plus size={16} aria-hidden='true' />
					New characteristic
				</Button>
			}
		>
			<div className='max-w-sm'>
				<AdminCategorySelect value={categoryId} onChange={setCategoryId} />
			</div>
			<Table
				data={query.data ?? []}
				isLoading={!!category && query.isLoading}
				getRowKey={item => item.id}
				caption='Category characteristics'
				emptyMessage={
					category
						? 'No characteristics in this category.'
						: 'Choose a category to view its characteristics.'
				}
				columns={[
					{
						id: 'title',
						header: 'Title',
						cell: item => <span className='font-medium'>{item.title}</span>
					},
					{
						id: 'filter',
						header: 'Product filter',
						cell: item => <AdminStatusBadge isEnabled={item.isSorting} />
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
			{editor && category && (
				<CharacteristicForm
					category={category}
					characteristic={editor.item}
					onClose={() => setEditor(null)}
				/>
			)}
			<AdminDeleteDialog
				item={deleted}
				onDelete={id => characteristicsService.delete(id)}
				onClose={() => setDeleted(null)}
			/>
		</PageContent>
	)
}
