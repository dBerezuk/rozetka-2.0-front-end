'use client'

import { useProfileStore } from '@/app/(store)/profile/stores/useProfileStore'
import { CopyLink } from '@/components/elements/CopyLink'
import { PageContent } from '@/components/layout/PageContent'
import { Skeleton } from '@/components/ui/Skeleton'
import { pagesConfig } from '@/config/pages.config'

export function ProfileStorePage() {
	const { data: store, isPending } = useProfileStore()

	return (
		<PageContent
			title={store?.title ?? 'Store'}
			description={store?.description ?? 'Manage your store.'}
			actions={store && <CopyLink url={pagesConfig.getStore(store.slug)} />}
		>
			{isPending ? (
				<Skeleton className='h-5 w-24' />
			) : store ? (
				<p className='text-sm'>Statistics</p>
			) : (
				<p className='text-sm text-gray-500'>
					This store is not available in your profile.
				</p>
			)}
		</PageContent>
	)
}
