import { unstable_cache } from 'next/cache'
import { cache } from 'react'

import { articlesService } from '@/services/articles.service'
import { blogCategoriesService } from '@/services/blog-categories.service'
import type { IArticle } from '@/types/article.types'
import type { IBlogCategory } from '@/types/blog-category.types'
import { handleNotFound } from '@/utils/handle-not-found.util'

export const getArticle = cache((slug: IArticle['slug']) =>
	articlesService.getBySlug(slug).catch(handleNotFound)
)

export const getBlogCategory = cache((slug: IBlogCategory['slug']) =>
	blogCategoriesService.getBySlug(slug).catch(handleNotFound)
)

export const getBlogCategories = unstable_cache(
	() => blogCategoriesService.getAllForSidebar(),
	['blog-sidebar-categories'],
	{ revalidate: 60 }
)
