export interface ITimestamps {
	createdAt: string
	updatedAt: string
}

export interface IPaginationQuery {
	skip?: number
	take?: number
}

export interface IPaginatedResponse<TData> {
	data: TData[]
	more: boolean
}

export interface IMessageResponse {
	message: string
}

export interface IValidationFieldError {
	property: string
	errors: string[]
}

export interface IApiErrorResponse {
	message: string | string[]
	statusCode?: number
	error?: string
	fields?: IValidationFieldError[]
}

export interface IApiError extends Error {
	statusCode?: number
	messages: string[]
	error?: string
	fields: IValidationFieldError[]
}
