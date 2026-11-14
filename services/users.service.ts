import { api } from '@/api/axios.api'
import { usersApiConfig } from '@/config/api/users-api.config'
import type { IProduct } from '@/types/product.types'
import type { IUpdateProfileRequest, IUser } from '@/types/user.types'

class UsersService {
	async setFavorite(productId: IProduct['id'], isFavorite: boolean) {
		const url = usersApiConfig.getFavorite(productId)
		const { data } = isFavorite
			? await api.put<IUser>(url)
			: await api.delete<IUser>(url)

		return data
	}

	async getProfile(signal?: AbortSignal) {
		const { data, status } = await api.get<IUser>(usersApiConfig.profile, {
			signal,
			validateStatus: status =>
				status === 401 || (status >= 200 && status < 300)
		})

		return status === 401 ? null : data
	}

	async getById(id: IUser['id']) {
		const { data } = await api.get<IUser>(usersApiConfig.getById(id))

		return data
	}

	async updateProfile(body: IUpdateProfileRequest) {
		const { data } = await api.patch<IUser>(usersApiConfig.profile, body)

		return data
	}

	async deleteAccount() {
		await api.delete<void>(usersApiConfig.profile)
	}
}

export const usersService = new UsersService()
