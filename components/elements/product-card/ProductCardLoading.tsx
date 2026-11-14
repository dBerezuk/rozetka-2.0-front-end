import { Skeleton } from '@/components/ui/Skeleton'

export function ProductCardLoading() {
	return (
		<div
			aria-hidden='true'
			className='flex h-full flex-col gap-2 rounded-lg bg-white p-3'
		>
			<Skeleton className='aspect-square rounded-lg' />
			<Skeleton className='h-5 w-3/4' />
			<Skeleton className='h-3 w-16 max-w-full' />
			<div className='mt-auto flex items-center justify-between gap-2'>
				<Skeleton className='h-5 w-20' />
				<Skeleton className='size-9 shrink-0 rounded-lg' />
			</div>
		</div>
	)
}
