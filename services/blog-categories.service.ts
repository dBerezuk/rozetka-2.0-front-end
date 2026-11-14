import { api } from '@/api/axios.api'
import { blogCategoriesApiConfig } from '@/config/api/blog-categories-api.config'
import type { IPaginatedResponse, IPaginationQuery } from '@/types/api.types'
import type {
	IBlogCategory,
	ICreateBlogCategoryRequest,
	TUpdateBlogCategoryRequest
} from '@/types/blog-category.types'

class BlogCategoriesService {
	async getAll(params: IPaginationQuery = {}, signal?: AbortSignal) {
		const { data } = await api.get<IPaginatedResponse<IBlogCategory>>(
			blogCategoriesApiConfig.baseUrl,
			{ params, signal }
		)

		return data
	}

	async getAllForSidebar(signal?: AbortSignal) {
		const categories: IBlogCategory[] = []
		let hasMore = true

		while (hasMore) {
			const page = await this.getAll(
				{ skip: categories.length, take: 100 },
				signal
			)
			categories.push(...page.data)
			hasMore = page.more && page.data.length > 0
		}

		return categories
	}

	async getBySlug(slug: IBlogCategory['slug']) {
		const { data } = await api.get<IBlogCategory>(
			blogCategoriesApiConfig.getBySlug(slug)
		)

		return data
	}

	async create(body: ICreateBlogCategoryRequest) {
		const { data } = await api.post<IBlogCategory>(
			blogCategoriesApiConfig.baseUrl,
			body
		)

		return data
	}

	async update(id: IBlogCategory['id'], body: TUpdateBlogCategoryRequest) {
		const { data } = await api.patch<IBlogCategory>(
			blogCategoriesApiConfig.getById(id),
			body
		)

		return data
	}

	async delete(id: IBlogCategory['id']) {
		const { data } = await api.delete<IBlogCategory>(
			blogCategoriesApiConfig.getById(id)
		)

		return data
	}
}

export const blogCategoriesService = new BlogCategoriesService()
