import type { ITimestamps } from '@/types/api.types'
import type { ICharacteristic } from '@/types/characteristic.types'

export interface ICategory extends ITimestamps {
	id: string
	title: string
	slug: string
	imageFileName: string | null
	iconPathName: string | null
	parentId: string | null
}

export interface ICategoryListItem extends ICategory {
	children: ICategory[]
}

export interface ICategoryDetails extends ICategoryListItem {
	parent: ICategory | null
	characteristics: ICharacteristic[]
}

export interface ICreateCategoryRequest {
	title: string
	slug: string
	parentId?: string | null
	imageFileName?: string | null
	iconPathName?: string | null
}

export type TUpdateCategoryRequest = Partial<ICreateCategoryRequest>

export interface ICharacteristicFilter {
	id: string
	title: string
	values: string[]
}

export interface IOptionFilter {
	title: string
	values: string[]
}

export interface ICategoryFilters {
	filters: ICharacteristicFilter[]
	variants: IOptionFilter[]
	minPrice: string | null
	maxPrice: string | null
}
