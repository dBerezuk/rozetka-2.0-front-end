import type { mediaConfig } from '@/config/media.config'

export type TUploadFolder =
	(typeof mediaConfig.folders)[keyof typeof mediaConfig.folders]

export interface IUploadQuery {
	folder: TUploadFolder
}

export interface IDeleteUploadQuery extends IUploadQuery {
	filename: string
}

export interface IUploadResponse {
	filename: string
	url: string
}
