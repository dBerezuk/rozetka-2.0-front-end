import type { ReactNode } from 'react'

import { cn } from '@/utils/cn.util'

interface ISliderSlideProps {
	children: ReactNode
	index: number
	count: number
	className?: string
}

export function SliderSlide({
	children,
	index,
	count,
	className
}: ISliderSlideProps) {
	return (
		<div
			role='group'
			aria-roledescription='slide'
			aria-label={`${index + 1} of ${count}`}
			className={cn('min-w-0 shrink-0 basis-full snap-start', className)}
		>
			{children}
		</div>
	)
}
