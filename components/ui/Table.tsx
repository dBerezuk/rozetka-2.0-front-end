import { Inbox } from 'lucide-react'
import type { Key, ReactNode } from 'react'

import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/utils/cn.util'

export interface ITableColumn<TData> {
	id: string
	header: ReactNode
	cell: (item: TData) => ReactNode
	className?: string
}

interface ITableProps<TData> {
	data: readonly TData[]
	columns: readonly ITableColumn<TData>[]
	getRowKey: (item: TData) => Key
	caption: string
	isLoading?: boolean
	emptyMessage?: string
	className?: string
	tableClassName?: string
}

export function Table<TData>({
	data,
	columns,
	getRowKey,
	caption,
	isLoading = false,
	emptyMessage = 'No data available.',
	className,
	tableClassName
}: ITableProps<TData>) {
	return (
		<div className={cn('overflow-hidden rounded-2xl border border-gray-200 bg-white', className)}>
			{isLoading && (
				<p role='status' className='sr-only'>
					Loading data...
				</p>
			)}
			<div
				className='overflow-x-auto focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2'
				role='region'
				aria-label={caption}
				tabIndex={0}
			>
				<table className={cn('w-full border-collapse text-left text-sm', tableClassName)} aria-busy={isLoading}>
					<caption className='sr-only'>{caption}</caption>
					<thead className='border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500'>
						<tr>
							{columns.map(column => (
								<th key={column.id} scope='col' className={cn('px-5 py-3.5 font-medium', column.className)}>
									{column.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200'>
						{isLoading ? (
							[0, 1, 2].map(row => (
								<tr key={row} aria-hidden='true'>
									{columns.map(column => (
										<td key={column.id} className={cn('px-5 py-5', column.className)}>
											<Skeleton className='h-4 w-full min-w-16 max-w-40' />
										</td>
									))}
								</tr>
							))
						) : data.length ? (
							data.map(item => (
								<tr key={getRowKey(item)} className='transition-colors duration-200 hover:bg-gray-50 focus-within:bg-gray-50 motion-reduce:transition-none'>
									{columns.map(column => (
										<td key={column.id} className={cn('px-5 py-4 align-middle', column.className)}>
											{column.cell(item)}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={columns.length} className='px-5 py-10 text-center text-gray-500'>
									<div className='flex flex-col items-center gap-3'>
										<Inbox size={32} strokeWidth={1.5} aria-hidden='true' className='text-gray-400' />
										<p className='max-w-sm text-sm leading-6'>{emptyMessage}</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
