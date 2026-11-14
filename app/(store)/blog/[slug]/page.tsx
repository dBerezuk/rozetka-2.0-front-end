import type { Metadata } from 'next'

import { ArticlePage } from '@/app/(store)/blog/[slug]/ArticlePage'
import { getArticle } from '@/app/(store)/blog/blog-data'
import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { articlesService } from '@/services/articles.service'
import type { IArticle } from '@/types/article.types'
import { getStaticSlugParams } from '@/utils/get-static-slug-params.util'

interface IArticlePageProps {
	params: Promise<Pick<IArticle, 'slug'>>
}

export const dynamic = 'force-static'
export const dynamicParams = true

export function generateStaticParams() {
	return getStaticSlugParams('/blog/[slug]', query => articlesService.getAll(query))
}

export async function generateMetadata({
	params
}: IArticlePageProps): Promise<Metadata> {
	const { slug } = await params

	const article = await getArticle(slug)
	const url = pagesConfig.getArticle(article.slug)
	const imageUrl = article.imageFileName
		? mediaConfig.getFileUrl(mediaConfig.folders.articles, article.imageFileName)
		: null

	return {
		title: article.title,
		description: article.description,
		alternates: { canonical: url },
		openGraph: {
			...defaultOpenGraph,
			type: 'article',
			url,
			images: imageUrl
				? [{ url: imageUrl, alt: article.title }]
				: defaultOpenGraph.images,
			publishedTime: article.createdAt,
			modifiedTime: article.updatedAt
		}
	}
}

export default async function Page({ params }: IArticlePageProps) {
	const { slug } = await params

	const article = await getArticle(slug)

	return <ArticlePage article={article} />
}
