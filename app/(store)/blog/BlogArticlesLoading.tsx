import { ArticleCardLoading } from '@/components/elements/article-card/ArticleCardLoading'

export function BlogArticlesLoading() {
	return (
		<div
			role='status'
			aria-label='Loading articles'
			className='grid gap-6 md:grid-cols-2'
		>
			{[0, 1].map(item => (
				<ArticleCardLoading key={item} />
			))}
		</div>
	)
}
