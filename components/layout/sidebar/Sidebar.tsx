import type { ISidebarProps } from '@/components/layout/sidebar/sidebar.types'
import { SidebarLoading } from '@/components/layout/sidebar/SidebarLoading'
import { SidebarSection } from '@/components/layout/sidebar/SidebarSection'
import { cn } from '@/utils/cn.util'

export function Sidebar({
	sections,
	label = 'Browse',
	className,
	isLoading = false,
	emptyMessage = 'No links available.'
}: ISidebarProps) {
	return (
		<aside
			className={cn(
				'relative min-w-0 bg-secondary py-2 text-white lg:p-4',
				'lg:before:pointer-events-none lg:before:absolute lg:before:inset-y-0 lg:before:right-full lg:before:w-1 lg:before:translate-x-0.5 lg:before:bg-secondary lg:before:[box-shadow:0_0_0_100vmax_var(--color-secondary)] lg:before:[clip-path:inset(0_0_0_-100vmax)]',
				className
			)}
		>
			<nav
				aria-label={label}
				aria-busy={isLoading}
				className='max-lg:box-border max-lg:flex max-lg:w-full max-lg:gap-3 max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:px-4 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:divide-y lg:divide-gray-700'
			>
				{isLoading ? (
					<SidebarLoading />
				) : (
					sections.map(section => (
						<SidebarSection
							key={section.label}
							{...section}
							isLoading={isLoading}
							emptyMessage={emptyMessage}
						/>
					))
				)}
			</nav>
		</aside>
	)
}
