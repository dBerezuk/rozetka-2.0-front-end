import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import type { IOrderItem } from '@/types/order.types'

interface IOrderItemImageProps {
	item: IOrderItem
}

export function OrderItemImage({ item }: IOrderItemImageProps) {
	const image = item.product?.images[0]

	return (
		<div className='flex size-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2 sm:size-24'>
			{image && item.product ? (
				<Link
					href={pagesConfig.getProduct(item.product.slug)}
					aria-label={`View ${item.title}`}
					className='size-full rounded-lg focus-visible:outline-2 focus-visible:outline-primary'
				>
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.products,
							image.fileName
						)}
						alt={image.alt ?? item.title}
						width={96}
						height={96}
						className='size-full object-contain'
						unoptimized
					/>
				</Link>
			) : (
				<ImageOff
					size={28}
					className='text-gray-400'
					aria-label='No product image'
				/>
			)}
		</div>
	)
}
