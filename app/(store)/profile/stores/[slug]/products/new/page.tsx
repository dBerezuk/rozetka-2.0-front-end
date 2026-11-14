import type { Metadata } from 'next'

import { ProductEditorPage } from '@/app/(store)/profile/stores/[slug]/products/ProductEditorPage'

export const metadata: Metadata = { title: 'Create product' }

export default function CreateProduct() {
	return <ProductEditorPage />
}
