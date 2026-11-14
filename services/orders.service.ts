import { api } from '@/api/axios.api'
import { ordersApiConfig } from '@/config/api/orders-api.config'
import type { IOrder } from '@/types/order.types'

class OrdersService {
	async getById(id: IOrder['id'], signal?: AbortSignal) {
		const { data } = await api.get<IOrder>(ordersApiConfig.getById(id), {
			signal
		})

		return data
	}
}

export const ordersService = new OrdersService()
