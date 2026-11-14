import { useRef } from 'react'
import type { DragEvent, MouseEvent, PointerEvent } from 'react'

export function useSliderDrag(
	activeIndex: number,
	onGoToSlide: (index: number) => void
) {
	const dragRef = useRef({
		startX: 0,
		scrollLeft: 0,
		slideIndex: 0,
		isPressed: false,
		isDragging: false
	})

	const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (
			event.button !== 0 ||
			(event.target as HTMLElement).closest('button, input, textarea, select')
		)
			return

		dragRef.current = {
			startX: event.clientX,
			scrollLeft: event.currentTarget.scrollLeft,
			slideIndex: activeIndex,
			isPressed: true,
			isDragging: false
		}
	}

	const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current
		const distance = event.clientX - drag.startX

		if (!drag.isPressed || Math.abs(distance) < 6) return

		if (!drag.isDragging) {
			drag.isDragging = true

			event.currentTarget.setPointerCapture(event.pointerId)
			event.currentTarget.style.scrollSnapType = 'none'
			event.currentTarget.style.scrollBehavior = 'auto'
		}

		event.preventDefault()

		event.currentTarget.scrollLeft = drag.scrollLeft - distance
	}

	const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current
		drag.isPressed = false

		if (!drag.isDragging) return

		const distance = drag.startX - event.clientX
		const direction = Math.abs(distance) >= 24 ? Math.sign(distance) : 0

		event.currentTarget.style.removeProperty('scroll-snap-type')
		event.currentTarget.style.removeProperty('scroll-behavior')

		onGoToSlide(drag.slideIndex + direction)
	}

	return {
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel: (event: PointerEvent<HTMLDivElement>) => {
			dragRef.current.isPressed = false

			event.currentTarget.style.removeProperty('scroll-snap-type')
			event.currentTarget.style.removeProperty('scroll-behavior')
		},
		onPointerLeave: () => {
			if (!dragRef.current.isDragging) dragRef.current.isPressed = false
		},
		onDragStart: (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
		onClickCapture: (event: MouseEvent<HTMLDivElement>) => {
			if (!dragRef.current.isDragging) return

			event.preventDefault()
			event.stopPropagation()

			dragRef.current.isDragging = false
		}
	}
}
