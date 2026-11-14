import type { TSocialProvider } from '@/types/auth.types'

class AuthApiConfig {
	readonly baseUrl = '/auth'
	readonly register = `${this.baseUrl}/register`
	readonly login = `${this.baseUrl}/login`
	readonly forgotPassword = `${this.baseUrl}/forgot-password`
	readonly resetPassword = `${this.baseUrl}/reset-password`
	readonly logout = `${this.baseUrl}/logout`

	getSocialLogin(provider: TSocialProvider) {
		return `${this.baseUrl}/${provider}`
	}
}

export const authApiConfig = new AuthApiConfig()
