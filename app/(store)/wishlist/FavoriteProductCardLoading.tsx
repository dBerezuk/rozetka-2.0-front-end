import { Skeleton } from '@/components/ui/Skeleton'

export function FavoriteProductCardLoading() {
	return (
		<div
			aria-hidden='true'
			className='flex gap-3 rounded-xl bg-white p-3 sm:items-center sm:gap-4 sm:p-4'
		>
			<Skeleton className='size-16 shrink-0 sm:size-20' />
			<div className='flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
				<div className='min-w-0 flex-1 space-y-2'>
					<Skeleton className='h-5 w-3/4 max-w-80' />
					<Skeleton className='h-4 w-full max-w-96' />
				</div>
				<div className='flex shrink-0 items-center gap-2 sm:flex-col sm:items-end'>
					<Skeleton className='h-6 w-20' />
					<Skeleton className='h-9 w-24 rounded-lg' />
				</div>
			</div>
		</div>
	)
}
