import type { Metadata } from 'next'
import { cache } from 'react'

import { ProductPage } from '@/app/(store)/products/[slug]/ProductPage'
import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { productsService } from '@/services/products.service'
import type { IProduct } from '@/types/product.types'
import { handleNotFound } from '@/utils/handle-not-found.util'

interface IProductPageProps {
	params: Promise<Pick<IProduct, 'slug'>>
}

export const dynamic = 'force-dynamic'

const getProduct = cache((slug: IProduct['slug']) =>
	productsService.getBySlug(slug).catch(handleNotFound)
)

export async function generateMetadata({
	params
}: IProductPageProps): Promise<Metadata> {
	const { slug } = await params
	const product = await getProduct(slug)
	const url = pagesConfig.getProduct(product.slug)
	const [image] = product.images
	const imageUrl = image
		? mediaConfig.getFileUrl(mediaConfig.folders.products, image.fileName)
		: null

	return {
		title: product.title,
		description: product.description,
		alternates: { canonical: url },
		openGraph: {
			...defaultOpenGraph,
			url,
			images: imageUrl
				? [{ url: imageUrl, alt: image?.alt || product.title }]
				: defaultOpenGraph.images
		}
	}
}

export default async function Product({ params }: IProductPageProps) {
	const { slug } = await params

	const product = await getProduct(slug)

	const similarProducts = await productsService.getSimilarBySlug(slug, {
		take: 8
	})

	return (
		<div className='py-6 max-lg:px-4 sm:py-8'>
			<ProductPage product={product} similarProducts={similarProducts.data} />
		</div>
	)
}
