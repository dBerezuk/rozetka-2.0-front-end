export interface ILoginRequest {
	email: string
	password: string
}

export interface IRegisterRequest extends ILoginRequest {
	fullname: string
}

export type TForgotPasswordRequest = Pick<ILoginRequest, 'email'>

export interface IResetPasswordRequest extends Pick<ILoginRequest, 'password'> {
	token: string
}

export type TSocialProvider = 'google' | 'facebook'

export type TAuthMode = 'login' | 'register' | 'resetPassword' | 'newPassword'
