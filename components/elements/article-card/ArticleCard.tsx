import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import type { IArticleDetails } from '@/types/article.types'
import { formatDate } from '@/utils/format-date.util'

interface IArticleCardProps {
	article: IArticleDetails
	isImageEager?: boolean
}

export function ArticleCard({
	article,
	isImageEager = false
}: IArticleCardProps) {
	const url = pagesConfig.getArticle(article.slug)

	return (
		<article className='h-full'>
			<Link
				href={url}
				aria-label={`Read ${article.title}`}
				className='group relative flex aspect-[16/10] min-h-72 h-full items-end overflow-hidden rounded-xl bg-secondary text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary'
			>
				{article.imageFileName ? (
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.articles,
							article.imageFileName
						)}
						alt=''
						width={640}
						height={400}
						sizes='(max-width: 767px) 100vw, 50vw'
						loading={isImageEager ? 'eager' : 'lazy'}
						className='absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-[1.02]'
						unoptimized
					/>
				) : (
					<ImageOff
						size={36}
						aria-hidden='true'
						className='absolute top-1/4 left-1/2 -translate-x-1/2 text-gray-500'
					/>
				)}
				<div
					aria-hidden='true'
					className='absolute inset-0 bg-linear-to-t from-gray-950/95 via-gray-950/30 to-transparent'
				/>
				<div className='relative space-y-3 p-5 sm:p-7'>
					<div className='flex flex-wrap items-center gap-2 text-xs font-medium'>
						<span>{article.category.title}</span>
						<span
							aria-hidden='true'
							className='size-1 rounded-full bg-white/60'
						/>
						<time dateTime={article.createdAt}>
							{formatDate(article.createdAt)}
						</time>
					</div>
					<h2 className='text-xl font-semibold leading-snug'>
						{article.title}
					</h2>
				</div>
			</Link>
		</article>
	)
}
