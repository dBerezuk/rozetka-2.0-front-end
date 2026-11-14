'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { PageContent } from '@/components/layout/PageContent'
import { getAdminSections } from '@/config/admin.config'
import { useProfile } from '@/hooks/useProfile'

export function AdministrationPage() {
	const { data: profile } = useProfile()

	return (
		<PageContent
			title='Administration'
			description='Manage the catalog and content of your marketplace.'
		>
			<div className='grid gap-4 md:grid-cols-2'>
				{getAdminSections(profile?.role).map(section => (
					<Link
						key={section.url}
						href={section.url}
						className='group space-y-3 rounded-xl bg-white p-6 transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary'
					>
						<div className='flex items-center justify-between gap-3'>
							<h2 className='text-lg font-semibold'>{section.title}</h2>
							<ArrowUpRight
								size={20}
								aria-hidden='true'
								className='text-primary'
							/>
						</div>
						<p className='text-sm text-gray-500'>{section.description}</p>
					</Link>
				))}
			</div>
		</PageContent>
	)
}
