'use client'

import { useId } from 'react'
import type { ComponentProps, ReactNode } from 'react'

import { FieldSkeleton } from '@/components/ui/field/FieldSkeleton'
import { cn } from '@/utils/cn.util'

const FIELD_VARIANTS = {
	outline:
		'border border-gray-200 bg-white text-gray-950 enabled:hover:border-gray-400',
	filled:
		'border border-transparent bg-gray-100 text-gray-950 enabled:hover:bg-gray-200',
	plain: 'h-auto rounded-none border-0 bg-transparent p-0 text-inherit'
}

type TFieldProps = ComponentProps<'input'> & {
	label: string
	isLabelHidden?: boolean
	isLoading?: boolean
	variant?: keyof typeof FIELD_VARIANTS
	wrapperClassName?: string
	error?: string
	endAdornment?: ReactNode
}

export function Field({
	label,
	isLabelHidden = false,
	isLoading = false,
	variant = 'outline',
	id,
	className,
	wrapperClassName,
	error,
	endAdornment,
	'aria-describedby': describedBy,
	...props
}: TFieldProps) {
	const generatedId = useId()

	const inputId = id ?? generatedId
	const errorId = `${inputId}-error`

	return isLoading ? (
		<FieldSkeleton className={wrapperClassName} isLabelHidden={isLabelHidden} />
	) : (
		<div className={cn('flex min-w-0 flex-col gap-2', wrapperClassName)}>
			<label
				htmlFor={inputId}
				className={cn('text-sm font-medium', isLabelHidden ? 'sr-only' : '')}
			>
				{label}
			</label>
			<div className='relative'>
				<input
					{...props}
					id={inputId}
					aria-invalid={error ? true : props['aria-invalid']}
					aria-describedby={
						[describedBy, error ? errorId : undefined]
							.filter(Boolean)
							.join(' ') || undefined
					}
					className={cn(
						'block h-11 w-full min-w-0 rounded-xl px-3 text-sm outline-none transition-colors duration-200 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none',
						FIELD_VARIANTS[variant],
						error &&
							'border-red-600 enabled:hover:border-red-600 focus-visible:ring-red-600',
						className
					)}
				/>
				{endAdornment}
			</div>
			{error && (
				<p id={errorId} role='alert' className='text-sm text-red-600'>
					{error}
				</p>
			)}
		</div>
	)
}
