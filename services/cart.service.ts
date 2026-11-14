import { api } from '@/api/axios.api'
import { cartApiConfig } from '@/config/api/cart-api.config'
import type {
	IAddCartItemRequest,
	ICart,
	ICartItem,
	IMergeCartRequest,
	IUpdateCartItemRequest
} from '@/types/cart.types'

class CartService {
	async getCurrent() {
		const { data } = await api.get<ICart>(cartApiConfig.baseUrl)

		return data
	}

	async addItem(body: IAddCartItemRequest) {
		const { data } = await api.post<ICart>(cartApiConfig.items, body)

		return data
	}

	async updateItem(id: ICartItem['id'], body: IUpdateCartItemRequest) {
		const { data } = await api.patch<ICart>(cartApiConfig.getItem(id), body)

		return data
	}

	async deleteItem(id: ICartItem['id']) {
		const { data } = await api.delete<ICart>(cartApiConfig.getItem(id))

		return data
	}

	async merge(body: IMergeCartRequest) {
		const { data } = await api.post<ICart>(cartApiConfig.merge, body)

		return data
	}
}

export const cartService = new CartService()
