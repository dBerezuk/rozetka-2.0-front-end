class ArticlesApiConfig {
	readonly baseUrl = '/articles'
	readonly management = `${this.baseUrl}/manage`

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}

	getBySlug(slug: string) {
		return `${this.baseUrl}/${encodeURIComponent(slug)}`
	}

	getForManagement(id: string) {
		return `${this.management}/${encodeURIComponent(id)}`
	}
}

export const articlesApiConfig = new ArticlesApiConfig()
