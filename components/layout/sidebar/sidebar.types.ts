import type { LucideIcon } from 'lucide-react'

export interface ISidebarProps {
	sections: ISidebarSection[]
	label?: string
	className?: string
	isLoading?: boolean
	emptyMessage?: string
}

export interface ISidebarSectionProps extends ISidebarSection {
	isLoading: boolean
	emptyMessage: string
}

export interface ISidebarLink {
	label: string
	url: string
	iconPathName?: string | null
	icon?: LucideIcon
	isActive?: boolean
}

export interface ISidebarSection {
	label: string
	isLabelHidden?: boolean
	links: ISidebarLink[]
}
