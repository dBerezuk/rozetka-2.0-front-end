import type { ITimestamps } from '@/types/api.types'
import type { TFavoriteProduct } from '@/types/product.types'

export type TUserRole = 'USER' | 'ADMIN' | 'CATALOG_MANAGER' | 'CONTENT_MANAGER'

export interface IUser extends ITimestamps {
	id: string
	fullname: string
	email: string
	avatarFileName: string | null
	role: TUserRole
	favorites: TFavoriteProduct[]
}

export interface IUpdateProfileRequest {
	fullname?: string
	email?: string
	password?: string
	avatarFileName?: string | null
}
