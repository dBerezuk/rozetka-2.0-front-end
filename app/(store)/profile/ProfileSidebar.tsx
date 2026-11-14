'use client'

import { usePathname } from 'next/navigation'

import { getStoreSidebarSection } from '@/app/(store)/profile/stores/store-sidebar.data'
import { useProfileStore } from '@/app/(store)/profile/stores/useProfileStore'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { PROFILE_SIDEBAR_SECTIONS } from '@/components/layout/sidebar/sidebar.data'

export function ProfileSidebar() {
	const pathname = usePathname()
	const { data: store } = useProfileStore()
	const sections = store
		? [...PROFILE_SIDEBAR_SECTIONS, getStoreSidebarSection(store, pathname)]
		: PROFILE_SIDEBAR_SECTIONS

	return <Sidebar sections={sections} label='Account navigation' />
}
