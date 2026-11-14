import { api } from '@/api/axios.api'
import { uploadsApiConfig } from '@/config/api/uploads-api.config'
import type {
	IDeleteUploadQuery,
	IUploadQuery,
	IUploadResponse
} from '@/types/upload.types'

class UploadsService {
	async upload(file: File, params: IUploadQuery) {
		const body = new FormData()

		body.append('file', file)

		const { data } = await api.post<IUploadResponse>(
			uploadsApiConfig.baseUrl,
			body,
			{ params }
		)

		return data
	}

	async delete(params: IDeleteUploadQuery) {
		await api.delete<void>(uploadsApiConfig.baseUrl, { params })
	}
}

export const uploadsService = new UploadsService()
