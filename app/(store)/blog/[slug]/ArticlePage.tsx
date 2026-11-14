import { CalendarDays } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import type { IArticleDetails } from '@/types/article.types'
import { formatDate } from '@/utils/format-date.util'

interface IArticlePageProps {
	article: IArticleDetails
}

export function ArticlePage({ article }: IArticlePageProps) {
	return (
		<div className='mx-auto max-w-4xl space-y-5 py-2 sm:space-y-6'>
			<article className='space-y-6 sm:space-y-8'>
				<header className='mx-auto max-w-2xl space-y-3'>
					<div className='flex flex-wrap items-center gap-3 text-xs'>
						<Link
							href={pagesConfig.getBlogCategory(article.category.slug)}
							className='font-medium text-primary hover:underline'
						>
							{article.category.title}
						</Link>
						<time
							dateTime={article.createdAt}
							className='flex items-center gap-2 text-gray-500'
						>
							<CalendarDays size={14} aria-hidden='true' />
							{formatDate(article.createdAt)}
						</time>
					</div>
					<h1 className='text-2xl font-semibold leading-tight tracking-tight sm:text-3xl'>
						{article.title}
					</h1>
					<p className='text-base leading-7 text-gray-500'>
						{article.description}
					</p>
				</header>
				{article.imageFileName && (
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.articles,
							article.imageFileName
						)}
						alt={article.title}
						width={960}
						height={540}
						loading='eager'
						sizes='(max-width: 1023px) 100vw, 896px'
						className='h-56 w-full rounded-lg object-cover sm:h-80'
						unoptimized
					/>
				)}
				<div className='mx-auto max-w-2xl break-words whitespace-pre-wrap text-base leading-7 text-gray-950'>
					{article.content}
				</div>
			</article>
		</div>
	)
}
