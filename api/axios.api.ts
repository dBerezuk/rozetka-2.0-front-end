import axios from 'axios'
import { toast } from 'sonner'

import type { IApiErrorResponse } from '@/types/api.types'

export const api = axios.create({
	baseURL:
		typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : '/api',
	withCredentials: true,
	headers: { Accept: 'application/json' }
})

api.interceptors.response.use(
	response => response,
	(error: unknown) => {
		if (axios.isCancel(error)) {
			return Promise.reject(error)
		}

		const statusCode = axios.isAxiosError<IApiErrorResponse>(error)
			? error.response?.status
			: undefined
		const responseData = axios.isAxiosError<IApiErrorResponse>(error)
			? error.response?.data
			: undefined

		const responseMessage = responseData?.message
		const messages = Array.isArray(responseMessage)
			? responseMessage.filter(
					(message): message is string => typeof message === 'string'
				)
			: typeof responseMessage === 'string'
				? [responseMessage]
				: []

		const isClientError = statusCode !== undefined && statusCode < 500
		const message =
			isClientError && messages.length
				? messages.join('\n')
				: 'Unable to complete the request. Please try again.'
		const fields = isClientError ? (responseData?.fields ?? []) : []

		if (typeof window !== 'undefined' && !fields.length) {
			toast.error(message, { id: message })
		}

		return Promise.reject(
			Object.assign(new Error(message), {
				statusCode,
				messages: isClientError ? messages : [],
				error: isClientError ? responseData?.error : undefined,
				fields
			})
		)
	}
)
