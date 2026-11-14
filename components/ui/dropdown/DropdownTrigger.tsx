import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/utils/cn.util'

const DROPDOWN_VARIANTS = {
	outline: 'border border-gray-200 bg-white',
	filled: 'border border-transparent bg-gray-100'
}

export type TDropdownTriggerProps = ComponentProps<'button'> & {
	label: string
	listId: string
	isOpen: boolean
	isField: boolean
	variant?: keyof typeof DROPDOWN_VARIANTS
	error?: string
}

export function DropdownTrigger({
	label,
	listId,
	isOpen,
	isField,
	variant = 'outline',
	error,
	className,
	children,
	...props
}: TDropdownTriggerProps) {
	return (
		<button
			{...props}
			id={listId + '-trigger'}
			aria-label={label + ': ' + children}
			aria-expanded={isOpen}
			aria-controls={listId}
			aria-invalid={!!error}
			aria-describedby={error ? listId + '-error' : undefined}
			type='button'
			className={cn(
				'flex min-h-10 min-w-40 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 text-gray-950 focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
				DROPDOWN_VARIANTS[variant],
				isField && 'h-11 w-full min-w-0 rounded-xl text-left',
				error && 'border-red-600',
				className
			)}
		>
			<span className='truncate'>{children}</span>
			<ChevronDown
				aria-hidden='true'
				size={16}
				className={cn(
					'shrink-0 motion-safe:transition-transform motion-safe:duration-200',
					isOpen && 'rotate-180'
				)}
			/>
		</button>
	)
}
