import type { Metadata } from 'next'

import { AdminArticlesPage } from '@/app/(store)/admin/articles/AdminArticlesPage'

export const metadata: Metadata = {
	title: 'Articles',
	description: 'Create, edit and publish articles or save drafts.'
}

export default function Page() {
	return <AdminArticlesPage />
}
