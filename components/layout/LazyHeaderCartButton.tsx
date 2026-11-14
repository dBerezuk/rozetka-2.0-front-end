'use client'

import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/Skeleton'

export const LazyHeaderCartButton = dynamic(
	() =>
		import('@/components/layout/HeaderCartButton').then(
			module => module.HeaderCartButton
		),
	{
		ssr: false,
		loading: () => (
			<Skeleton
				variant='dark'
				className='h-11 w-12 rounded-xl sm:w-14 xl:w-[138.16px]'
			/>
		)
	}
)
