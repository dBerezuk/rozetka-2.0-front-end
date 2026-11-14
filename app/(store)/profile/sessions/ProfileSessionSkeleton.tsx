import { Button } from '@/components/ui/button/Button'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProfileSessionSkeleton() {
	return (
		<div aria-hidden='true' className='flex flex-wrap items-start gap-3 py-5 first:pt-0 last:pb-0'>
			<Skeleton className='size-8 shrink-0 rounded-lg' />
			<div className='min-h-20 min-w-0 flex-1 space-y-1'>
				<div className='flex h-5 items-center gap-2'>
					<Skeleton className='h-4 min-w-0 max-w-36 flex-1' />
					<Skeleton className='h-5 w-20 shrink-0 rounded-full' />
				</div>
				<div className='flex h-4 items-center'>
					<Skeleton className='h-3 w-24 max-w-full' />
				</div>
				<div className='flex h-4 items-center'>
					<Skeleton className='h-3 w-28 max-w-full' />
				</div>
				<div className='flex h-4 items-center'>
					<Skeleton className='h-3 w-48 max-w-full' />
				</div>
			</div>
			<Button isLoading size='small' className='w-32' />
		</div>
	)
}
