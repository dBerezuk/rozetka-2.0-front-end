import type { Metadata } from 'next'

import { getBlogCategory } from '@/app/(store)/blog/blog-data'
import { BLOG_PAGE_SIZE } from '@/app/(store)/blog/blog.constants'
import { BlogPage } from '@/app/(store)/blog/BlogPage'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { articlesService } from '@/services/articles.service'
import { blogCategoriesService } from '@/services/blog-categories.service'
import type { IBlogCategory } from '@/types/blog-category.types'
import { getStaticSlugParams } from '@/utils/get-static-slug-params.util'

interface IBlogCategoryPageProps {
	params: Promise<Pick<IBlogCategory, 'slug'>>
}

export const dynamic = 'force-static'
export const dynamicParams = true

export function generateStaticParams() {
	return getStaticSlugParams('/blog/category/[slug]', query =>
		blogCategoriesService.getAll(query)
	)
}

export async function generateMetadata({
	params
}: IBlogCategoryPageProps): Promise<Metadata> {
	const { slug } = await params

	const category = await getBlogCategory(slug)

	const url = pagesConfig.getBlogCategory(category.slug)

	return {
		title: category.title,
		description: category.description,
		alternates: { canonical: url },
		openGraph: { ...defaultOpenGraph, url }
	}
}

async function getBlogCategoryPageData(slug: IBlogCategory['slug']) {
	const category = await getBlogCategory(slug)

	const articles = await articlesService.getAll({
		categorySlug: slug,
		take: BLOG_PAGE_SIZE
	})

	return { category, articles }
}

export default async function Page({ params }: IBlogCategoryPageProps) {
	const { slug } = await params

	const { category, articles } = await getBlogCategoryPageData(slug)

	return <BlogPage category={category} articles={articles} />
}
