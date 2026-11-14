import type { IOrder } from '@/types/order.types'

class OrdersApiConfig {
	readonly baseUrl = '/orders'

	getById(id: IOrder['id']) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}
}

export const ordersApiConfig = new OrdersApiConfig()
