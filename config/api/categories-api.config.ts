class CategoriesApiConfig {
	readonly baseUrl = '/categories'

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}

	getBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}`
	}

	getFiltersBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}/filters`
	}
}

export const categoriesApiConfig = new CategoriesApiConfig()
