import { ArrowUpRight, Package, Store } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'

export function ProfileStoreBanner() {
	return (
		<section
			aria-labelledby='start-selling-title'
			className='relative isolate overflow-hidden rounded-2xl bg-linear-to-br from-secondary via-gray-800 to-green-600 px-5 py-5 text-white sm:px-7'
		>
			<div
				aria-hidden='true'
				className='absolute -right-12 -top-20 -z-10 size-72 rounded-full border border-white/10 bg-white/5'
			/>
			<div className='flex items-center justify-between gap-6'>
				<div className='max-w-lg space-y-3'>
					<div className='flex items-center gap-2 text-xs font-medium text-white/80'>
						<Store size={16} aria-hidden='true' />
						Start selling on Rozetka
					</div>
					<h2
						id='start-selling-title'
						className='text-xl font-semibold tracking-tight sm:text-2xl'
					>
						Your products. Your own store.
					</h2>
					<p className='text-sm leading-5 text-white/80'>
						Bring your products to Rozetka. Create a store and make it your own.
					</p>
					<Button
						url={pagesConfig.createStore}
						size='small'
						className='focus-visible:outline-white'
					>
						Create a store
						<ArrowUpRight size={18} aria-hidden='true' />
					</Button>
				</div>
				<div
					aria-hidden='true'
					className='group/banner-art relative mr-3 hidden shrink-0 sm:block'
				>
					<div className='transition-transform duration-300 ease-out motion-safe:group-hover/banner-art:-translate-y-2 motion-safe:group-hover/banner-art:rotate-3 motion-safe:group-hover/banner-art:scale-105 motion-reduce:transition-none'>
						<div className='grid size-24 rotate-6 place-items-center rounded-2xl border border-white/20 bg-white/10 shadow-xl motion-safe:animate-store-float'>
							<Store size={44} strokeWidth={1.3} />
						</div>
					</div>
					<div className='absolute -bottom-3 -left-6 transition-transform duration-300 ease-out motion-safe:group-hover/banner-art:-translate-x-2 motion-safe:group-hover/banner-art:translate-y-1 motion-safe:group-hover/banner-art:-rotate-6 motion-reduce:transition-none'>
						<div className='grid size-12 -rotate-12 place-items-center rounded-xl bg-primary text-white shadow-lg motion-safe:animate-store-float [animation-delay:-3s]'>
							<Package size={24} strokeWidth={1.5} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
