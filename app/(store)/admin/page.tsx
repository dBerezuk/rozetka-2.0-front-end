import type { Metadata } from 'next'

import { AdministrationPage } from '@/app/(store)/admin/AdministrationPage'

export const metadata: Metadata = {
	title: 'Administration',
	description: 'Manage the catalog and content of your marketplace.'
}

export default function Page() {
	return <AdministrationPage />
}
