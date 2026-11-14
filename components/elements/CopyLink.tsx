'use client'

import { Link2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button/Button'
import { cn } from '@/utils/cn.util'

interface ICopyLinkProps {
	url: string
	className?: string
}

export function CopyLink({ url, className }: ICopyLinkProps) {
	const onCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(
				new URL(url, window.location.origin).href
			)

			toast.success('Link copied.')
		} catch {
			toast.error('Could not copy the link. Please try again.')
		}
	}

	return (
		<Button
			variant='outline'
			size='small'
			onClick={onCopyLink}
			aria-label={`Copy link: ${url}`}
			title={`Copy ${url}`}
			className={cn(
				'min-w-0 max-w-full shrink justify-start gap-2 px-2 text-xs',
				className
			)}
		>
			<Link2 size={14} aria-hidden='true' className='shrink-0' />
			<span className='truncate'>{url}</span>
		</Button>
	)
}
