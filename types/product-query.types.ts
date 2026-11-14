import type { IPaginationQuery } from '@/types/api.types'

export type TProductSort = 'newest' | 'oldest' | 'priceAsc' | 'priceDesc'

export interface IProductCharacteristicFilter {
	characteristicId: string
	values: string[]
}

export interface IProductOptionFilter {
	title: string
	values: string[]
}

export interface IProductQuery extends IPaginationQuery {
	search?: string
	categorySlug?: string
	minPrice?: number
	maxPrice?: number
	sort?: TProductSort
	characteristics?: IProductCharacteristicFilter[]
	options?: IProductOptionFilter[]
}
