import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { FavoriteButton } from '@/components/elements/favorite-button/FavoriteButton'
import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import type { TFavoriteProduct } from '@/types/product.types'
import { formatPrice } from '@/utils/format-price.util'

interface IFavoriteProductCardProps {
	product: TFavoriteProduct
}

export function FavoriteProductCard({ product }: IFavoriteProductCardProps) {
	const image = product.images[0]
	const productUrl = pagesConfig.getProduct(product.slug)
	const price = product.variants[0]?.price

	return (
		<article className='flex gap-3 rounded-xl bg-white p-3 sm:items-center sm:gap-4 sm:p-4'>
			<Link
				href={productUrl}
				aria-label={`View ${product.title}`}
				className='flex size-16 shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-20'
			>
				{image ? (
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.products,
							image.fileName
						)}
						alt={image.alt ?? product.title}
						width={80}
						height={80}
						sizes='(max-width: 639px) 64px, 80px'
						className='size-full object-contain'
						unoptimized
					/>
				) : (
					<ImageOff
						size={32}
						className='text-gray-500'
						aria-label='No product image'
					/>
				)}
			</Link>
			<div className='flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4'>
				<div className='min-w-0 flex-1'>
					<h2 className='line-clamp-2 text-sm font-medium text-gray-950 sm:text-base'>
						<Link
							href={productUrl}
							className='rounded-sm transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none'
						>
							{product.title}
						</Link>
					</h2>
					<p className='mt-1 line-clamp-1 text-sm text-gray-500'>
						{product.description}
					</p>
				</div>
				<div className='flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end'>
					<p className='font-semibold text-gray-950 sm:text-lg'>
						{price !== undefined
							? formatPrice(Number(price))
							: 'Price unavailable'}
					</p>
					<FavoriteButton product={product} isRemoveButton />
				</div>
			</div>
		</article>
	)
}
