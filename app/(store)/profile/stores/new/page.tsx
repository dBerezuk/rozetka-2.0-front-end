import type { Metadata } from 'next'

import { StoreForm } from '@/app/(store)/profile/stores/form/StoreForm'
import { PageContent } from '@/components/layout/PageContent'

export const metadata: Metadata = { title: 'Create a store' }

export default function CreateStore() {
	return (
		<PageContent
			title='Create your store'
			description='Start with a name, a unique address and a description.'
		>
			<StoreForm />
		</PageContent>
	)
}
