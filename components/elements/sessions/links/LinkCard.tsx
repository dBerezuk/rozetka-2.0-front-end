import { LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface ILinkCardProps {
	label: string
	url: string
	iconUrl?: string | null
	imageUrl?: string | null
}

export function LinkCard({ label, url, iconUrl, imageUrl }: ILinkCardProps) {
	return (
		<Link
			href={url}
			className='flex h-full min-h-16 items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-center text-sm font-medium transition-colors duration-200 hover:bg-primary/5 hover:text-green-600 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none'
		>
			{iconUrl ? (
				<Image
					src={iconUrl}
					alt=''
					width={32}
					height={32}
					className='size-8 shrink-0 object-contain brightness-0 opacity-80'
					unoptimized
				/>
			) : imageUrl ? (
				<Image
					src={imageUrl}
					alt=''
					width={40}
					height={40}
					className='size-10 shrink-0 rounded-lg bg-white object-contain'
					unoptimized
				/>
			) : (
				<LayoutGrid
					size={28}
					className='shrink-0 text-primary'
					aria-hidden='true'
				/>
			)}
			<span className='min-w-0'>{label}</span>
		</Link>
	)
}
