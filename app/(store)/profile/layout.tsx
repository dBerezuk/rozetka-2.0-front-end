'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { ProfileSidebar } from '@/app/(store)/profile/ProfileSidebar'
import { pagesConfig } from '@/config/pages.config'
import { useProfile } from '@/hooks/useProfile'

interface IProfileLayoutProps {
	children: ReactNode
}

export default function ProfileLayout({ children }: IProfileLayoutProps) {
	const router = useRouter()
	const { data: profile } = useProfile()

	useEffect(() => {
		if (profile === null) {
			router.replace(pagesConfig.home)
		}
	}, [profile, router])

	return profile === null ? null : (
		<div className='grid flex-1 bg-secondary lg:grid-cols-[280px_minmax(0,1fr)]'>
			<ProfileSidebar />
			<div className='min-w-0 rounded-t-2xl bg-bg p-4 sm:p-6 lg:rounded-tr-none lg:p-8'>
				<div className='mx-auto max-w-4xl'>{children}</div>
			</div>
		</div>
	)
}
