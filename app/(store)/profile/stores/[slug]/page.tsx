import type { Metadata } from 'next'

import { ProfileStorePage } from '@/app/(store)/profile/stores/[slug]/ProfileStorePage'

export const metadata: Metadata = { title: 'My store' }

export default function ProfileStore() {
	return <ProfileStorePage />
}
