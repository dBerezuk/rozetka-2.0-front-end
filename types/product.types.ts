import type { ITimestamps } from '@/types/api.types'
import type { ICategory } from '@/types/category.types'
import type {
	ICharacteristicValueRequest,
	IProductCharacteristicValue
} from '@/types/characteristic.types'
import type {
	IProductImage,
	IProductImageRequest
} from '@/types/product-image.types'
import type {
	IProductOption,
	IProductOptionRequest
} from '@/types/product-option.types'
import type {
	IProductVariant,
	IProductVariantRequest
} from '@/types/product-variant.types'
import type { IStore } from '@/types/store.types'

export interface IProductBase extends ITimestamps {
	id: string
	title: string
	description: string
	slug: string
	storeId: string
	categoryId: string
}

export interface IProduct extends IProductBase {
	images: IProductImage[]
	options: IProductOption[]
	variants: IProductVariant[]
	characteristics: IProductCharacteristicValue[]
}

export interface IProductDetails extends IProduct {
	store: IStore
	category: ICategory
	ratings: { score: number }[]
}

export type TFavoriteProduct = Pick<
	IProduct,
	'id' | 'title' | 'slug' | 'description' | 'images'
> & { variants: Pick<IProductVariant, 'price'>[] }

export interface IProductDeleteResponse extends IProductBase {
	images: IProductImage[]
}

export interface ICreateProductRequest {
	title: string
	description: string
	slug: string
	storeId: string
	categoryId: string
	characteristics?: ICharacteristicValueRequest[]
	options?: IProductOptionRequest[]
	variants?: IProductVariantRequest[]
	images?: IProductImageRequest[]
}

export type TUpdateProductRequest = Partial<
	Omit<ICreateProductRequest, 'storeId'>
>
