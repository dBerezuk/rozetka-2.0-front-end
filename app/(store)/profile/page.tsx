import type { Metadata } from 'next'

import { ProfilePage } from '@/app/(store)/profile/ProfilePage'

export const metadata: Metadata = { title: 'My profile' }

export default function Profile() {
	return <ProfilePage />
}
