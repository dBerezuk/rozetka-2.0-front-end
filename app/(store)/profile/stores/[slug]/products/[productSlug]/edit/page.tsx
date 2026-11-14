import type { Metadata } from 'next'

import { ProductEditorPage } from '@/app/(store)/profile/stores/[slug]/products/ProductEditorPage'

export const metadata: Metadata = { title: 'Edit product' }

export default function EditProduct() {
	return <ProductEditorPage />
}
