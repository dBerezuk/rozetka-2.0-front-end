import type { ITimestamps } from '@/types/api.types'

export type TTransactionStatus =
	| 'PENDING'
	| 'INITIALIZING'
	| 'UNKNOWN'
	| 'CREATED'
	| 'PROCESSING'
	| 'HOLD'
	| 'SUCCESS'
	| 'FAILURE'
	| 'REVERSED'
	| 'EXPIRED'

export interface ITransaction extends ITimestamps {
	id: string
	orderId: string
	status: TTransactionStatus
	amount: number
	currency: number
	providerAmount: number | null
	providerCurrency: number | null
	invoiceId: string | null
	pageUrl: string | null
	finalAmount: number | null
	failureReason: string | null
	providerModifiedAt: string | null
}
