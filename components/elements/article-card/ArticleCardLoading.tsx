import { Skeleton } from '@/components/ui/Skeleton'

export function ArticleCardLoading() {
	return (
		<div aria-hidden='true' className='relative overflow-hidden rounded-xl'>
			<Skeleton className='aspect-[16/10] min-h-72 w-full' />
			<div className='absolute inset-x-5 bottom-5 space-y-3 sm:inset-x-7 sm:bottom-7'>
				<Skeleton className='h-3 w-1/3 bg-gray-50' />
				<Skeleton className='h-5 w-full bg-gray-50' />
				<Skeleton className='h-5 w-2/3 bg-gray-50' />
			</div>
		</div>
	)
}
