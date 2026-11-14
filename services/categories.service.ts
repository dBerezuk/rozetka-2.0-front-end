import { api } from '@/api/axios.api'
import { categoriesApiConfig } from '@/config/api/categories-api.config'
import type { IPaginatedResponse, IPaginationQuery } from '@/types/api.types'
import type {
	ICategory,
	ICategoryDetails,
	ICategoryFilters,
	ICategoryListItem,
	ICreateCategoryRequest,
	TUpdateCategoryRequest
} from '@/types/category.types'

class CategoriesService {
	async getAll(params: IPaginationQuery = {}) {
		const { data } = await api.get<IPaginatedResponse<ICategoryListItem>>(
			categoriesApiConfig.baseUrl,
			{ params }
		)

		return data
	}

	async getBySlug(slug: ICategory['slug']) {
		const { data } = await api.get<ICategoryDetails>(
			categoriesApiConfig.getBySlug(slug)
		)

		return data
	}

	async getFiltersBySlug(slug: ICategory['slug']) {
		const { data } = await api.get<ICategoryFilters>(
			categoriesApiConfig.getFiltersBySlug(slug)
		)

		return data
	}

	async create(body: ICreateCategoryRequest) {
		const { data } = await api.post<ICategory>(
			categoriesApiConfig.baseUrl,
			body
		)

		return data
	}

	async update(id: ICategory['id'], body: TUpdateCategoryRequest) {
		const { data } = await api.patch<ICategory>(
			categoriesApiConfig.getById(id),
			body
		)

		return data
	}

	async delete(id: ICategory['id']) {
		const { data } = await api.delete<ICategory>(
			categoriesApiConfig.getById(id)
		)

		return data
	}
}

export const categoriesService = new CategoriesService()
