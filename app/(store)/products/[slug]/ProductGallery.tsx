'use client'

import { ImageOff } from 'lucide-react'
import Image from 'next/image'

import { Slider } from '@/components/elements/slider/Slider'
import { mediaConfig } from '@/config/media.config'
import type { IProduct } from '@/types/product.types'

type TProductGalleryProps = Pick<IProduct, 'images' | 'title'>

export function ProductGallery({ images, title }: TProductGalleryProps) {
	return (
		<div className='min-w-0 rounded-xl bg-white p-6'>
			{images.length ? (
				<Slider
					label={`${title} images`}
					isArrowsVisible={images.length > 1}
					isDotsVisible
					arrowsVariant='sides'
					className={images.length > 1 ? 'pb-10' : undefined}
					arrowsClassName='top-[calc(50%_-_1.25rem)]'
					dotsClassName='absolute inset-x-0 bottom-0 mt-0 flex-wrap'
				>
					{images.map((image, index) => (
						<Image
							key={image.id}
							src={mediaConfig.getFileUrl(
								mediaConfig.folders.products,
								image.fileName
							)}
							alt={image.alt ?? title}
							width={640}
							height={640}
							sizes='(max-width: 1023px) 100vw, 50vw'
							loading={index === 0 ? 'eager' : 'lazy'}
							draggable={false}
							unoptimized
							className='aspect-4/3 h-auto max-h-96 w-full object-contain'
						/>
					))}
				</Slider>
			) : (
				<div className='flex aspect-4/3 max-h-96 items-center justify-center'>
					<ImageOff
						size={56}
						className='text-gray-400'
						aria-label='No product image'
					/>
				</div>
			)}
		</div>
	)
}
