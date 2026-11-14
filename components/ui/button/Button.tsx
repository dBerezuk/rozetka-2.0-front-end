import Link from 'next/link'
import type { ComponentProps } from 'react'

import { ButtonSkeleton } from '@/components/ui/button/ButtonSkeleton'
import { cn } from '@/utils/cn.util'

const BUTTON_VARIANTS = {
	primary: 'bg-primary text-white hover:bg-green-600',
	danger: 'bg-red-500 text-white hover:bg-red-600',
	secondary: 'bg-gray-800 text-white hover:bg-gray-700',
	outline: 'border border-gray-200 text-gray-950 hover:bg-gray-100',
	ghost: 'text-inherit hover:bg-gray-400/10',
	plain: 'bg-transparent text-inherit',
	soft: 'bg-primary/10 text-primary hover:bg-primary/20'
}

const BUTTON_SIZES = {
	small: 'h-9 rounded-lg px-4',
	medium: 'h-11 rounded-xl px-4',
	large: 'h-12 rounded-xl px-6',
	icon: 'size-11 rounded-xl p-0'
}

interface IButtonStyleProps {
	isLoading?: boolean
	variant?: keyof typeof BUTTON_VARIANTS
	size?: keyof typeof BUTTON_SIZES
}

type TButtonProps = IButtonStyleProps &
	(
		| (ComponentProps<'button'> & { url?: never })
		| (Omit<ComponentProps<typeof Link>, 'href'> & {
				url: ComponentProps<typeof Link>['href']
		  })
	)

export function Button({ variant = 'primary', size = 'medium', isLoading = false, className, url, children, ...props }: TButtonProps) {
	const buttonClassName = cn(
		'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none',
		BUTTON_VARIANTS[variant],
		BUTTON_SIZES[size],
		className
	)

	return isLoading ? (
		<ButtonSkeleton className={cn(size !== 'icon' && 'w-32', BUTTON_SIZES[size], className)} />
	) : url ? (
		<Link href={url} {...(props as Omit<ComponentProps<typeof Link>, 'href'>)} className={buttonClassName}>
			{children}
		</Link>
	) : (
		<button type='button' {...(props as ComponentProps<'button'>)} className={buttonClassName}>
			{children}
		</button>
	)
}
