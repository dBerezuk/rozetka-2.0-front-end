import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/utils/cn.util'

interface IFieldSkeletonProps {
	className?: string
	isLabelHidden?: boolean
}

export function FieldSkeleton({ className, isLabelHidden = false }: IFieldSkeletonProps) {
	return (
		<div aria-hidden='true' className={cn('flex min-w-0 flex-col gap-2', className)}>
			{!isLabelHidden && <Skeleton className='h-5 w-24' />}
			<Skeleton className='h-11 w-full rounded-xl' />
		</div>
	)
}
