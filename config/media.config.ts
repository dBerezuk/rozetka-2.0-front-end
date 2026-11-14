class MediaConfig {
	readonly folders = {
		products: '/products/',
		categories: '/categories/',
		articles: '/articles/',
		stores: '/stores/',
		avatars: '/user/avatars/'
	} as const

	getUrl(path: string) {
		return `/api${path}`
	}

	getFileUrl(folder: string, filename: string) {
		return this.getUrl(`${folder}${encodeURIComponent(filename)}`)
	}
}

export const mediaConfig = new MediaConfig()
