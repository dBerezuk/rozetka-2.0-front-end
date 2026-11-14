import { type KeyboardEvent, useRef } from 'react'

import { useSliderPosition } from '@/components/elements/slider/hooks/useSliderPosition'
import { useKeyboard } from '@/hooks/useKeyboard'

export function useSlider(slideCount: number) {
	const trackRef = useRef<HTMLDivElement>(null)
	const position = useSliderPosition(trackRef, slideCount)

	const onGoToSlide = (index: number) => {
		const track = trackRef.current
		const targetIndex = Math.max(0, Math.min(slideCount - 1, index))
		const slide = track?.children[targetIndex] as HTMLElement | undefined
		const firstSlide = track?.children[0] as HTMLElement | undefined

		if (!track || !slide || !firstSlide) return

		track.scrollTo({
			left: slide.offsetLeft - firstSlide.offsetLeft,
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
				? 'instant'
				: 'smooth'
		})
	}

	const onPreviousSlide = () => onGoToSlide(position.activeIndex - 1)
	const onNextSlide = () => onGoToSlide(position.activeIndex + 1)

	const onMoveWithKeyboard = (
		event: KeyboardEvent<HTMLDivElement>,
		direction: number
	) => {
		if (event.target !== event.currentTarget) return

		event.preventDefault()

		onGoToSlide(position.activeIndex + direction)
	}

	const { onKeyDown } = useKeyboard<HTMLDivElement>({
		handlers: {
			ArrowLeft: event => onMoveWithKeyboard(event, -1),
			ArrowRight: event => onMoveWithKeyboard(event, 1)
		}
	})

	return {
		trackRef,
		...position,
		onGoToSlide,
		onPreviousSlide,
		onNextSlide,
		onKeyDown
	}
}
