'use client'

import { StoreForm } from '@/app/(store)/profile/stores/form/StoreForm'
import { useProfileStore } from '@/app/(store)/profile/stores/useProfileStore'
import { CopyLink } from '@/components/elements/CopyLink'
import { PageContent } from '@/components/layout/PageContent'
import { Skeleton } from '@/components/ui/Skeleton'
import { pagesConfig } from '@/config/pages.config'

export function StoreSettingsPage() {
	const { data: store, isPending } = useProfileStore()

	return (
		<PageContent
			title='Store settings'
			description='Update your store name, address and description.'
			actions={store && <CopyLink url={pagesConfig.getStore(store.slug)} />}
		>
			{isPending ? (
				<Skeleton className='h-56 rounded-2xl' />
			) : store ? (
				<StoreForm key={store.id} store={store} />
			) : (
				<p className='text-sm text-gray-500'>
					This store is not available in your profile.
				</p>
			)}
		</PageContent>
	)
}
