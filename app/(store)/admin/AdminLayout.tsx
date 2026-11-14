'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { getAdminSidebarSection } from '@/app/(store)/admin/admin-sidebar.data'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { PROFILE_SIDEBAR_SECTIONS } from '@/components/layout/sidebar/sidebar.data'
import { useProfile } from '@/hooks/useProfile'

interface IAdminLayoutProps {
	children: ReactNode
}

export function AdminLayout({ children }: IAdminLayoutProps) {
	const { data: profile, isPending } = useProfile()
	const pathname = usePathname()

	const sections = profile
		? [
				...PROFILE_SIDEBAR_SECTIONS,
				getAdminSidebarSection(profile.role, pathname)
			]
		: PROFILE_SIDEBAR_SECTIONS

	return (
		<div className='grid flex-1 bg-secondary lg:grid-cols-[280px_minmax(0,1fr)]'>
			<Sidebar
				sections={sections}
				label='Administration navigation'
				isLoading={isPending}
			/>
			<div className='min-w-0 rounded-t-2xl bg-bg p-4 sm:p-6 lg:rounded-tr-none lg:p-8'>
				{children}
			</div>
		</div>
	)
}
