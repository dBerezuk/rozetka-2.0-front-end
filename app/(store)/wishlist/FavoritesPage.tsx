'use client'

import { Heart } from 'lucide-react'

import { FavoriteProductCard } from '@/app/(store)/wishlist/FavoriteProductCard'
import { FavoriteProductCardLoading } from '@/app/(store)/wishlist/FavoriteProductCardLoading'
import { PageContent } from '@/components/layout/PageContent'
import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import { useProfile } from '@/hooks/useProfile'

export function FavoritesPage() {
	const { data: profile, isPending } = useProfile()
	const favorites = profile?.favorites ?? []

	return (
		<div className='mx-auto w-full max-w-5xl p-4 sm:p-6 lg:p-8'>
			<PageContent
				title='Favorites'
				description='All your saved products in one place.'
			>
				{isPending ? (
					<div role='status' aria-busy='true' className='space-y-3'>
						<span className='sr-only'>Loading favorites</span>
						{Array.from({ length: 3 }, (_, index) => (
							<FavoriteProductCardLoading key={index} />
						))}
					</div>
				) : !profile ? (
					<div className='space-y-4 rounded-xl bg-white p-8 text-center'>
						<p>Sign in to save your favorite products.</p>
						<Button url={pagesConfig.login}>Sign in</Button>
					</div>
				) : favorites.length ? (
					<ul className='space-y-3'>
						{favorites.map(product => (
							<li key={product.id}>
								<FavoriteProductCard product={product} />
							</li>
						))}
					</ul>
				) : (
					<div
						role='status'
						className='flex flex-col items-center gap-4 rounded-xl bg-white px-6 py-16 text-center'
					>
						<Heart size={36} className='text-gray-500' aria-hidden='true' />
						<h2 className='text-lg font-medium'>No favorites yet</h2>
						<p className='text-sm text-gray-500'>
							Tap the heart on a product to save it here.
						</p>
						<Button url={pagesConfig.home}>Browse products</Button>
					</div>
				)}
			</PageContent>
		</div>
	)
}
