import { api } from '@/api/axios.api'
import { productsApiConfig } from '@/config/api/products-api.config'
import type { IPaginatedResponse, IPaginationQuery } from '@/types/api.types'
import type { IProductSearchFilters } from '@/types/catalog.types'
import type { IProductQuery } from '@/types/product-query.types'
import type {
	ICreateProductRequest,
	IProduct,
	IProductDeleteResponse,
	IProductDetails,
	TUpdateProductRequest
} from '@/types/product.types'
import type { IStore } from '@/types/store.types'

function serializeProductQuery(query: IProductQuery) {
	const { characteristics, options, ...params } = query

	return {
		...params,
		characteristics: JSON.stringify(characteristics),
		options: JSON.stringify(options)
	}
}

class ProductsService {
	async getFilters(query: IProductQuery, signal?: AbortSignal) {
		const { data } = await api.get<IProductSearchFilters>(
			productsApiConfig.filters,
			{ params: serializeProductQuery(query), signal }
		)

		return data
	}

	async getMyStoreProducts(
		storeSlug: IStore['slug'],
		params: IPaginationQuery = {},
		signal?: AbortSignal
	) {
		const { data } = await api.get<IPaginatedResponse<IProduct>>(
			productsApiConfig.getMyStoreProducts(storeSlug),
			{ params, signal }
		)

		return data
	}

	async getAll(query: IProductQuery = {}, signal?: AbortSignal) {
		const { data } = await api.get<IPaginatedResponse<IProduct>>(
			productsApiConfig.baseUrl,
			{ params: serializeProductQuery(query), signal }
		)

		return data
	}

	async getAllByStoreSlug(
		storeSlug: IStore['slug'],
		query: IProductQuery = {},
		signal?: AbortSignal
	) {
		const { data } = await api.get<IPaginatedResponse<IProduct>>(
			productsApiConfig.getByStoreSlug(storeSlug),
			{
				params: serializeProductQuery(query),
				signal
			}
		)

		return data
	}

	async getSimilarBySlug(
		slug: IProduct['slug'],
		params: IPaginationQuery = {}
	) {
		const { data } = await api.get<IPaginatedResponse<IProduct>>(
			productsApiConfig.getSimilarBySlug(slug),
			{ params }
		)

		return data
	}

	async getBySlug(slug: IProduct['slug']) {
		const { data } = await api.get<IProductDetails>(
			productsApiConfig.getBySlug(slug)
		)

		return data
	}

	async getMyRating(id: IProduct['id'], signal?: AbortSignal) {
		const { data } = await api.get<{ score: number | null }>(
			productsApiConfig.getRating(id),
			{ signal }
		)

		return data
	}

	async setMyRating(id: IProduct['id'], score: number) {
		const { data } = await api.put<{ score: number }>(
			productsApiConfig.getRating(id),
			{ score }
		)

		return data
	}

	async create(body: ICreateProductRequest) {
		const { data } = await api.post<IProduct>(productsApiConfig.baseUrl, body)

		return data
	}

	async update(id: IProduct['id'], body: TUpdateProductRequest) {
		const { data } = await api.patch<IProduct>(
			productsApiConfig.getById(id),
			body
		)

		return data
	}

	async delete(id: IProduct['id']) {
		const { data } = await api.delete<IProductDeleteResponse>(
			productsApiConfig.getById(id)
		)

		return data
	}
}

export const productsService = new ProductsService()
