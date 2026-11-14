import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import type { IProduct } from '@/types/product.types'

interface IStoreProductTitleProps {
	product: Pick<IProduct, 'title' | 'slug' | 'images'>
}

export function StoreProductTitle({ product }: IStoreProductTitleProps) {
	const image = product.images[0]

	return (
		<div className='flex min-w-48 items-center gap-3'>
			<div className='grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg text-gray-400'>
				{image ? (
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.products,
							image.fileName
						)}
						alt={image.alt ?? product.title}
						width={48}
						height={48}
						sizes='48px'
						unoptimized
						className='size-12 object-contain p-1 mix-blend-multiply'
					/>
				) : (
					<ImageOff size={20} aria-hidden='true' />
				)}
			</div>
			<Link
				href={pagesConfig.getProduct(product.slug)}
				className='line-clamp-2 max-w-xs rounded font-medium transition-colors duration-200 hover:text-green-600 hover:underline focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none'
			>
				{product.title}
			</Link>
		</div>
	)
}
