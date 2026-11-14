'use client'

import { Trash2 } from 'lucide-react'

import { useProductDelete } from '@/app/(store)/profile/stores/[slug]/products/delete/useProductDelete'
import { Button } from '@/components/ui/button/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'

interface IProductDeleteButtonProps {
	product: IProduct
	storeSlug: IStore['slug']
}

export function ProductDeleteButton({
	product,
	storeSlug
}: IProductDeleteButtonProps) {
	const {
		isConfirmOpen,
		isPending,
		onOpenConfirm,
		onCloseConfirm,
		onDeleteProduct
	} = useProductDelete(product, storeSlug)

	return (
		<>
			<Button variant='danger' disabled={isPending} onClick={onOpenConfirm}>
				<Trash2 size={18} aria-hidden='true' />
				Delete product
			</Button>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				title='Delete product?'
				description={`“${product.title}” and its images and variants will be permanently deleted. This action cannot be undone.`}
				confirmLabel='Delete product'
				pendingLabel='Deleting...'
				variant='danger'
				isPending={isPending}
				onConfirm={onDeleteProduct}
				onClose={onCloseConfirm}
			/>
		</>
	)
}
