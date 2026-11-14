'use client'

import { ShieldCheck } from 'lucide-react'

import { ProfileSession } from '@/app/(store)/profile/sessions/ProfileSession'
import { ProfileSessionsSkeleton } from '@/app/(store)/profile/sessions/ProfileSessionsSkeleton'
import { useProfileSessions } from '@/app/(store)/profile/sessions/useProfileSessions'
import { Section } from '@/components/ui/Section'

export function ProfileSessions() {
	const { data: sessions, isPending, onEndSession, isEndingSession, endingSessionId } = useProfileSessions()

	return (
		<Section title='Active sessions' description='Review your devices and sign out of sessions you no longer use.' icon={ShieldCheck}>
			{isPending ? (
				<ProfileSessionsSkeleton />
			) : (
				sessions &&
				(sessions.length ? (
					<ul className='divide-y divide-gray-200'>
						{sessions.map(session => (
							<ProfileSession
								key={session.id}
								session={session}
								onEndSession={onEndSession}
								isDisabled={isEndingSession}
								isEnding={isEndingSession && endingSessionId === session.id}
							/>
						))}
					</ul>
				) : (
					<p className='text-sm text-gray-500'>No active sessions found.</p>
				))
			)}
		</Section>
	)
}
