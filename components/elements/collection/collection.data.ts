import type { TProductSort } from '@/types/product-query.types'

export const SORT_OPTIONS = [
	{ value: 'newest', label: 'Newest' },
	{ value: 'oldest', label: 'Oldest' },
	{ value: 'priceAsc', label: 'Price: low to high' },
	{ value: 'priceDesc', label: 'Price: high to low' }
] as const satisfies ReadonlyArray<{ value: TProductSort; label: string }>
