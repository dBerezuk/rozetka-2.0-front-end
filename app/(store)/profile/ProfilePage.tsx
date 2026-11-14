'use client'

import { Shield } from 'lucide-react'

import { ProfileDeleteAccount } from '@/app/(store)/profile/account/ProfileDeleteAccount'
import { ProfileLogout } from '@/app/(store)/profile/account/ProfileLogout'
import { ProfileForm } from '@/app/(store)/profile/details/ProfileForm'
import { ProfileSkeleton } from '@/app/(store)/profile/ProfileSkeleton'
import { ProfileSessions } from '@/app/(store)/profile/sessions/ProfileSessions'
import { ProfileStoreBanner } from '@/app/(store)/profile/stores/ProfileStoreBanner'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { canAccessAdmin } from '@/config/admin.config'
import { pagesConfig } from '@/config/pages.config'
import { useProfile } from '@/hooks/useProfile'

export function ProfilePage() {
	const { data: profile, isPending } = useProfile()

	return (
		<PageContent
			title='My profile'
			description='Keep your details up to date and your account secure.'
			actions={
				(isPending || profile) && (
					<div className='flex flex-wrap gap-3'>
						{canAccessAdmin(profile?.role) && (
							<Button url={pagesConfig.admin} variant='outline'>
								<Shield size={16} aria-hidden='true' />
								Administration
							</Button>
						)}
						<ProfileLogout isLoading={isPending} />
					</div>
				)
			}
		>
			<ProfileStoreBanner />
			{isPending ? (
				<ProfileSkeleton />
			) : (
				profile && (
					<>
						<ProfileForm key={profile.id} profile={profile} />
						<ProfileSessions />
						<ProfileDeleteAccount />
					</>
				)
			)}
		</PageContent>
	)
}
