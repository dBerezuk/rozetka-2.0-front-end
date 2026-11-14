import type { Metadata } from 'next'

import { StoreSettingsPage } from '@/app/(store)/profile/stores/[slug]/settings/StoreSettingsPage'

export const metadata: Metadata = { title: 'Store settings' }

export default function StoreSettings() {
	return <StoreSettingsPage />
}
