class UsersApiConfig {
	readonly baseUrl = '/users'
	readonly profile = `${this.baseUrl}/me`
	readonly favorites = `${this.profile}/favorites`

	getFavorite(productId: string) {
		return `${this.favorites}/${encodeURIComponent(productId)}`
	}

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}
}

export const usersApiConfig = new UsersApiConfig()
