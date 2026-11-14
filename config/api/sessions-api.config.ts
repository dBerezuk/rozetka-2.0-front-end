class SessionsApiConfig {
	readonly baseUrl = '/sessions'

	getById(id: string) {
		return `${this.baseUrl}/${encodeURIComponent(id)}`
	}
}

export const sessionsApiConfig = new SessionsApiConfig()
