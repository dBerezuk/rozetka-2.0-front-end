import { z } from 'zod'

export const productSelectionSchema = z.object({
	title: z.string().trim().min(1, 'Enter an option name.').max(100),
	value: z.string().trim().min(1, 'Select a value.').max(100)
})

export const productOptionSchema = z.object({
	id: z.string().optional(),
	title: productSelectionSchema.shape.title,
	isGallery: z.boolean(),
	values: z
		.array(
			z.object({
				id: z.string().optional(),
				value: productSelectionSchema.shape.value
			})
		)
		.min(1, 'Add at least one value.')
		.refine(
			values => new Set(values.map(item => item.value)).size === values.length,
			'Option values must be unique.'
		)
})

export const productVariantSchema = z.object({
	id: z.string().optional(),
	sku: z.string().trim().min(1, 'Enter a SKU.').max(100),
	price: z
		.number({ error: 'Enter a price.' })
		.min(0)
		.max(9999999999.99)
		.refine(
			price => Math.abs(price * 100 - Math.round(price * 100)) < 0.0001,
			'Use no more than two decimal places.'
		),
	optionValues: z.array(productSelectionSchema)
})
