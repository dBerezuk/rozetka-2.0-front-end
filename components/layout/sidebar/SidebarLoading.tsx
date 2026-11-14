import { Skeleton } from '@/components/ui/Skeleton'

export function SidebarLoading() {
	return (
		<div role='status'>
			<span className='sr-only'>Loading navigation...</span>
			<ul aria-hidden='true' className='max-lg:flex'>
				{[1, 2, 3].map(item => (
					<li
						key={item}
						className='flex min-h-11 items-center gap-3 px-3 py-2 max-lg:w-32'
					>
						<Skeleton variant='dark' className='size-6 shrink-0' />
						<Skeleton variant='dark' className='h-4 flex-1' />
					</li>
				))}
			</ul>
		</div>
	)
}
