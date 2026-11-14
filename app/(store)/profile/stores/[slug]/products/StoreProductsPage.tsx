'use client'

import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { getProductTableColumns } from '@/app/(store)/profile/stores/[slug]/products/product-table.data'
import { useStoreProducts } from '@/app/(store)/profile/stores/[slug]/products/useStoreProducts'
import { useProfileStore } from '@/app/(store)/profile/stores/useProfileStore'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { LoadMore } from '@/components/ui/LoadMore'
import { Table } from '@/components/ui/Table'
import { pagesConfig } from '@/config/pages.config'
import type { IStore } from '@/types/store.types'

export function StoreProductsPage() {
	const { slug } = useParams<Pick<IStore, 'slug'>>()

	const { data: store, isPending: isStorePending } = useProfileStore()

	const products = useStoreProducts()

	return (
		<PageContent
			title='Products'
			description={
				store
					? `Products in ${store.title}.`
					: 'Manage the products in your store.'
			}
			actions={
				store && (
					<Button url={pagesConfig.getCreateStoreProduct(store.slug)}>
						<Plus size={18} aria-hidden='true' />
						Create product
					</Button>
				)
			}
		>
			{isStorePending || store ? (
				<Table
					data={products.items}
					columns={getProductTableColumns(slug)}
					getRowKey={product => product.id}
					caption='Store products'
					isLoading={isStorePending || products.isPending}
					emptyMessage='No products in this store yet.'
				/>
			) : (
				<p className='text-sm text-gray-500'>
					This store is not available in your profile.
				</p>
			)}
			{store && <LoadMore query={products} />}
		</PageContent>
	)
}
