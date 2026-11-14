import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SearchPage } from '@/app/(store)/search/SearchPage'

export const metadata: Metadata = {
	title: 'Search',
	robots: { index: false, follow: false }
}

export default function Page() {
	return (
		<div className='space-y-6 p-4 sm:p-6 lg:p-8'>
			<h1 className='text-2xl font-semibold text-gray-950 sm:text-3xl'>
				Search products
			</h1>
			<Suspense>
				<SearchPage />
			</Suspense>
		</div>
	)
}
