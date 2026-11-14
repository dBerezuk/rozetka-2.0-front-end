import type { Metadata } from 'next'
import { cache } from 'react'

import { StorePage } from '@/app/(store)/stores/[slug]/StorePage'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { productsService } from '@/services/products.service'
import { storesService } from '@/services/stores.service'
import type { IStore } from '@/types/store.types'
import { handleNotFound } from '@/utils/handle-not-found.util'

interface IStoreRouteProps {
	params: Promise<Pick<IStore, 'slug'>>
}

const getStore = cache((slug: IStore['slug']) => storesService.getBySlug(slug))

export async function generateMetadata({
	params
}: IStoreRouteProps): Promise<Metadata> {
	const { slug } = await params
	const store = await getStore(slug).catch(handleNotFound)
	const url = pagesConfig.getStore(store.slug)

	return {
		title: store.title,
		description: store.description,
		alternates: { canonical: url },
		openGraph: { ...defaultOpenGraph, url }
	}
}

export default async function page({ params }: IStoreRouteProps) {
	const { slug } = await params

	const [store, products] = await Promise.all([
		getStore(slug),
		productsService.getAllByStoreSlug(slug)
	]).catch(handleNotFound)

	return <StorePage store={store} products={products} />
}
