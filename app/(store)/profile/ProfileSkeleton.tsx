import { ShieldCheck, Trash2 } from 'lucide-react'

import { ProfileFormSkeleton } from '@/app/(store)/profile/details/ProfileFormSkeleton'
import { ProfileSessionsSkeleton } from '@/app/(store)/profile/sessions/ProfileSessionsSkeleton'
import { Button } from '@/components/ui/button/Button'
import { Section } from '@/components/ui/Section'

export function ProfileSkeleton() {
	return (
		<div role='status' className='space-y-6'>
			<span className='sr-only'>Loading your profile...</span>
			<ProfileFormSkeleton />
			<Section title='Active sessions' description='Review your devices and sign out of sessions you no longer use.' icon={ShieldCheck} aria-hidden='true'>
				<ProfileSessionsSkeleton />
			</Section>
			<Section
				title='Delete account'
				description='Permanently delete your account and profile data. This action cannot be undone.'
				isInline
				aria-hidden='true'
				className='border-red-500/20'
			>
				<Button isLoading>
					<Trash2 size={16} />
					Delete account
				</Button>
			</Section>
		</div>
	)
}
