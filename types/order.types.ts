import type { ITimestamps } from '@/types/api.types'
import type { IProductImage } from '@/types/product-image.types'
import type { IProductVariant } from '@/types/product-variant.types'
import type { IProductBase } from '@/types/product.types'
import type { ITransaction } from '@/types/transaction.types'
import type { IUser } from '@/types/user.types'

export type TOrderStatus =
	| 'PENDING_PAYMENT'
	| 'PAID'
	| 'PAYMENT_FAILED'
	| 'EXPIRED'
	| 'PARTIALLY_REFUNDED'
	| 'REFUNDED'

export interface IOrderItem extends ITimestamps {
	id: string
	orderId: string
	productId: IProductBase['id']
	variantId: IProductVariant['id']
	storeId: IProductBase['storeId']
	title: IProductBase['title']
	sku: IProductVariant['sku']
	price: IProductVariant['price']
	quantity: number
	optionValues: { name: string; value: string }[]
	product?:
		| (Pick<IProductBase, 'id' | 'slug'> & {
				images: Pick<IProductImage, 'fileName' | 'alt'>[]
		  })
		| null
}

export interface IOrder extends ITimestamps {
	id: string
	requestId: string
	userId: IUser['id'] | null
	status: TOrderStatus
	amount: string
	currency: number
	fullname: IUser['fullname']
	email: IUser['email']
	phone: string
	shippingAddress: string
	comment: string | null
	items: IOrderItem[]
	transaction: ITransaction | null
}
