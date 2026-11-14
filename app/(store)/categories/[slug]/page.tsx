import type { Metadata } from 'next'
import { cache } from 'react'

import { CategoryHeading } from '@/app/(store)/categories/[slug]/CategoryHeading'
import { ProductCatalog } from '@/components/elements/catalog/ProductCatalog'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import type { ICategory } from '@/types/category.types'
import { getStaticSlugParams } from '@/utils/get-static-slug-params.util'
import { handleNotFound } from '@/utils/handle-not-found.util'

interface ICategoryPageProps {
	params: Promise<Pick<ICategory, 'slug'>>
}

export const dynamic = 'force-static'
export const dynamicParams = true

export function generateStaticParams() {
	return getStaticSlugParams('/categories/[slug]', query => categoriesService.getAll(query))
}

const getCategory = cache((slug: ICategory['slug']) =>
	categoriesService.getBySlug(slug).catch(handleNotFound)
)

export async function generateMetadata({
	params
}: ICategoryPageProps): Promise<Metadata> {
	const { slug } = await params
	const category = await getCategory(slug)
	const url = pagesConfig.getCategoryProducts(category.slug)

	return {
		title: category.title,
		description: `Shop ${category.title} from different sellers on Rozetka 2.0.`,
		alternates: { canonical: url },
		openGraph: { ...defaultOpenGraph, url }
	}
}

async function getCategoryPageData(slug: ICategory['slug']) {
	const category = await getCategory(slug)

	const [filters, products] = await Promise.all([
		categoriesService.getFiltersBySlug(slug),
		productsService.getAll({ categorySlug: slug, take: 24 })
	])

	return { category, filters, products }
}

export default async function CategoryPage({ params }: ICategoryPageProps) {
	const { slug } = await params

	const { category, filters, products } = await getCategoryPageData(slug)

	return (
		<div className='space-y-6 p-4 sm:p-6 lg:p-8'>
			<CategoryHeading category={category} />
			<ProductCatalog
				category={category}
				categoryFilters={filters}
				initialProducts={products}
			/>
		</div>
	)
}
