import type { ITimestamps } from '@/types/api.types'

export interface IBlogCategory extends ITimestamps {
	id: string
	title: string
	description: string
	slug: string
}

export interface ICreateBlogCategoryRequest {
	title: string
	description: string
	slug: string
}

export type TUpdateBlogCategoryRequest = Partial<ICreateBlogCategoryRequest>
