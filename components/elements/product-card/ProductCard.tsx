import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { CartButton } from '@/components/elements/cart-button/CartButton'
import { FavoriteButton } from '@/components/elements/favorite-button/FavoriteButton'
import { ProductRating } from '@/components/elements/ProductRating'
import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import type { IProduct } from '@/types/product.types'
import { formatPrice } from '@/utils/format-price.util'

interface IProductCardProps {
	product: IProduct
	isImageEager?: boolean
}

export function ProductCard({
	product,
	isImageEager = false
}: IProductCardProps) {
	const variant = product.variants[0]
	const image =
		product.images.find(
			image =>
				image.optionValueId &&
				variant?.optionValues.some(
					value => value.optionValueId === image.optionValueId
				)
		) ?? product.images.find(image => !image.optionValueId)
	const productUrl = pagesConfig.getProduct(product.slug)

	const formattedPrice = variant
		? formatPrice(Number(variant.price))
		: 'Price unavailable'

	return (
		<article className='group relative flex h-full min-w-0 flex-col gap-2 rounded-lg bg-white p-3'>
			<div className='relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white'>
				{image ? (
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.products,
							image.fileName
						)}
						alt={image.alt ?? product.title}
						width={320}
						height={320}
						loading={isImageEager ? 'eager' : 'lazy'}
						sizes='(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw'
						className='absolute inset-0 size-full object-contain p-2 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-105'
						unoptimized
					/>
				) : (
					<ImageOff
						size={40}
						className='text-gray-500'
						aria-label='No product image'
					/>
				)}
			</div>
			<h2 className='line-clamp-2 text-sm font-medium leading-5 text-gray-950 transition-colors duration-200 group-hover:text-green-600 motion-reduce:transition-none sm:text-base'>
				{product.title}
			</h2>
			<ProductRating />
			<FavoriteButton
				product={product}
				className='absolute top-2 right-2 z-10 size-9 rounded-full bg-white shadow-sm hover:bg-gray-100 hover:text-primary'
			/>
			<div className='mt-auto flex flex-wrap items-center justify-between gap-2'>
				<p className='text-base font-semibold text-gray-950 sm:text-lg'>
					{formattedPrice}
				</p>
				<CartButton
					product={product}
					variantId={variant?.id}
					isIconOnly
					className='relative z-10 size-9 rounded-lg'
				/>
			</div>
			<Link
				href={productUrl}
				aria-label={`View ${product.title}`}
				className='absolute inset-0 z-[1] cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
			/>
		</article>
	)
}
