'use client'

import { LoaderCircle, ShoppingCart, Trash2 } from 'lucide-react'

import { useCartButton } from '@/components/elements/cart-button/useCartButton'
import { Button } from '@/components/ui/button/Button'
import type { IProductVariant } from '@/types/product-variant.types'
import type { IProduct } from '@/types/product.types'
import { cn } from '@/utils/cn.util'

interface ICartButtonProps {
	product: IProduct
	variantId?: IProductVariant['id']
	className?: string
	isIconOnly?: boolean
	isLoadingSkeletonVisible?: boolean
}

export function CartButton({
	product,
	variantId,
	className,
	isIconOnly = false,
	isLoadingSkeletonVisible = false
}: ICartButtonProps) {
	const { isInCart, isLoading, isPending, isDisabled, onToggleCart } =
		useCartButton(product, variantId)
	const Icon = isPending ? LoaderCircle : isInCart ? Trash2 : ShoppingCart
	const isSkeletonVisible = isLoadingSkeletonVisible && isLoading

	return (
		<Button
			size={isIconOnly ? 'icon' : 'medium'}
			className={cn(className, isSkeletonVisible && 'block')}
			isLoading={isSkeletonVisible}
			variant={isInCart ? 'outline' : 'primary'}
			disabled={isDisabled || isPending}
			aria-pressed={isInCart}
			aria-busy={isPending}
			aria-label={`${isInCart ? 'Remove' : 'Add'} ${product.title} ${isInCart ? 'from' : 'to'} cart`}
			onClick={onToggleCart}
		>
			<Icon
				size={18}
				aria-hidden='true'
				className={
					isPending ? 'animate-spin motion-reduce:animate-none' : undefined
				}
			/>
			{!isIconOnly &&
				(isPending
					? 'Updating cart...'
					: isInCart
						? 'Remove from cart'
						: 'Add to cart')}
		</Button>
	)
}
