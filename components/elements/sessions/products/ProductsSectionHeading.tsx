import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'

interface IProductsSectionHeadingProps {
	title: string
	titleId: string
	url?: string
	linkLabel?: string
}

export function ProductsSectionHeading({
	title,
	titleId,
	url,
	linkLabel = 'View all'
}: IProductsSectionHeadingProps) {
	return (
		<>
			<h2 id={titleId} className='text-xl font-semibold tracking-tight'>
				{title}
			</h2>
			{url && (
				<Button
					url={url}
					variant='plain'
					size='small'
					className='h-auto gap-1 rounded-sm px-0 py-1 font-normal text-green-600 hover:text-primary'
				>
					{linkLabel}
					<ChevronRight size={16} aria-hidden='true' />
				</Button>
			)}
		</>
	)
}
