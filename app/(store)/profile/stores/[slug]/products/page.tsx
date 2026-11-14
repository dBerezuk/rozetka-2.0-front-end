import type { Metadata } from 'next'

import { StoreProductsPage } from '@/app/(store)/profile/stores/[slug]/products/StoreProductsPage'

export const metadata: Metadata = { title: 'Store products' }

export default function StoreProducts() {
	return <StoreProductsPage />
}
