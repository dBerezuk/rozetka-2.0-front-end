import {
	BookOpen,
	FolderTree,
	LayoutDashboard,
	ListFilter,
	Newspaper
} from 'lucide-react'

import type { ISidebarSection } from '@/components/layout/sidebar/sidebar.types'
import { canAccessAdmin } from '@/config/admin.config'
import { pagesConfig } from '@/config/pages.config'
import type { TUserRole } from '@/types/user.types'

export function getAdminSidebarSection(
	role: TUserRole,
	pathname: string
): ISidebarSection {
	const links = [
		{ label: 'Overview', url: pagesConfig.admin, icon: LayoutDashboard },
		{
			label: 'Product categories',
			url: pagesConfig.adminCategories,
			icon: FolderTree
		},
		{
			label: 'Characteristics',
			url: pagesConfig.adminCharacteristics,
			icon: ListFilter
		},
		{ label: 'Articles', url: pagesConfig.adminArticles, icon: Newspaper },
		{
			label: 'Blog categories',
			url: pagesConfig.adminBlogCategories,
			icon: BookOpen
		}
	]

	return {
		label: 'Administration',
		links: links
			.filter(link => canAccessAdmin(role, link.url))
			.map(link => ({
				...link,
				isActive: pathname === link.url
			}))
	}
}
