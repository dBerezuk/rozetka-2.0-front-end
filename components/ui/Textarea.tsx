'use client'

import { useId } from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/utils/cn.util'

type TTextareaProps = ComponentProps<'textarea'> & {
	label: string
	error?: string
}

export function Textarea({
	label,
	error,
	id,
	className,
	'aria-describedby': describedBy,
	...props
}: TTextareaProps) {
	const generatedId = useId()

	const inputId = id ?? generatedId
	const errorId = `${inputId}-error`

	return (
		<div className='flex min-w-0 flex-col gap-2'>
			<label htmlFor={inputId} className='text-sm font-medium'>
				{label}
			</label>
			<textarea
				{...props}
				id={inputId}
				aria-invalid={error ? true : props['aria-invalid']}
				aria-describedby={
					[describedBy, error ? errorId : undefined]
						.filter(Boolean)
						.join(' ') || undefined
				}
				className={cn(
					'min-h-32 w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition-colors duration-200 placeholder:text-gray-500 enabled:hover:border-gray-400 focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none',
					error &&
						'border-red-600 enabled:hover:border-red-600 focus-visible:ring-red-600',
					className
				)}
			/>
			{error && (
				<p id={errorId} role='alert' className='text-sm text-red-600'>
					{error}
				</p>
			)}
		</div>
	)
}
