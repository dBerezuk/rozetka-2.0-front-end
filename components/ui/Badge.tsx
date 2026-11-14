import type { ComponentProps } from 'react'

import { cn } from '@/utils/cn.util'

const BADGE_VARIANTS = {
	neutral: 'bg-gray-100 text-gray-700',
	success: 'bg-primary/10 text-green-600'
}

type TBadgeProps = ComponentProps<'span'> & {
	variant?: keyof typeof BADGE_VARIANTS
}

export function Badge({ variant = 'neutral', className, ...props }: TBadgeProps) {
	return (
		<span
			{...props}
			className={cn(
				'inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium leading-4',
				BADGE_VARIANTS[variant],
				className
			)}
		/>
	)
}
