import { ArrowUpRight, Store } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button/Button'
import type { ITableColumn } from '@/components/ui/Table'
import { pagesConfig } from '@/config/pages.config'
import type { IStore } from '@/types/store.types'
import { formatDate } from '@/utils/format-date.util'

export const STORE_TABLE_COLUMNS: ITableColumn<IStore>[] = [
	{
		id: 'title',
		header: 'Store',
		className: 'min-w-48',
		cell: store => (
			<div className='flex min-w-0 items-center gap-3'>
				<div className='grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-green-600'>
					<Store size={18} aria-hidden='true' />
				</div>
				<Link
					href={pagesConfig.getStore(store.slug)}
					className='min-w-0 rounded break-words font-medium text-gray-950 transition-colors duration-200 hover:text-green-600 hover:underline focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none'
				>
					{store.title}
				</Link>
			</div>
		)
	},
	{
		id: 'description',
		header: 'Description',
		className: 'min-w-56',
		cell: store => (
			<p
				className='line-clamp-2 max-w-sm break-words leading-6 text-gray-500'
				title={store.description}
			>
				{store.description}
			</p>
		)
	},
	{
		id: 'createdAt',
		header: 'Created',
		className: 'whitespace-nowrap text-gray-500',
		cell: store => (
			<time dateTime={store.createdAt}>{formatDate(store.createdAt)}</time>
		)
	},
	{
		id: 'actions',
		header: 'Actions',
		className: 'text-right',
		cell: store => (
			<Button
				url={pagesConfig.getProfileStore(store.slug)}
				variant='outline'
				size='small'
				aria-label={`Open store: ${store.title}`}
				className='whitespace-nowrap'
			>
				Open store
				<ArrowUpRight size={16} aria-hidden='true' className='shrink-0' />
			</Button>
		)
	}
]
