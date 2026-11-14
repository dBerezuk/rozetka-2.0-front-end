import { Pencil } from 'lucide-react'

import { StoreProductTitle } from '@/app/(store)/profile/stores/[slug]/products/StoreProductTitle'
import { Button } from '@/components/ui/button/Button'
import type { ITableColumn } from '@/components/ui/Table'
import { pagesConfig } from '@/config/pages.config'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'
import { formatDate } from '@/utils/format-date.util'
import { formatPrice } from '@/utils/format-price.util'

export function getProductTableColumns(
	storeSlug: IStore['slug']
): ITableColumn<IProduct>[] {
	return [
		{
			id: 'title',
			header: 'Product',
			cell: product => <StoreProductTitle product={product} />
		},
		{
			id: 'price',
			header: 'Price',
			className: 'whitespace-nowrap',
			cell: product =>
				product.variants.length
					? formatPrice(
							Math.min(
								...product.variants.map(variant => Number(variant.price))
							)
						)
					: 'Not set'
		},
		{
			id: 'variants',
			header: 'Variants',
			cell: product => product.variants.length
		},
		{
			id: 'createdAt',
			header: 'Created',
			className: 'whitespace-nowrap text-gray-500',
			cell: product => (
				<time dateTime={product.createdAt}>
					{formatDate(product.createdAt)}
				</time>
			)
		},
		{
			id: 'actions',
			header: 'Actions',
			className: 'text-right',
			cell: product => (
				<Button
					url={pagesConfig.getEditStoreProduct(storeSlug, product.slug)}
					variant='outline'
					size='small'
					aria-label={`Edit product: ${product.title}`}
					className='whitespace-nowrap'
				>
					<Pencil size={16} aria-hidden='true' />
					Edit
				</Button>
			)
		}
	]
}
