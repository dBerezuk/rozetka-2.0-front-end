import type { RefinementCtx } from 'zod'

import type { ICreateProductRequest } from '@/types/product.types'

type TProductRelations = Pick<
	Required<ICreateProductRequest>,
	'options' | 'variants' | 'images'
>

export function validateProductRelations(
	{ options, variants, images }: TProductRelations,
	context: RefinementCtx
) {
	if (new Set(options.map(option => option.title)).size !== options.length) {
		context.addIssue({
			code: 'custom',
			path: ['options', 'root'],
			message: 'Option names must be unique.'
		})
	}

	if (new Set(variants.map(variant => variant.sku)).size !== variants.length) {
		context.addIssue({
			code: 'custom',
			path: ['variants', 'root'],
			message: 'SKUs must be unique.'
		})
	}

	if (options.filter(option => option.isGallery).length > 1) {
		context.addIssue({
			code: 'custom',
			path: ['options', 'root'],
			message: 'Only one option can control the gallery.'
		})
	}

	const combinations = new Set<string>()

	variants.forEach((variant, index) => {
		const isValid =
			variant.optionValues.length === options.length &&
			options.every(
				option =>
					variant.optionValues.filter(
						selection =>
							selection.title === option.title &&
							option.values.some(item => item.value === selection.value)
					).length === 1
			)

		if (!isValid) {
			context.addIssue({
				code: 'custom',
				path: ['variants', index, 'optionValues', 'root'],
				message: 'Select one valid value for every option.'
			})
		}

		const key = JSON.stringify(
			variant.optionValues.map(item => [item.title, item.value]).sort()
		)

		if (combinations.has(key)) {
			context.addIssue({
				code: 'custom',
				path: ['variants', index, 'optionValues', 'root'],
				message: 'This option combination is already used.'
			})
		}

		combinations.add(key)
	})

	images.forEach((image, index) => {
		if (
			image.optionValue &&
			!options.some(
				option =>
					option.title === image.optionValue?.title &&
					option.values.some(item => item.value === image.optionValue?.value)
			)
		) {
			context.addIssue({
				code: 'custom',
				path: ['images', index, 'optionValue'],
				message: 'Choose an existing option value or all variants.'
			})
		}
	})
}
