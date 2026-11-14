import { z } from 'zod'

import { SLUG_REGEX } from '@/constants/regex.constants'
import {
	productOptionSchema,
	productSelectionSchema,
	productVariantSchema
} from '@/schemas/product-option.schema'
import { validateProductRelations } from '@/schemas/product-relations.schema'

export const productSchema = z
	.object({
		title: z.string().trim().min(1, 'Enter a product name.').max(200),
		description: z.string().trim().min(1, 'Describe your product.').max(10000),
		slug: z
			.string()
			.trim()
			.toLowerCase()
			.min(1, 'Enter a product address.')
			.max(200)
			.regex(SLUG_REGEX, 'Use lowercase letters, numbers and single hyphens.'),
		categoryId: z.string().min(1, 'Choose a category.'),
		characteristics: z.array(
			z.object({
				characteristicId: z.string().min(1),
				value: z.string().trim().max(1000)
			})
		),
		options: z.array(productOptionSchema),
		variants: z
			.array(productVariantSchema)
			.min(1, 'Add at least one variant with a price.'),
		images: z.array(
			z.object({
				id: z.string().optional(),
				fileName: z.string().min(1),
				alt: z.string().trim().max(300),
				optionValue: productSelectionSchema.nullable()
			})
		)
	})
	.superRefine(validateProductRelations)

export const productImageSchema = z
	.file()
	.max(5 * 1024 * 1024, 'Image must not exceed 5 MB.')
	.mime(
		['image/jpeg', 'image/png', 'image/webp'],
		'Choose a JPEG, PNG or WebP image.'
	)

export type TProductFormValues = z.infer<typeof productSchema>
