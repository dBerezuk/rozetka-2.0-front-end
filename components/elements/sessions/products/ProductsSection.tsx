'use client'

import { useId } from 'react'

import { ProductCard } from '@/components/elements/product-card/ProductCard'
import { ProductCardLoading } from '@/components/elements/product-card/ProductCardLoading'
import { ProductsSectionHeading } from '@/components/elements/sessions/products/ProductsSectionHeading'
import { Slider } from '@/components/elements/slider/Slider'
import type { IProduct } from '@/types/product.types'

interface IProductsSectionProps {
	id?: string
	title: string
	products?: IProduct[]
	url?: string
	linkLabel?: string
	isLoading?: boolean
	emptyMessage?: string
}

export function ProductsSection({
	id,
	title,
	products = [],
	url,
	linkLabel,
	isLoading = false,
	emptyMessage = 'No products available yet.'
}: IProductsSectionProps) {
	const titleId = useId()

	return (
		<section
			id={id}
			aria-labelledby={titleId}
			aria-busy={isLoading}
			className='min-w-0 scroll-mt-6'
		>
			<div className='mb-4 flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1 pr-20'>
				<ProductsSectionHeading
					title={title}
					titleId={titleId}
					url={url}
					linkLabel={linkLabel}
				/>
			</div>
			{isLoading ? (
				<div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4'>
					{Array.from({ length: 4 }, (_, index) => (
						<ProductCardLoading key={index} />
					))}
				</div>
			) : products.length ? (
				<Slider
					label={title}
					arrowsClassName='-top-11 right-0 bottom-auto'
					slideClassName='basis-[calc((100%_-_0.75rem)/2)] md:basis-[calc((100%_-_1.5rem)/3)] xl:basis-[calc((100%_-_2.25rem)/4)]'
				>
					{products.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</Slider>
			) : (
				<p className='rounded-xl bg-white px-6 py-10 text-center text-sm text-gray-500'>
					{emptyMessage}
				</p>
			)}
		</section>
	)
}
