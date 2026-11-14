import { z } from 'zod'

import { SLUG_REGEX } from '@/constants/regex.constants'

const title = z.string().trim().min(1, 'Enter a title.').max(200)

const slug = z
	.string()
	.trim()
	.toLowerCase()
	.min(1, 'Enter an address.')
	.max(200)
	.regex(SLUG_REGEX, 'Use lowercase letters, numbers and single hyphens.')

const description = z.string().trim().min(1, 'Enter a description.').max(5000)

export const adminCategorySchema = z.object({
	title,
	slug,
	parentId: z.string(),
	imageFileName: z.string().nullable(),
	iconPathName: z.string().trim().max(500)
})

export const adminCharacteristicSchema = z.object({
	title,
	isSorting: z.boolean()
})

export const adminBlogCategorySchema = z.object({ title, slug, description })

export const adminArticleSchema = z.object({
	title,
	slug,
	description,
	content: z.string().min(1, 'Enter article content.'),
	categoryId: z.string().min(1, 'Choose a category.'),
	published: z.boolean(),
	imageFileName: z.string().nullable()
})

export type TAdminArticleValues = z.infer<typeof adminArticleSchema>
