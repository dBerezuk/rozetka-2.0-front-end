import { Skeleton } from '@/components/ui/Skeleton'

export function CartLoading() {
	return (
		<div role='status' aria-label='Loading cart' className='space-y-5'>
			{[1, 2].map(row => (
				<div key={row} className='flex gap-4'>
					<Skeleton className='size-20 shrink-0' />
					<div className='flex-1 space-y-3'>
						<Skeleton className='h-5 w-3/4' />
						<Skeleton className='h-4 w-1/2' />
						<Skeleton className='h-9 w-28' />
					</div>
				</div>
			))}
		</div>
	)
}
