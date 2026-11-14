import { atomWithStorage, createJSONStorage } from 'jotai/utils'

import type { ICheckoutDraft } from '@/types/payment.types'

export const checkoutDraftAtom = atomWithStorage<ICheckoutDraft | null>(
	'checkout-draft',
	null,
	typeof window === 'undefined'
		? undefined
		: createJSONStorage<ICheckoutDraft | null>(() => window.sessionStorage),
	{ getOnInit: true }
)
