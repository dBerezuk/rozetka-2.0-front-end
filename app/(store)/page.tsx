import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'

import { getHomeCategories } from '@/app/(store)/home/home-category.util'
import { HomePage } from '@/app/(store)/HomePage'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import type { ICategory } from '@/types/category.types'

export const metadata: Metadata = {
	alternates: { canonical: pagesConfig.home },
	openGraph: { ...defaultOpenGraph, url: pagesConfig.home }
}

export const dynamic = 'force-dynamic'

const getCategories = unstable_cache(
	() => categoriesService.getAll(),
	['home-categories'],
	{ revalidate: 60 }
)

async function getProducts(categorySlug?: ICategory['slug']) {
	return productsService.getAll({ sort: 'newest', take: 8, categorySlug })
}

export default async function Home() {
	const [categories, products] = await Promise.all([
		getCategories(),
		getProducts()
	])

	const categoryProducts = await Promise.all(
		getHomeCategories(categories.data)
			.slice(0, 2)
			.map(
				async category =>
					[category.slug, await getProducts(category.slug)] as const
			)
	)

	return (
		<HomePage
			categories={categories}
			products={products}
			categoryProducts={Object.fromEntries(categoryProducts)}
		/>
	)
}
