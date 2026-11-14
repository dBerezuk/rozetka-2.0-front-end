'use client'

import { useSearchParams } from 'next/navigation'

import { ProductCatalog } from '@/components/elements/catalog/ProductCatalog'

export function SearchPage() {
	const searchParams = useSearchParams()
	const query = (searchParams.get('query') ?? '').trim()

	return <ProductCatalog search={query} />
}
