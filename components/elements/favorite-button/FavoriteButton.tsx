'use client'

import { Heart, LoaderCircle, Trash2 } from 'lucide-react'

import { useFavoriteButton } from '@/components/elements/favorite-button/useFavoriteButton'
import { Button } from '@/components/ui/button/Button'
import type { IProduct } from '@/types/product.types'
import { cn } from '@/utils/cn.util'

interface IFavoriteButtonProps {
	product: Pick<IProduct, 'id' | 'title'>
	className?: string
	isRemoveButton?: boolean
}

export function FavoriteButton({
	product,
	className,
	isRemoveButton = false
}: IFavoriteButtonProps) {
	const { isFavorite, isPending, isDisabled, onToggleFavorite } =
		useFavoriteButton(product.id)
	const label = `${isFavorite ? 'Remove' : 'Add'} ${product.title} ${isFavorite ? 'from' : 'to'} favorites`

	return (
		<Button
			variant='ghost'
			size={isRemoveButton ? 'small' : 'icon'}
			className={cn(
				isRemoveButton
					? 'min-w-24 bg-red-50 px-3 text-red-600 hover:bg-red-100 hover:text-red-700 focus-visible:outline-red-500'
					: 'text-gray-500',
				isFavorite && !isRemoveButton && 'text-primary',
				className
			)}
			disabled={isPending || isDisabled}
			aria-label={isPending ? 'Updating favorites' : label}
			aria-pressed={isFavorite}
			aria-busy={isPending}
			onClick={onToggleFavorite}
		>
			{isPending ? (
				<LoaderCircle
					size={18}
					className='animate-spin motion-reduce:animate-none'
					aria-hidden='true'
				/>
			) : isRemoveButton ? (
				<Trash2 size={18} aria-hidden='true' />
			) : (
				<Heart
					size={18}
					className={cn(isFavorite && 'fill-current')}
					aria-hidden='true'
				/>
			)}
			{isRemoveButton && <span>{isPending ? 'Removing...' : 'Remove'}</span>}
		</Button>
	)
}
