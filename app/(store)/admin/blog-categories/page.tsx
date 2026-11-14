import type { Metadata } from 'next'

import { AdminBlogCategoriesPage } from '@/app/(store)/admin/blog-categories/AdminBlogCategoriesPage'

export const metadata: Metadata = {
	title: 'Blog categories',
	description: 'Manage categories for your blog articles.'
}

export default function Page() {
	return <AdminBlogCategoriesPage />
}
