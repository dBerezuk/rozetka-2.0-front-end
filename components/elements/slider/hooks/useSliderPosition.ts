import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export function useSliderPosition(
	trackRef: RefObject<HTMLDivElement | null>,
	slideCount: number
) {
	const [position, setPosition] = useState({
		activeIndex: 0,
		isPreviousAvailable: false,
		isNextAvailable: false
	})

	useEffect(() => {
		const track = trackRef.current

		if (!track) return

		const onUpdatePosition = () => {
			const slides = Array.from(track.children) as HTMLElement[]
			const start = slides[0]?.offsetLeft ?? 0
			const maximum = track.scrollWidth - track.clientWidth
			const scrollLeft = Math.max(0, Math.min(track.scrollLeft, maximum))
			const nextIndex = slides.findIndex(
				slide => slide.offsetLeft - start > scrollLeft + 1
			)
			const previousIndex =
				nextIndex > 0 ? nextIndex - 1 : Math.max(0, slides.length - 1)
			const previousOffset =
				(slides[previousIndex]?.offsetLeft ?? start) - start
			const nextOffset =
				nextIndex > 0 ? slides[nextIndex].offsetLeft - start : previousOffset
			const fraction =
				nextOffset > previousOffset
					? (scrollLeft - previousOffset) / (nextOffset - previousOffset)
					: 0
			const progress = Math.max(0, previousIndex + fraction)

			const nextPosition = {
				activeIndex: Math.round(progress),
				isPreviousAvailable: scrollLeft > 1,
				isNextAvailable: scrollLeft < maximum - 1
			}

			setPosition(previous => {
				const isUnchanged =
					previous.activeIndex === nextPosition.activeIndex &&
					previous.isPreviousAvailable === nextPosition.isPreviousAvailable &&
					previous.isNextAvailable === nextPosition.isNextAvailable

				return isUnchanged ? previous : nextPosition
			})
		}

		const observer = new ResizeObserver(onUpdatePosition)
		observer.observe(track)
		Array.from(track.children).forEach(slide => observer.observe(slide))

		track.addEventListener('scroll', onUpdatePosition, { passive: true })

		return () => {
			observer.disconnect()
			track.removeEventListener('scroll', onUpdatePosition)
		}
	}, [trackRef, slideCount])

	return position
}
