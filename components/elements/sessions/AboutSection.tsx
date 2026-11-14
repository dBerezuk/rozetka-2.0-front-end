'use client'

import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button/Button'
import { cn } from '@/utils/cn.util'

interface IAboutSectionProps {
	title: string
	description: ReactNode
	children: ReactNode
}

export function AboutSection({
	title,
	description,
	children
}: IAboutSectionProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const contentId = useId()
	const titleId = useId()

	return (
		<section
			aria-labelledby={titleId}
			className='rounded-2xl bg-white p-6 sm:p-8'
		>
			<h2 id={titleId} className='text-xl font-semibold tracking-tight'>
				{title}
			</h2>
			<div className='mt-4'>
				<div className='text-sm leading-6 text-gray-500'>{description}</div>
				<div
					id={contentId}
					aria-hidden={!isExpanded}
					inert={!isExpanded}
					className={cn(
						'grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none',
						isExpanded
							? 'grid-rows-[1fr] opacity-100'
							: 'grid-rows-[0fr] opacity-0'
					)}
				>
					<div className='min-h-0 overflow-hidden'>
						<div className='space-y-4 pt-4 text-sm leading-6 text-gray-500'>
							{children}
						</div>
					</div>
				</div>
				<Button
					variant='plain'
					size='small'
					aria-expanded={isExpanded}
					aria-controls={contentId}
					onClick={() => setIsExpanded(previous => !previous)}
					className='mt-4 h-auto gap-2 rounded-sm px-0 py-1 font-normal text-green-600 hover:text-primary'
				>
					{isExpanded ? 'Read less' : 'Read more'}
					<ChevronDown
						size={16}
						aria-hidden='true'
						className={cn(
							'transition-transform duration-200 motion-reduce:transition-none',
							isExpanded && 'rotate-180'
						)}
					/>
				</Button>
			</div>
		</section>
	)
}
