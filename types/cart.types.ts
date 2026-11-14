import type { ITimestamps } from '@/types/api.types'
import type { IProductImage } from '@/types/product-image.types'
import type { IProductOption } from '@/types/product-option.types'
import type { IProductVariant } from '@/types/product-variant.types'
import type { IProductBase } from '@/types/product.types'

export interface IUpdateCartItemRequest {
	quantity: number
}

export interface IAddCartItemRequest extends IUpdateCartItemRequest {
	variantId: string
}

export interface IMergeCartRequest {
	items: IAddCartItemRequest[]
}

export interface ICartProduct extends IProductBase {
	images: IProductImage[]
	options: IProductOption[]
}

export interface ICartVariant extends IProductVariant {
	product: ICartProduct
}

export interface ICartItem extends ITimestamps {
	id: string
	quantity: number
	cartId: string
	variantId: string
	variant: ICartVariant
}

export interface ICart extends ITimestamps {
	id: string
	amount: string
	userId: string
	items: ICartItem[]
}

export interface IGuestCartItem extends IAddCartItemRequest {
	productSlug: IProductBase['slug']
}

export interface ICartLine extends IGuestCartItem {
	product?: ICartProduct
	variant?: IProductVariant
	isLoading: boolean
	isError: boolean
}
