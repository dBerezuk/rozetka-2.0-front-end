import { api } from '@/api/axios.api'
import { articlesApiConfig } from '@/config/api/articles-api.config'
import type { IPaginatedResponse } from '@/types/api.types'
import type {
	IArticle,
	IArticleDetails,
	IArticleQuery,
	ICreateArticleRequest,
	TUpdateArticleRequest
} from '@/types/article.types'

class ArticlesService {
	async getAll(params: IArticleQuery = {}, signal?: AbortSignal) {
		const { data } = await api.get<IPaginatedResponse<IArticleDetails>>(
			articlesApiConfig.baseUrl,
			{ params, signal }
		)

		return data
	}

	async getAllForManagement(params: IArticleQuery = {}) {
		const { data } = await api.get<IPaginatedResponse<IArticleDetails>>(
			articlesApiConfig.management,
			{ params }
		)

		return data
	}

	async getForManagement(id: IArticle['id']) {
		const { data } = await api.get<IArticleDetails>(
			articlesApiConfig.getForManagement(id)
		)

		return data
	}

	async getBySlug(slug: IArticle['slug']) {
		const { data } = await api.get<IArticleDetails>(
			articlesApiConfig.getBySlug(slug)
		)

		return data
	}

	async create(body: ICreateArticleRequest) {
		const { data } = await api.post<IArticle>(articlesApiConfig.baseUrl, body)

		return data
	}

	async update(id: IArticle['id'], body: TUpdateArticleRequest) {
		const { data } = await api.patch<IArticle>(
			articlesApiConfig.getById(id),
			body
		)

		return data
	}

	async delete(id: IArticle['id']) {
		const { data } = await api.delete<IArticle>(articlesApiConfig.getById(id))

		return data
	}
}

export const articlesService = new ArticlesService()
