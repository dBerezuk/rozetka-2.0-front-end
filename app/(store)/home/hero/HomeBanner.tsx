import Image from 'next/image'
import Link from 'next/link'

import { pagesConfig } from '@/config/pages.config'
import type { ICategory } from '@/types/category.types'

interface IHomeBannerProps {
	category?: ICategory
	index: number
}

const CATEGORY_BACKGROUNDS: Record<string, string> = {
	'game-consoles': '/banners/gaming-large.webp',
	smartphones: '/banners/smartphones-corrected.webp'
}

export function HomeBanner({ category, index }: IHomeBannerProps) {
	const background = category
		? (CATEGORY_BACKGROUNDS[category.slug] ?? '/banners/discover-large.webp')
		: '/banners/discover-large.webp'

	return (
		<Link
			href={
				category
					? pagesConfig.getCategoryProducts(category.slug)
					: '#new-arrivals'
			}
			className='relative isolate flex h-full min-h-48 items-center overflow-hidden rounded-lg bg-gray-950 px-6 pt-8 pb-12 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-56 sm:px-16 sm:py-10'
		>
			<Image
				src={background}
				alt=''
				width={2172}
				height={448}
				loading={index === 0 ? 'eager' : 'lazy'}
				sizes='(min-width: 1440px) 1096px, (min-width: 1024px) calc(100vw - 344px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)'
				className='pointer-events-none absolute inset-0 -z-20 size-full object-cover object-right'
				unoptimized
			/>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-gray-950/80 via-gray-950/50 to-transparent sm:from-gray-950/60 sm:via-gray-950/15'
			/>
			<div className='max-w-sm space-y-3'>
				<p className='text-xs font-medium uppercase tracking-widest text-white/65'>
					{category ? 'Explore the collection' : 'Something new. Every day.'}
				</p>
				<h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
					{category ? `Discover ${category.title}` : 'Find your next favorite'}
				</h2>
				<p className='max-w-xs text-sm leading-6 text-white/80'>
					{category
						? 'A fresh perspective on your everyday essentials.'
						: 'Fresh finds. Great possibilities. Make them yours.'}
				</p>
			</div>
		</Link>
	)
}
