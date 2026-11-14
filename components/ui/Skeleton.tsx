import { cn } from '@/utils/cn.util'

const SKELETON_VARIANTS = {
	light: 'bg-gray-200',
	dark: 'bg-white/10'
}

interface ISkeletonProps {
	className?: string
	variant?: keyof typeof SKELETON_VARIANTS
}

export function Skeleton({ className, variant = 'light' }: ISkeletonProps) {
	return (
		<div
			aria-hidden='true'
			className={cn(
				'animate-pulse rounded-md motion-reduce:animate-none',
				SKELETON_VARIANTS[variant],
				className
			)}
		/>
	)
}
