import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { cn } from '@/utils/cn.util'

interface ISliderArrowsProps {
	trackId: string
	className?: string
	variant?: 'grouped' | 'sides'
	isPreviousAvailable: boolean
	isNextAvailable: boolean
	onPreviousSlide: () => void
	onNextSlide: () => void
}

export function SliderArrows({
	trackId,
	className,
	variant = 'grouped',
	isPreviousAvailable,
	isNextAvailable,
	onPreviousSlide,
	onNextSlide
}: ISliderArrowsProps) {
	const isSides = variant === 'sides'
	const buttonClassName = cn(
		'transition-[background-color,border-color,color,opacity] duration-200 ease-out disabled:opacity-30',
		isSides
			? 'pointer-events-auto size-10 rounded-lg border border-gray-200 bg-white hover:border-primary hover:bg-primary/10 hover:text-primary'
			: 'h-6 w-8 rounded-full'
	)

	return (
		<div
			className={cn(
				'absolute z-20 flex h-fit items-center text-gray-950',
				isSides
					? 'pointer-events-none inset-x-2 top-1/2 -translate-y-1/2 justify-between'
					: 'bottom-3 right-3 rounded-full bg-white',
				className
			)}
		>
			<Button
				variant='ghost'
				size='icon'
				aria-label='Previous slide'
				aria-controls={trackId}
				disabled={!isPreviousAvailable}
				onClick={onPreviousSlide}
				className={buttonClassName}
			>
				<ChevronLeft size={18} aria-hidden='true' />
			</Button>
			<Button
				variant='ghost'
				size='icon'
				aria-label='Next slide'
				aria-controls={trackId}
				disabled={!isNextAvailable}
				onClick={onNextSlide}
				className={buttonClassName}
			>
				<ChevronRight size={18} aria-hidden='true' />
			</Button>
		</div>
	)
}
