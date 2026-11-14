'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { BLOG_PAGE_SIZE } from '@/app/(store)/blog/blog.constants'
import { BlogArticlesLoading } from '@/app/(store)/blog/BlogArticlesLoading'
import { ArticleCard } from '@/components/elements/article-card/ArticleCard'
import { PageContent } from '@/components/layout/PageContent'
import { LoadMore } from '@/components/ui/LoadMore'
import { queryKeysConfig } from '@/config/query-keys.config'
import { articlesService } from '@/services/articles.service'
import type { IPaginatedResponse } from '@/types/api.types'
import type { IArticleDetails } from '@/types/article.types'
import type { IBlogCategory } from '@/types/blog-category.types'

interface IBlogPageProps {
	articles: IPaginatedResponse<IArticleDetails>
	category?: IBlogCategory
}

export function BlogPage({ articles, category }: IBlogPageProps) {
	const query = useInfiniteQuery({
		queryKey: queryKeysConfig.getBlogArticles(category?.slug),
		queryFn: ({ pageParam, signal }) =>
			articlesService.getAll(
				{ skip: pageParam, take: BLOG_PAGE_SIZE, categorySlug: category?.slug },
				signal
			),
		initialPageParam: 0,
		initialData: { pages: [articles], pageParams: [0] },
		getNextPageParam: (last, pages) =>
			last.more
				? pages.reduce((count, page) => count + page.data.length, 0)
				: undefined
	})

	const items = query.data.pages.flatMap(page => page.data)

	return (
		<PageContent
			title={category?.title ?? 'Blog'}
			description={
				category?.description ??
				'Buying guides, product insights and useful tips for your next purchase.'
			}
		>
			{items.length ? (
				<div className='grid gap-6 md:grid-cols-2'>
					{items.map((article, index) => (
						<ArticleCard
							key={article.id}
							article={article}
							isImageEager={index < 3}
						/>
					))}
				</div>
			) : (
				<p
					role='status'
					className='rounded-xl bg-white px-6 py-12 text-center text-gray-500'
				>
					No articles published yet.
				</p>
			)}
			{query.isFetchingNextPage && <BlogArticlesLoading />}
			<LoadMore query={query} />
		</PageContent>
	)
}
