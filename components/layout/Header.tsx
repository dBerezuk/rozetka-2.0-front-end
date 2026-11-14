import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { HeaderCatalogButton } from '@/components/layout/catalog/HeaderCatalogButton'
import { HeaderAccountButton } from '@/components/layout/HeaderAccountButton'
import { HeaderFavoritesButton } from '@/components/layout/HeaderFavoritesButton'
import { HeaderSearch } from '@/components/layout/HeaderSearch'
import { LazyHeaderCartButton } from '@/components/layout/LazyHeaderCartButton'

export function Header() {
	return (
		<header className='bg-secondary text-white'>
			<div className='container flex flex-wrap items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:flex-nowrap lg:justify-between lg:px-8'>
				<Link
					href='/'
					aria-label='Rozetka 2.0 home'
					className='mr-auto shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:mr-0'
				>
					<Image
						src='/logo.svg'
						alt='Rozetka 2.0'
						width={274}
						height={40}
						priority
						className='h-auto w-28 min-[390px]:w-[180px] sm:w-[210px] xl:w-[240px]'
					/>
				</Link>
				<div className='order-last flex w-full min-w-0 items-center gap-3 lg:order-none lg:max-w-[640px] lg:flex-1'>
					<HeaderCatalogButton />
					<div className='min-w-0 flex-1'>
						<Suspense fallback={<div className='h-11 rounded-xl bg-gray-700' />}>
							<HeaderSearch />
						</Suspense>
					</div>
				</div>
				<div className='flex shrink-0 items-center gap-2'>
					<HeaderAccountButton />
					<HeaderFavoritesButton />
					<LazyHeaderCartButton />
				</div>
			</div>
		</header>
	)
}
