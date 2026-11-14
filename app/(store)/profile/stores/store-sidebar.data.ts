import { House, Package, Settings } from 'lucide-react'

import type { ISidebarSection } from '@/components/layout/sidebar/sidebar.types'
import { pagesConfig } from '@/config/pages.config'
import type { IStore } from '@/types/store.types'

export function getStoreSidebarSection(
	store: IStore,
	pathname: string
): ISidebarSection {
	const homeUrl = pagesConfig.getProfileStore(store.slug)
	const productsUrl = pagesConfig.getStoreProducts(store.slug)
	const settingsUrl = pagesConfig.getStoreSettings(store.slug)

	return {
		label: `Store · ${store.title}`,
		links: [
			{
				label: 'Home',
				url: homeUrl,
				icon: House,
				isActive: pathname === homeUrl
			},
			{
				label: 'Products',
				url: productsUrl,
				icon: Package,
				isActive: pathname === productsUrl
			},
			{
				label: 'Settings',
				url: settingsUrl,
				icon: Settings,
				isActive: pathname === settingsUrl
			}
		]
	}
}
