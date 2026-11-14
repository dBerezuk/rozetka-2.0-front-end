import type { IPaginationQuery, ITimestamps } from '@/types/api.types'
import type { IBlogCategory } from '@/types/blog-category.types'

export interface IArticleQuery extends IPaginationQuery {
	categorySlug?: string
}

export interface IArticle extends ITimestamps {
	id: string
	title: string
	description: string
	content: string
	slug: string
	published: boolean
	imageFileName: string | null
	categoryId: string
}

export interface IArticleDetails extends IArticle {
	category: IBlogCategory
}

export interface ICreateArticleRequest {
	title: string
	description: string
	slug: string
	content: string
	published?: boolean
	categoryId: string
	imageFileName?: string | null
}

export type TUpdateArticleRequest = Partial<ICreateArticleRequest>
