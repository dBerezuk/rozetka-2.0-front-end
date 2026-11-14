'use client'

import { Children, isValidElement, useId } from 'react'

import { useSlider } from '@/components/elements/slider/hooks/useSlider'
import { useSliderDrag } from '@/components/elements/slider/hooks/useSliderDrag'
import type { ISliderProps } from '@/components/elements/slider/slider.types'
import { SliderArrows } from '@/components/elements/slider/SliderArrows'
import { SliderDots } from '@/components/elements/slider/SliderDots'
import { SliderSlide } from '@/components/elements/slider/SliderSlide'
import { cn } from '@/utils/cn.util'

export function Slider({
	children,
	label,
	className,
	trackClassName,
	slideClassName,
	dotsClassName,
	arrowsClassName,
	arrowsVariant = 'grouped',
	isArrowsVisible = true,
	isDotsVisible = false
}: ISliderProps) {
	const slides = Children.toArray(children)
	const trackId = useId()
	const {
		trackRef,
		activeIndex,
		isPreviousAvailable,
		isNextAvailable,
		onGoToSlide,
		onPreviousSlide,
		onNextSlide,
		onKeyDown
	} = useSlider(slides.length)
	const dragHandlers = useSliderDrag(activeIndex, onGoToSlide)

	return (
		<div
			role='group'
			aria-label={label}
			aria-roledescription='carousel'
			className={cn('relative min-w-0', className)}
		>
			<div
				{...dragHandlers}
				id={trackId}
				ref={trackRef}
				tabIndex={0}
				onKeyDown={onKeyDown}
				aria-label={`${label} slides`}
				className={cn(
					'relative flex touch-pan-y cursor-grab select-none snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth rounded-2xl active:cursor-grabbing motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-primary',
					trackClassName
				)}
			>
				{slides.map((slide, index) => (
					<SliderSlide
						key={isValidElement(slide) ? slide.key : index}
						index={index}
						count={slides.length}
						className={slideClassName}
					>
						{slide}
					</SliderSlide>
				))}
			</div>
			{isArrowsVisible && (
				<SliderArrows
					variant={arrowsVariant}
					className={arrowsClassName}
					trackId={trackId}
					isPreviousAvailable={isPreviousAvailable}
					isNextAvailable={isNextAvailable}
					onPreviousSlide={onPreviousSlide}
					onNextSlide={onNextSlide}
				/>
			)}
			{isDotsVisible && slides.length > 1 && (
				<SliderDots
					className={dotsClassName}
					count={slides.length}
					activeIndex={activeIndex}
					trackId={trackId}
					onGoToSlide={onGoToSlide}
				/>
			)}
		</div>
	)
}
