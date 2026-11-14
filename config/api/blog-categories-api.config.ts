class BlogCategoriesApiConfig {
	readonly baseUrl = '/blog-categories'

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}

	getBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}`
	}
}

export const blogCategoriesApiConfig = new BlogCategoriesApiConfig()
