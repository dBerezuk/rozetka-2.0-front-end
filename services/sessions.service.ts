import { api } from '@/api/axios.api'
import { sessionsApiConfig } from '@/config/api/sessions-api.config'
import type { IUserSession } from '@/types/session.types'

class SessionsService {
	async getAll() {
		const { data } = await api.get<IUserSession[]>(sessionsApiConfig.baseUrl)

		return data
	}

	async delete(id: IUserSession['id']) {
		await api.delete<void>(sessionsApiConfig.getById(id))
	}
}

export const sessionsService = new SessionsService()
