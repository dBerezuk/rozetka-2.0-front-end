class StoresApiConfig {
	readonly baseUrl = '/stores'
	readonly myStores = `${this.baseUrl}/owner/me`

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}

	getBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}`
	}

	getMyStoreBySlug(slug: string) {
		return `${this.getBySlug(slug)}/owner`
	}
}

export const storesApiConfig = new StoresApiConfig()
