import type { ITimestamps } from '@/types/api.types'
import type { IProductOptionSelection } from '@/types/product-option.types'

export interface IProductImageRequest {
	id?: string
	fileName: string
	alt?: string | null
	position?: number
	optionValue?: IProductOptionSelection | null
}

export interface IProductImage extends ITimestamps {
	id: string
	fileName: string
	alt: string | null
	position: number
	productId: string
	optionValueId: string | null
}
