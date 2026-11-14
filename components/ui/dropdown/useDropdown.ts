import { useId, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react'

import { useKeyboard } from '@/hooks/useKeyboard'

export function useDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const listId = useId()

	const onToggleDropdown = (event: MouseEvent<HTMLButtonElement>) => {
		event.currentTarget.focus()

		setIsOpen(!isOpen)
	}

	const onCloseDropdown = () => {
		triggerRef.current?.focus()

		setIsOpen(false)
	}

	const onBlurDropdown = (event: FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsOpen(false)
		}
	}

	const onMoveDropdownFocus = (
		event: KeyboardEvent<HTMLDivElement>,
		direction: 1 | -1
	) => {
		event.preventDefault()

		setIsOpen(true)

		const buttons = Array.from(
			event.currentTarget.querySelectorAll<HTMLButtonElement>('li button')
		)

		if (!buttons.length) {
			return
		}

		const activeIndex = buttons.indexOf(
			document.activeElement as HTMLButtonElement
		)
		const nextIndex =
			activeIndex < 0
				? direction === 1
					? 0
					: buttons.length - 1
				: (activeIndex + direction + buttons.length) % buttons.length

		requestAnimationFrame(() => buttons[nextIndex]?.focus())
	}

	const { onKeyDown: onKeyDownDropdown } = useKeyboard<HTMLDivElement>({
		handlers: {
			Escape: event => {
				if (isOpen) {
					event.preventDefault()
					event.stopPropagation()

					onCloseDropdown()
				}
			},
			ArrowDown: event => onMoveDropdownFocus(event, 1),
			ArrowUp: event => onMoveDropdownFocus(event, -1)
		}
	})

	return {
		isOpen,
		onToggleDropdown,
		triggerRef,
		listId,
		onCloseDropdown,
		onBlurDropdown,
		onKeyDownDropdown
	}
}
