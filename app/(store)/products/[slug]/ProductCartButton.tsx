'use client'

import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/button/Button'
import type { IProductVariant } from '@/types/product-variant.types'
import type { IProduct } from '@/types/product.types'

interface IProductCartButtonProps {
	product: IProduct
	variantId?: IProductVariant['id']
}

const CartButton = dynamic(
	() =>
		import('@/components/elements/cart-button/CartButton').then(
			module => module.CartButton
		),
	{
		ssr: false,
		loading: () => <Button isLoading className='block w-full' />
	}
)

export function ProductCartButton(props: IProductCartButtonProps) {
	return <CartButton {...props} className='w-full' isLoadingSkeletonVisible />
}
