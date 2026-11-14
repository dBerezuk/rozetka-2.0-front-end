import { Button } from '@/components/ui/button/Button'
import { cn } from '@/utils/cn.util'

interface ISliderDotsProps {
	count: number
	activeIndex: number
	trackId: string
	className?: string
	onGoToSlide: (index: number) => void
}

export function SliderDots({
	count,
	activeIndex,
	trackId,
	className,
	onGoToSlide
}: ISliderDotsProps) {
	return (
		<div
			className={cn('mt-2 flex justify-center text-primary', className)}
			aria-label='Choose a slide'
		>
			{Array.from({ length: count }, (_, index) => (
				<Button
					key={index}
					variant='plain'
					size='icon'
					aria-label={`Go to slide ${index + 1}`}
					aria-current={index === activeIndex ? 'true' : undefined}
					aria-controls={trackId}
					onClick={() => onGoToSlide(index)}
					className='size-8 rounded-full'
				>
					<span
						className={cn(
							'h-1.5 shrink-0 rounded-full bg-current transition-[width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
							index === activeIndex ? 'w-6 opacity-100' : 'w-1.5 opacity-40'
						)}
					/>
				</Button>
			))}
		</div>
	)
}
