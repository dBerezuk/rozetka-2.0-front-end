import type { Metadata } from 'next'

import { FavoritesPage } from '@/app/(store)/wishlist/FavoritesPage'

export const metadata: Metadata = {
	title: 'Favorites',
	robots: { index: false, follow: false }
}

export default function Page() {
	return <FavoritesPage />
}
