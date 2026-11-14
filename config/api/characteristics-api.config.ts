class CharacteristicsApiConfig {
	readonly baseUrl = '/characteristics'

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}

	getByCategorySlug(slug: string) {
		return `${this.baseUrl}/category/${encodeURIComponent(slug)}`
	}
}

export const characteristicsApiConfig = new CharacteristicsApiConfig()
