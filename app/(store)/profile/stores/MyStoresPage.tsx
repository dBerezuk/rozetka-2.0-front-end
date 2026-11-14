'use client'

import { Plus } from 'lucide-react'

import { STORE_TABLE_COLUMNS } from '@/app/(store)/profile/stores/store-table.data'
import { useMyStores } from '@/app/(store)/profile/stores/useMyStores'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { Table } from '@/components/ui/Table'
import { pagesConfig } from '@/config/pages.config'

export function MyStoresPage() {
	const { data: stores, isPending } = useMyStores()

	return (
		<PageContent
			title='My stores'
			description='Your stores on Rozetka, all in one place.'
			actions={
				<Button url={pagesConfig.createStore}>
					<Plus size={18} aria-hidden='true' />
					Create a store
				</Button>
			}
		>
			{(isPending || stores) && (
				<Table
					data={stores ?? []}
					columns={STORE_TABLE_COLUMNS}
					getRowKey={store => store.id}
					caption='My stores'
					isLoading={isPending}
					emptyMessage="You haven't created a store yet. Give it a name and tell shoppers what you offer."
				/>
			)}
		</PageContent>
	)
}
