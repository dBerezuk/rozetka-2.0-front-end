import type { ITimestamps } from '@/types/api.types'

export interface IStore extends ITimestamps {
	id: string
	title: string
	description: string
	slug: string
	userId: string
}

export interface ICreateStoreRequest {
	title: string
	description: string
	slug: string
}

export type TUpdateStoreRequest = Partial<ICreateStoreRequest>
