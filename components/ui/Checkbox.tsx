'use client'

import { Check } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/utils/cn.util'

type TCheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
	label: ReactNode
	wrapperClassName?: string
}

export function Checkbox({
	label,
	className,
	wrapperClassName,
	...props
}: TCheckboxProps) {
	return (
		<label
			className={cn(
				'flex min-h-9 cursor-pointer items-center gap-3 text-sm has-disabled:cursor-not-allowed has-disabled:opacity-50',
				wrapperClassName
			)}
		>
			<span className='relative flex size-5 shrink-0'>
				<input
					{...props}
					type='checkbox'
					className={cn('peer sr-only', className)}
				/>
				<span className='size-5 rounded border border-gray-200 bg-white transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary' />
				<Check
					size={14}
					strokeWidth={2.5}
					aria-hidden='true'
					className='pointer-events-none absolute top-[3px] left-[3px] text-white opacity-0 peer-checked:opacity-100'
				/>
			</span>
			<span className='min-w-0 break-words'>{label}</span>
		</label>
	)
}
