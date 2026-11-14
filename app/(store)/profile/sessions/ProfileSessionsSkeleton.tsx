import { ProfileSessionSkeleton } from '@/app/(store)/profile/sessions/ProfileSessionSkeleton'

export function ProfileSessionsSkeleton() {
	return (
		<div role='status'>
			<span className='sr-only'>Loading sessions...</span>
			<div className='divide-y divide-gray-200'>
				<ProfileSessionSkeleton />
				<ProfileSessionSkeleton />
			</div>
		</div>
	)
}
