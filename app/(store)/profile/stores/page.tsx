import type { Metadata } from 'next'

import { MyStoresPage } from '@/app/(store)/profile/stores/MyStoresPage'

export const metadata: Metadata = { title: 'My stores' }

export default function MyStores() {
	return <MyStoresPage />
}
