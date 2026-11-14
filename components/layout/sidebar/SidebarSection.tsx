import type { ISidebarSectionProps } from '@/components/layout/sidebar/sidebar.types'
import { SidebarLink } from '@/components/layout/sidebar/SidebarLink'
import { cn } from '@/utils/cn.util'

export function SidebarSection({
	label,
	isLabelHidden,
	links,
	isLoading,
	emptyMessage
}: ISidebarSectionProps) {
	return (
		<div className='max-lg:shrink-0 lg:py-4 lg:first:pt-0'>
			<h2
				className={cn(
					'mb-2 px-3 text-xs font-medium uppercase tracking-wide text-gray-400',
					isLabelHidden ? 'sr-only' : 'max-lg:sr-only'
				)}
			>
				{label}
			</h2>
			{links.length > 0 ? (
				<ul className='max-lg:flex'>
					{links.map(link => (
						<SidebarLink key={link.url} {...link} />
					))}
				</ul>
			) : (
				!isLoading &&
				links.length === 0 && (
					<p role='status' className='px-3 text-sm'>
						{emptyMessage}
					</p>
				)
			)}
		</div>
	)
}
