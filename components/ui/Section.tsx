import type { LucideIcon } from 'lucide-react'
import { useId } from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/utils/cn.util'

interface ISectionProps extends ComponentProps<'section'> {
	title: string
	description: string
	icon?: LucideIcon
	isInline?: boolean
}

export function Section({ title, description, icon: Icon, isInline = false, className, children, ...props }: ISectionProps) {
	const titleId = useId()

	return (
		<section
			{...props}
			aria-labelledby={titleId}
			className={cn('rounded-2xl border border-gray-200 bg-white p-5 sm:p-7', isInline && 'flex flex-wrap items-center justify-between gap-5', className)}
		>
			<div className={cn('flex items-start gap-3', isInline ? 'max-w-md' : 'mb-6')}>
				{Icon && (
					<div className='grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-green-600'>
						<Icon size={20} aria-hidden='true' />
					</div>
				)}
				<div>
					<h2 id={titleId} className='text-lg font-semibold'>
						{title}
					</h2>
					<p className={cn('text-sm text-gray-500', isInline ? 'mt-2 leading-6' : 'mt-1')}>{description}</p>
				</div>
			</div>
			{children}
		</section>
	)
}
