import type { KeyboardEvent } from 'react'

interface IUseKeyboardOptions<TElement extends HTMLElement> {
	handlers: Partial<Record<string, (event: KeyboardEvent<TElement>) => void>>
	isEnabled?: boolean
	isInputAllowed?: boolean
}

export function useKeyboard<TElement extends HTMLElement = HTMLElement>({
	handlers,
	isEnabled = true,
	isInputAllowed = false
}: IUseKeyboardOptions<TElement>) {
	const onKeyDown = (event: KeyboardEvent<TElement>) => {
		if (!isEnabled || event.defaultPrevented || event.nativeEvent.isComposing) {
			return
		}

		const target = event.target
		const isInput =
			target instanceof HTMLElement &&
			(target.isContentEditable || !!target.closest('input, textarea, select'))

		if (isInput && !isInputAllowed) {
			return
		}

		handlers[event.key]?.(event)
	}

	return { onKeyDown }
}
