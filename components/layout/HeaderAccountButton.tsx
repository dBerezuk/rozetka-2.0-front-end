'use client'

import { UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { pagesConfig } from '@/config/pages.config'
import { useProfile } from '@/hooks/useProfile'

export function HeaderAccountButton() {
	const { data: profile, isPending } = useProfile()

	return isPending ? (
		<Skeleton variant='dark' className='size-11 shrink-0 rounded-xl' />
	) : (
		<Button
			url={profile ? pagesConfig.profile : pagesConfig.login}
			variant='secondary'
			size='icon'
			aria-label={profile ? 'My profile' : 'Sign in'}
		>
			<UserRound size={20} aria-hidden='true' />
		</Button>
	)
}
