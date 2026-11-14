export interface ISessionMetadata {
	ip: string | null
	browser: string | null
	operatingSystem: string | null
	country: string | null
	city: string | null
	createdAt: string
}

export interface IUserSession {
	id: string
	isCurrent: boolean
	metadata: ISessionMetadata | null
}
