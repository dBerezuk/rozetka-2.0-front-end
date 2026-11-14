import Image from 'next/image'
import Link from 'next/link'

import type { ISidebarLink } from '@/components/layout/sidebar/sidebar.types'
import { mediaConfig } from '@/config/media.config'
import { cn } from '@/utils/cn.util'

export function SidebarLink({
	label,
	url,
	iconPathName,
	icon: Icon,
	isActive = false
}: ISidebarLink) {
	return (
		<li>
			<Link
				href={url}
				aria-current={isActive ? 'page' : undefined}
				className={cn(
					'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-gray-800 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none max-lg:whitespace-nowrap max-lg:focus-visible:-outline-offset-2',
					isActive && 'bg-gray-800 text-primary'
				)}
			>
				{Icon && <Icon size={20} aria-hidden='true' className='shrink-0' />}
				{iconPathName && (
					<Image
						src={mediaConfig.getUrl(iconPathName)}
						alt=''
						width={24}
						height={24}
						className='size-6 shrink-0 object-contain'
						unoptimized
					/>
				)}
				<span>{label}</span>
			</Link>
		</li>
	)
}
