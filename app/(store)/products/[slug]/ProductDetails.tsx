'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ProductCartButton } from '@/app/(store)/products/[slug]/ProductCartButton'
import { ProductDescription } from '@/app/(store)/products/[slug]/ProductDescription'
import { ProductGallery } from '@/app/(store)/products/[slug]/ProductGallery'
import { ProductRatings } from '@/app/(store)/products/[slug]/ProductRatings'
import { ProductSpecifications } from '@/app/(store)/products/[slug]/ProductSpecifications'
import { ProductVariantSelect } from '@/app/(store)/products/[slug]/ProductVariantSelect'
import { FavoriteButton } from '@/components/elements/favorite-button/FavoriteButton'
import { pagesConfig } from '@/config/pages.config'
import type { IProductDetails } from '@/types/product.types'
import { formatPrice } from '@/utils/format-price.util'

interface IProductDetailsProps {
	product: IProductDetails
}

export function ProductDetails({ product }: IProductDetailsProps) {
	const [selectedVariantId, setSelectedVariantId] = useState<string>()
	const variant =
		product.variants.find(variant => variant.id === selectedVariantId) ??
		product.variants[0]
	const images = product.images.filter(
		({ optionValueId }) =>
			!optionValueId ||
			variant?.optionValues.some(value => value.optionValueId === optionValueId)
	)

	return (
		<section className='grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-6'>
			<div className='contents lg:block lg:min-w-0 lg:space-y-4'>
				<ProductGallery
					key={variant?.id ?? 'default'}
					images={images}
					title={product.title}
				/>
				<div className='order-1 min-w-0'>
					<ProductRatings product={product} />
				</div>
			</div>
			<div className='contents lg:block lg:min-w-0 lg:space-y-4'>
				<header className='space-y-4 rounded-xl bg-white p-5 sm:p-6'>
					<div className='flex items-start justify-between gap-3'>
						<h1
							id='product-title'
							className='min-w-0 text-2xl font-semibold tracking-tight break-words sm:text-3xl'
						>
							{product.title}
						</h1>
						<FavoriteButton product={product} />
					</div>
					<div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs break-words text-gray-500'>
						<Link
							href={pagesConfig.getCategoryProducts(product.category.slug)}
							className='text-sm text-gray-600 hover:text-primary'
						>
							{product.category.title}
						</Link>
						{variant && <span className='min-w-0'>SKU: {variant.sku}</span>}
					</div>
				</header>
				<div className='space-y-5 rounded-xl bg-white p-5 sm:p-6'>
					<p className='text-3xl font-semibold' aria-live='polite'>
						{variant ? formatPrice(Number(variant.price)) : 'Price unavailable'}
					</p>
					{product.variants.length > 1 && (
						<ProductVariantSelect
							variants={product.variants}
							variantId={variant?.id}
							onChangeVariant={setSelectedVariantId}
						/>
					)}
					<ProductCartButton product={product} variantId={variant?.id} />
					{!variant && (
						<p className='text-sm text-gray-500'>
							This product is currently unavailable.
						</p>
					)}
					<p className='border-t border-gray-100 pt-4 text-sm text-gray-500'>
						Sold by{' '}
						<Link
							href={pagesConfig.getStore(product.store.slug)}
							className='font-semibold text-gray-950 hover:text-primary focus-visible:text-primary'
						>
							{product.store.title}
						</Link>
					</p>
				</div>
				<ProductDescription description={product.description} />
				<div className='order-2 min-w-0'>
					<ProductSpecifications characteristics={product.characteristics} />
				</div>
			</div>
		</section>
	)
}
