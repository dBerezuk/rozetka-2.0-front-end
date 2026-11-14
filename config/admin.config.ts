import { pagesConfig } from '@/config/pages.config'
import type { TUserRole } from '@/types/user.types'

const CATALOG_ROLES: TUserRole[] = ['ADMIN', 'CATALOG_MANAGER']
const CONTENT_ROLES: TUserRole[] = ['ADMIN', 'CONTENT_MANAGER']

export const ADMIN_SECTIONS = [
	{
		title: 'Product categories',
		description: 'Organize the catalog and manage category images.',
		url: pagesConfig.adminCategories,
		roles: CATALOG_ROLES
	},
	{
		title: 'Characteristics',
		description: 'Manage category specifications and available filters.',
		url: pagesConfig.adminCharacteristics,
		roles: CATALOG_ROLES
	},
	{
		title: 'Articles',
		description: 'Write, edit and publish articles or save drafts.',
		url: pagesConfig.adminArticles,
		roles: CONTENT_ROLES
	},
	{
		title: 'Blog categories',
		description: 'Organize articles into blog categories.',
		url: pagesConfig.adminBlogCategories,
		roles: CONTENT_ROLES
	}
]

export function getAdminSections(role?: TUserRole) {
	return role
		? ADMIN_SECTIONS.filter(section => section.roles.includes(role))
		: []
}

export function canAccessAdmin(role?: TUserRole, pathname = pagesConfig.admin) {
	return getAdminSections(role).some(
		section =>
			pathname === pagesConfig.admin ||
			pathname === section.url ||
			pathname.startsWith(`${section.url}/`)
	)
}
