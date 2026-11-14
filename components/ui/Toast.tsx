'use client'

import { CircleCheck, CircleX } from 'lucide-react'
import { Toaster } from 'sonner'

export function Toast() {
	return (
		<Toaster
			position='top-right'
			closeButton
			icons={{
				success: <CircleCheck size={20} className='text-green-600' />,
				error: <CircleX size={20} className='text-red-600' />
			}}
			toastOptions={{
				unstyled: true,
				classNames: {
					toast:
						'flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 font-sans text-sm text-gray-950 shadow-lg',
					title: 'font-medium',
					description: 'mt-1 text-gray-500',
					content: 'min-w-0 flex-1 break-words',
					icon: 'shrink-0',
					closeButton:
						'absolute -right-2 -top-2 grid size-5 cursor-pointer place-items-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary',
					error: 'border-l-4 border-l-red-600',
					success: 'border-l-4 border-l-primary'
				}
			}}
		/>
	)
}
