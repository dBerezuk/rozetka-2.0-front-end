import { Skeleton } from '@/components/ui/Skeleton'

export function CatalogMenuLoading() {
	return (
		<div
			role='status'
			aria-label='Loading categories'
			className='grid h-full grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-hidden md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-1 md:gap-6'
		>
			<div className='min-h-0 max-h-[min(9rem,24dvh)] space-y-1 overflow-hidden rounded-lg bg-bg p-2 md:max-h-none'>
				{Array.from({ length: 8 }, (_, index) => (
					<Skeleton
						key={index}
						className='h-11 w-full nth-[n+3]:max-md:hidden'
					/>
				))}
			</div>
			<div className='grid min-h-0 content-start gap-6 overflow-hidden sm:grid-cols-2 xl:grid-cols-3'>
				{Array.from({ length: 6 }, (_, index) => (
					<div key={index} className='space-y-3 nth-[n+3]:max-md:hidden'>
						<Skeleton className='h-5 w-3/4' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-2/3' />
					</div>
				))}
			</div>
		</div>
	)
}
