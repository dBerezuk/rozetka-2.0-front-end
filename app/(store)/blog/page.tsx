import type { Metadata } from 'next'

import { BLOG_PAGE_SIZE } from '@/app/(store)/blog/blog.constants'
import { BlogPage } from '@/app/(store)/blog/BlogPage'
import { pagesConfig } from '@/config/pages.config'
import { defaultOpenGraph } from '@/config/seo.config'
import { articlesService } from '@/services/articles.service'

export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Discover buying guides, product insights and useful tips from Rozetka.',
	alternates: { canonical: pagesConfig.blog },
	openGraph: { ...defaultOpenGraph, url: pagesConfig.blog }
}

export const dynamic = 'force-dynamic'

async function getBlogPageData() {
	return articlesService.getAll({ take: BLOG_PAGE_SIZE })
}

export default async function Page() {
	const articles = await getBlogPageData()

	return <BlogPage articles={articles} />
}
