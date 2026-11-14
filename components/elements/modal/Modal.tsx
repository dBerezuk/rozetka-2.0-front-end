'use client'

import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useModal } from '@/components/elements/modal/useModal'
import { Button } from '@/components/ui/button/Button'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { cn } from '@/utils/cn.util'

interface IModalProps {
	isOpen: boolean
	title: string
	description?: string
	children: ReactNode
	footer?: ReactNode
	isBusy?: boolean
	size?: 'medium' | 'large'
	onClose: () => void
}

export function Modal({
	isOpen,
	title,
	description,
	children,
	footer,
	isBusy = false,
	size = 'medium',
	onClose
}: IModalProps) {
	const isHydrated = useIsHydrated()

	const { dialogRef, closeButtonRef, titleId, descriptionId } = useModal(
		isOpen && isHydrated
	)

	return (
		isHydrated &&
		createPortal(
			<dialog
				ref={dialogRef}
				aria-labelledby={titleId}
				aria-describedby={description ? descriptionId : undefined}
				aria-busy={isBusy}
				className={cn(
					'fixed inset-x-4 inset-y-0 m-auto w-auto rounded-2xl border border-gray-200 bg-white p-0 text-gray-950 shadow-xl',
					size === 'large' ? 'max-w-7xl' : 'max-w-2xl',
					'opacity-0 translate-y-2 scale-98 transition-[opacity,translate,scale,display,overlay] transition-discrete duration-200 ease-out open:opacity-100 open:translate-y-0 open:scale-100 starting:open:opacity-0 starting:open:translate-y-2 starting:open:scale-98 motion-reduce:transition-none',
					'backdrop:bg-gray-950/50 backdrop:backdrop-blur-sm backdrop:opacity-0 open:backdrop:opacity-100 starting:open:backdrop:opacity-0 backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-200 motion-reduce:backdrop:transition-none'
				)}
				onCancel={event => {
					event.preventDefault()

					if (!isBusy) {
						onClose()
					}
				}}
				onClick={event => {
					if (event.target === event.currentTarget && !isBusy) {
						onClose()
					}
				}}
			>
				<div className='flex max-h-[85dvh] flex-col'>
					<header className='flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4'>
						<div className='space-y-1'>
							<h2 id={titleId} className='text-lg font-semibold'>
								{title}
							</h2>
							{description && (
								<p id={descriptionId} className='text-xs text-gray-500'>
									{description}
								</p>
							)}
						</div>
						<Button
							ref={closeButtonRef}
							variant='ghost'
							size='icon'
							aria-label='Close dialog'
							disabled={isBusy}
							onClick={onClose}
						>
							<X size={20} aria-hidden='true' />
						</Button>
					</header>
					<div className='min-h-0 overflow-y-auto p-5 sm:p-6'>{children}</div>
					{footer && (
						<footer className='flex justify-end gap-3 border-t border-gray-200 px-5 py-4'>
							{footer}
						</footer>
					)}
				</div>
			</dialog>,
			document.body
		)
	)
}
