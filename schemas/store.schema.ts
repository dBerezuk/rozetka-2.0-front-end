import { z } from 'zod'

import { SLUG_REGEX } from '@/constants/regex.constants'

export const createStoreSchema = z.object({
	title: z.string().trim().min(1, 'Enter your store name.').max(200, 'Use no more than 200 characters.'),
	description: z.string().trim().min(1, 'Describe your store.').max(5000, 'Use no more than 5000 characters.'),
	slug: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, 'Enter your store address.')
		.max(200, 'Use no more than 200 characters.')
		.regex(SLUG_REGEX, 'Use lowercase letters, numbers and single hyphens.')
})

export type TCreateStoreValues = z.infer<typeof createStoreSchema>
