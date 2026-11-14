import type { ITimestamps } from '@/types/api.types'

export interface ICharacteristic extends ITimestamps {
	id: string
	title: string
	isSorting: boolean
	categoryId: string
}

export interface ICreateCharacteristicRequest {
	title: string
	isSorting?: boolean
	categoryId: string
}

export type TUpdateCharacteristicRequest = Partial<
	Omit<ICreateCharacteristicRequest, 'categoryId'>
>

export interface ICharacteristicValueRequest {
	characteristicId: string
	value: string
}

export interface IProductCharacteristicValue extends ITimestamps {
	id: string
	value: string
	characteristicId: string
	productId: string
	characteristic: ICharacteristic
}
