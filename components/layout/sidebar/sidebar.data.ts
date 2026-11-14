import { Store, UserRound } from 'lucide-react'

import type { ISidebarSection } from '@/components/layout/sidebar/sidebar.types'
import { pagesConfig } from '@/config/pages.config'

export const PROFILE_SIDEBAR_SECTIONS: ISidebarSection[] = [
	{
		label: 'My account',
		links: [
			{ label: 'Profile', url: pagesConfig.profile, icon: UserRound },
			{ label: 'My stores', url: pagesConfig.myStores, icon: Store }
		]
	}
]

export const HOME_SIDEBAR_SECTIONS: ISidebarSection[] = [
	{
		label: 'Important',
		links: [{ label: 'Blog', url: pagesConfig.blog }]
	},
	{
		label: 'Legal information',
		links: [
			{ label: 'Privacy policy', url: pagesConfig.privacy },
			{ label: 'Terms of use', url: pagesConfig.legalTerms }
		]
	}
]
