'use client'

import { Heart } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { useProfile } from '@/hooks/useProfile'

export function HeaderFavoritesButton() {
	const isHydrated = useIsHydrated()
	const { data: profile } = useProfile()
	const count = isHydrated ? (profile?.favorites.length ?? 0) : 0

	return (
		<Button
			url={pagesConfig.favorites}
			variant='secondary'
			size='icon'
			className='relative'
			aria-label={count > 0 ? `Favorites (${count})` : 'Favorites'}
		>
			<Heart size={20} aria-hidden='true' />
			{count > 0 && (
				<Badge
					aria-hidden='true'
					className='absolute -top-1 -right-1 h-5 min-w-5 justify-center bg-gray-200 px-1 py-0 text-[10px] leading-none text-gray-950'
				>
					{count}
				</Badge>
			)}
		</Button>
	)
}
