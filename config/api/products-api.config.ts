class ProductsApiConfig {
	readonly baseUrl = '/products'
	readonly filters = `${this.baseUrl}/filters`

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}

	getRating(id: string) {
		return `${this.getById(id)}/rating`
	}

	getBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}`
	}

	getByStoreSlug(storeSlug: string) {
		return `${this.baseUrl}/store/${encodeURIComponent(storeSlug)}`
	}

	getMyStoreProducts(storeSlug: string) {
		return `${this.getByStoreSlug(storeSlug)}/owner`
	}

	getSimilarBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}/similar`
	}
}

export const productsApiConfig = new ProductsApiConfig()
