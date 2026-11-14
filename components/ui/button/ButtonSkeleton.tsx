import { cn } from '@/utils/cn.util'

interface IButtonSkeletonProps {
	className?: string
}

export function ButtonSkeleton({ className }: IButtonSkeletonProps) {
	return (
		<span
			role='status'
			aria-label='Loading'
			aria-busy='true'
			className={cn('inline-block shrink-0 animate-pulse bg-gray-200 motion-reduce:animate-none', className)}
		/>
	)
}
