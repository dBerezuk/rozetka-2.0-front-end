import type { IOrder } from '@/types/order.types'
import type { IUser } from '@/types/user.types'

export type TCreatePaymentRequest = Pick<
	IOrder,
	'requestId' | 'fullname' | 'email' | 'phone' | 'shippingAddress'
> & { comment?: string }

export interface ICheckoutDraft {
	userId: IUser['id']
	request: TCreatePaymentRequest
}
