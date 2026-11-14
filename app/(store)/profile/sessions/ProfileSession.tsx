import { Laptop, LogOut } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/button/Button'
import type { IUserSession } from '@/types/session.types'
import { formatDate } from '@/utils/format-date.util'
import { getOperatingSystemIcon } from '@/utils/get-operating-system-icon.util'

interface IProfileSessionProps {
	session: IUserSession
	onEndSession: (session: IUserSession) => void
	isEnding: boolean
	isDisabled: boolean
}

export function ProfileSession({ session, onEndSession, isEnding, isDisabled }: IProfileSessionProps) {
	const { metadata, isCurrent } = session
	const operatingSystemIcon = getOperatingSystemIcon(metadata?.operatingSystem)
	const location = [metadata?.city, metadata?.country].filter(Boolean).join(', ')
	const startedAt = formatDate(metadata?.createdAt, { dateStyle: 'medium', timeStyle: 'short' })

	return (
		<li className='flex flex-wrap items-start gap-3 py-5 first:pt-0 last:pb-0'>
			<div className='grid size-8 shrink-0 place-items-center rounded-lg border border-gray-200 bg-white text-gray-700'>
				{operatingSystemIcon ? (
					<Image src={operatingSystemIcon} alt='' width={24} height={24} className='size-6 object-contain' />
				) : (
					<Laptop size={16} aria-hidden='true' />
				)}
			</div>
			<div className='min-h-20 min-w-0 flex-1 space-y-1'>
				<div className='flex items-center gap-2'>
					<p className='min-w-0 truncate text-sm font-medium' title={metadata?.browser ?? 'Unknown browser'}>
						{metadata?.browser ?? 'Unknown browser'}
					</p>
					{isCurrent && <Badge variant='success'>This device</Badge>}
				</div>
				<p className='truncate text-xs text-gray-500'>{metadata?.operatingSystem ?? 'Unknown device'}</p>
				<p className='truncate text-xs text-gray-500' title={[location, metadata?.ip].filter(Boolean).join(' · ')}>
					{[location, metadata?.ip].filter(Boolean).join(' · ') || 'Location unavailable'}
				</p>
				{startedAt && (
					<p className='truncate text-xs text-gray-500'>
						Signed in <time dateTime={metadata?.createdAt}>{startedAt}</time>
					</p>
				)}
			</div>
			<Button
				variant='outline'
				size='small'
				className='w-32'
				disabled={isDisabled}
				onClick={() => onEndSession(session)}
				aria-label={isCurrent ? 'Sign out of this device' : `End session: ${metadata?.browser ?? 'unknown browser'}`}
			>
				<LogOut size={15} aria-hidden='true' />
				{isEnding ? 'Ending...' : isCurrent ? 'Sign out' : 'End session'}
			</Button>
		</li>
	)
}
