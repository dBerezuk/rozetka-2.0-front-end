import { api } from '@/api/axios.api'
import { characteristicsApiConfig } from '@/config/api/characteristics-api.config'
import type { ICategory } from '@/types/category.types'
import type {
	ICharacteristic,
	ICreateCharacteristicRequest,
	TUpdateCharacteristicRequest
} from '@/types/characteristic.types'

class CharacteristicsService {
	async getAllByCategorySlug(slug: ICategory['slug']) {
		const { data } = await api.get<ICharacteristic[]>(
			characteristicsApiConfig.getByCategorySlug(slug)
		)

		return data
	}

	async create(body: ICreateCharacteristicRequest) {
		const { data } = await api.post<ICharacteristic>(
			characteristicsApiConfig.baseUrl,
			body
		)

		return data
	}

	async update(id: ICharacteristic['id'], body: TUpdateCharacteristicRequest) {
		const { data } = await api.patch<ICharacteristic>(
			characteristicsApiConfig.getById(id),
			body
		)

		return data
	}

	async delete(id: ICharacteristic['id']) {
		const { data } = await api.delete<ICharacteristic>(
			characteristicsApiConfig.getById(id)
		)

		return data
	}
}

export const characteristicsService = new CharacteristicsService()
