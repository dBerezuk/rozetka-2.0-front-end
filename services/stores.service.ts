import { api } from '@/api/axios.api'
import { storesApiConfig } from '@/config/api/stores-api.config'
import type { IPaginatedResponse, IPaginationQuery } from '@/types/api.types'
import type {
	ICreateStoreRequest,
	IStore,
	TUpdateStoreRequest
} from '@/types/store.types'

class StoresService {
	async getMyStores() {
		const { data } = await api.get<IStore[]>(storesApiConfig.myStores)

		return data
	}

	async getAll(params: IPaginationQuery = {}) {
		const { data } = await api.get<IPaginatedResponse<IStore>>(
			storesApiConfig.baseUrl,
			{ params }
		)

		return data
	}

	async getBySlug(slug: IStore['slug']) {
		const { data } = await api.get<IStore>(storesApiConfig.getBySlug(slug))

		return data
	}

	async getMyStoreBySlug(slug: IStore['slug']) {
		const { data } = await api.get<IStore>(
			storesApiConfig.getMyStoreBySlug(slug)
		)

		return data
	}

	async create(body: ICreateStoreRequest) {
		const { data } = await api.post<IStore>(storesApiConfig.baseUrl, body)

		return data
	}

	async update(id: IStore['id'], body: TUpdateStoreRequest) {
		const { data } = await api.patch<IStore>(storesApiConfig.getById(id), body)

		return data
	}

	async delete(id: IStore['id']) {
		const { data } = await api.delete<IStore>(storesApiConfig.getById(id))

		return data
	}
}

export const storesService = new StoresService()
