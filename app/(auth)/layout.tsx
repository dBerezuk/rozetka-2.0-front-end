import { UserRound } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode, Suspense } from 'react'

import { pagesConfig } from '@/config/pages.config'

export const metadata: Metadata = {
	robots: { index: false, follow: false }
}

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className='grid min-h-dvh place-items-center bg-gray-100 p-3 sm:p-4'>
			<div className='grid w-full max-w-6xl rounded-3xl bg-white p-3 shadow-sm lg:min-h-[clamp(560px,calc(100dvh-2rem),600px)] lg:grid-cols-2'>
				<div className='flex min-w-0 flex-col px-3 sm:px-6'>
					<Link
						href={pagesConfig.home}
						className='mt-2 self-start rounded-lg bg-secondary px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
					>
						<Image
							src='/logo.svg'
							alt='Rozetka 2.0 home'
							width={152}
							height={22}
						/>
					</Link>
					<div className='mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-4'>
					<Suspense fallback={<div className='min-h-[456px]' />}>
						{children}
					</Suspense>
					</div>
				</div>
				<aside className='relative hidden overflow-hidden rounded-2xl bg-secondary lg:flex lg:flex-col lg:justify-between lg:p-8'>
					<Image
						src='/auth-landscape.png'
						alt=''
						width={1122}
						height={1402}
						sizes='(min-width: 1152px) 560px, 50vw'
						loading='eager'
						className='absolute inset-0 size-full object-cover'
					/>
					<div className='absolute inset-0 bg-linear-to-t from-gray-950/85 via-transparent to-transparent' />
					<div className='relative self-start rounded-xl bg-white/85 p-4 text-gray-950 backdrop-blur-sm'>
						<UserRound
							aria-hidden='true'
							size={20}
							className='mb-2 text-green-600'
						/>
						<p className='text-sm font-semibold'>Your Rozetka account</p>
						<p className='mt-1 text-xs text-gray-700'>
							Orders and favorites in one place.
						</p>
					</div>
					<div className='relative max-w-xs text-white'>
						<p className='text-2xl font-semibold'>Make it yours.</p>
						<p className='mt-2 text-sm leading-6'>
							Discover products from different sellers and keep your favorites
							close.
						</p>
					</div>
				</aside>
			</div>
		</main>
	)
}
