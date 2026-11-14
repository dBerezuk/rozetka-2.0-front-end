import type { Metadata } from 'next'

import { AdminCharacteristicsPage } from '@/app/(store)/admin/characteristics/AdminCharacteristicsPage'

export const metadata: Metadata = {
	title: 'Characteristics',
	description: 'Manage category specifications and product filters.'
}

export default function Page() {
	return <AdminCharacteristicsPage />
}
