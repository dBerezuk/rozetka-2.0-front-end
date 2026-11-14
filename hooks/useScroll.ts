import { useEffect, useRef } from 'react'
import type { UIEvent } from 'react'

interface IUseScrollOptions {
	isEnabled?: boolean
	onReachBottom?: () => void
}

export function useScroll<TElement extends HTMLElement>({
	isEnabled = true,
	onReachBottom
}: IUseScrollOptions = {}) {
	const bottomRef = useRef<TElement>(null)

	useEffect(() => {
		const element = bottomRef.current

		if (!isEnabled || !onReachBottom || !element) {
			return
		}

		const observer = new IntersectionObserver(
			entries => {
				if (entries.some(entry => entry.isIntersecting)) {
					onReachBottom()
				}
			},
			{ rootMargin: '200px' }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [isEnabled, onReachBottom])

	const onScroll = (event: UIEvent<TElement>) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
		const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

		if (isEnabled && isAtBottom) {
			onReachBottom?.()
		}
	}

	return { onScroll, bottomRef }
}
