import { useEffect, useId, useRef } from 'react'

export function useModal(isOpen: boolean) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const titleId = useId()
	const descriptionId = useId()

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const dialog = dialogRef.current
		const previousOverflow = document.body.style.overflow

		dialog?.showModal()

		closeButtonRef.current?.focus()

		document.body.style.overflow = 'hidden'

		return () => {
			dialog?.close()

			document.body.style.overflow = previousOverflow
		}
	}, [isOpen])

	return { dialogRef, closeButtonRef, titleId, descriptionId }
}
