'use client'

import { useEffect, useId, useRef } from 'react'

import { Button } from '@/components/ui/button/Button'
import { cn } from '@/utils/cn.util'

interface IConfirmDialogProps {
	isOpen: boolean
	title: string
	description: string
	confirmLabel?: string
	cancelLabel?: string
	pendingLabel?: string
	variant?: 'primary' | 'danger'
	isPending?: boolean
	onConfirm: () => void
	onClose: () => void
}

export function ConfirmDialog({
	isOpen,
	title,
	description,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	pendingLabel = 'Please wait...',
	variant = 'primary',
	isPending = false,
	onConfirm,
	onClose
}: IConfirmDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const cancelButtonRef = useRef<HTMLButtonElement>(null)
	const titleId = useId()
	const descriptionId = useId()

	useEffect(() => {
		if (!isOpen) {
			return
		}

		const dialog = dialogRef.current
		const previousOverflow = document.body.style.overflow

		dialog?.showModal()

		cancelButtonRef.current?.focus()

		document.body.style.overflow = 'hidden'

		return () => {
			dialog?.close()

			document.body.style.overflow = previousOverflow
		}
	}, [isOpen])

	return (
		<dialog
			ref={dialogRef}
			role='alertdialog'
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			aria-busy={isPending}
			className={cn(
				'm-auto w-[calc(100%_-_2rem)] max-w-md rounded-2xl border border-gray-200 bg-white p-0 text-gray-950 shadow-xl',
				'opacity-0 translate-y-2 scale-98 transition-[opacity,translate,scale,display,overlay] transition-discrete duration-250 ease-out open:opacity-100 open:translate-y-0 open:scale-100 starting:open:opacity-0 starting:open:translate-y-2 starting:open:scale-98 motion-reduce:transition-none',
				'backdrop:bg-gray-950/50 backdrop:backdrop-blur-sm backdrop:opacity-0 open:backdrop:opacity-100 starting:open:backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-250 backdrop:ease-out motion-reduce:backdrop:transition-none'
			)}
			onCancel={event => {
				event.preventDefault()

				if (!isPending) {
					onClose()
				}
			}}
			onClick={event => {
				if (event.target === event.currentTarget && !isPending) {
					onClose()
				}
			}}
		>
			<div className='space-y-6 p-6 sm:p-7'>
				<div className='space-y-3'>
					<h2 id={titleId} className='text-xl font-semibold tracking-tight'>
						{title}
					</h2>
					<p id={descriptionId} className='text-sm leading-6 text-gray-500'>
						{description}
					</p>
				</div>
				<div className='flex flex-wrap justify-end gap-3'>
					<Button
						ref={cancelButtonRef}
						variant='outline'
						disabled={isPending}
						onClick={onClose}
					>
						{cancelLabel}
					</Button>
					<Button variant={variant} disabled={isPending} onClick={onConfirm}>
						{isPending ? pendingLabel : confirmLabel}
					</Button>
				</div>
			</div>
		</dialog>
	)
}
