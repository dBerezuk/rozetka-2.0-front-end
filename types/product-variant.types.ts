import type { ITimestamps } from '@/types/api.types'
import type {
	IProductOptionBase,
	IProductOptionSelection,
	IProductOptionValue
} from '@/types/product-option.types'

export interface IProductVariantRequest {
	id?: string
	optionValues: IProductOptionSelection[]
	price: number
	sku: string
}

export interface IProductVariantValue extends ITimestamps {
	variantId: string
	optionId: string
	optionValueId: string
	optionValue: IProductOptionValue & {
		option: IProductOptionBase
	}
}

export interface IProductVariant extends ITimestamps {
	id: string
	price: string
	sku: string
	combinationKey: string
	productId: string
	optionValues: IProductVariantValue[]
}
