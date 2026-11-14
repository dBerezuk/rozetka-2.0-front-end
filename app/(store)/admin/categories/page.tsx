import type { Metadata } from 'next'

import { AdminCategoriesPage } from '@/app/(store)/admin/categories/AdminCategoriesPage'

export const metadata: Metadata = {
	title: 'Product categories',
	description: 'Manage product categories, their hierarchy and images.'
}

export default function Page() {
	return <AdminCategoriesPage />
}
