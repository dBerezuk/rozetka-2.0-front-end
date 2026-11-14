import { api } from '@/api/axios.api'
import { authApiConfig } from '@/config/api/auth-api.config'
import type { IMessageResponse } from '@/types/api.types'
import type {
	ILoginRequest,
	IRegisterRequest,
	IResetPasswordRequest,
	TForgotPasswordRequest,
	TSocialProvider
} from '@/types/auth.types'
import type { IUser } from '@/types/user.types'

class AuthService {
	async register(body: IRegisterRequest) {
		const { data } = await api.post<IUser>(authApiConfig.register, body)

		return data
	}

	async login(body: ILoginRequest) {
		const { data } = await api.post<IUser>(authApiConfig.login, body)

		return data
	}

	async forgotPassword(body: TForgotPasswordRequest) {
		const { data } = await api.post<IMessageResponse>(
			authApiConfig.forgotPassword,
			body
		)

		return data
	}

	async resetPassword(body: IResetPasswordRequest) {
		const { data } = await api.post<IMessageResponse>(
			authApiConfig.resetPassword,
			body
		)

		return data
	}

	async logout() {
		await api.post<void>(authApiConfig.logout)
	}

	// Navigate the browser to this URL; the provider handles the callback.
	getSocialLoginUrl(provider: TSocialProvider) {
		return api.getUri({ url: authApiConfig.getSocialLogin(provider) })
	}
}

export const authService = new AuthService()
