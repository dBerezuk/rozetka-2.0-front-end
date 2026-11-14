import { ImageOff } from 'lucide-react'
import Image from 'next/image'

import { Skeleton } from '@/components/ui/Skeleton'
import { mediaConfig } from '@/config/media.config'
import type { ICartLine } from '@/types/cart.types'

interface ICartItemImageProps {
	line: ICartLine
}

export function CartItemImage({ line }: ICartItemImageProps) {
	const image =
		line.product?.images.find(
			image =>
				image.optionValueId &&
				line.variant?.optionValues.some(
					value => value.optionValueId === image.optionValueId
				)
		) ?? line.product?.images.find(image => !image.optionValueId)

	return (
		<div className='flex size-20 shrink-0 items-center justify-center rounded-lg bg-gray-50 p-2 sm:size-24'>
			{line.isLoading ? (
				<Skeleton className='size-full' />
			) : image ? (
				<Image
					src={mediaConfig.getFileUrl(
						mediaConfig.folders.products,
						image.fileName
					)}
					alt={image.alt ?? line.product?.title ?? 'Product'}
					width={96}
					height={96}
					className='size-full object-contain'
					unoptimized
				/>
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
