import { api } from '@/api/axios.api'
import { paymentsApiConfig } from '@/config/api/payments-api.config'
import type { IOrder } from '@/types/order.types'
import type { TCreatePaymentRequest } from '@/types/payment.types'

class PaymentsService {
	async create(body: TCreatePaymentRequest) {
		const { data } = await api.post<IOrder>(paymentsApiConfig.baseUrl, body)

		return data
	}

	async sync(orderId: IOrder['id']) {
		const { data } = await api.post<IOrder>(paymentsApiConfig.sync, { orderId })

		return data
	}
}

export const paymentsService = new PaymentsService()
