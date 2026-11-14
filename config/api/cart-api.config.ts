class CartApiConfig {
	readonly baseUrl = '/cart'
	readonly items = `${this.baseUrl}/items`
	readonly merge = `${this.baseUrl}/merge`

	getItem(id: string) {
		return `${this.items}/${encodeURIComponent(id)}`
	}
}

export const cartApiConfig = new CartApiConfig()
