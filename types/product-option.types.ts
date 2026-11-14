import type { ITimestamps } from '@/types/api.types'

export interface IProductOptionSelection {
	title: string
	value: string
}

export interface IProductOptionValueRequest {
	id?: string
	value: string
	position?: number
}

export interface IProductOptionRequest {
	id?: string
	title: string
	position?: number
	isGallery?: boolean
	values: IProductOptionValueRequest[]
}

export interface IProductOptionBase extends ITimestamps {
	id: string
	title: string
	position: number
	isGallery: boolean
	productId: string
}

export interface IProductOptionValue extends ITimestamps {
	id: string
	value: string
	position: number
	optionId: string
}

export interface IProductOption extends IProductOptionBase {
	values: IProductOptionValue[]
}
