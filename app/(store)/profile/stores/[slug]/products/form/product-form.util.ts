import type { TProductFormValues } from '@/schemas/product.schema'
import type { IProduct } from '@/types/product.types'

export function getProductFormValues(product?: IProduct): TProductFormValues {
	return {
		title: product?.title ?? '',
		description: product?.description ?? '',
		slug: product?.slug ?? '',
		categoryId: product?.categoryId ?? '',
		characteristics:
			product?.characteristics.map(({ characteristicId, value }) => ({
				characteristicId,
				value
			})) ?? [],
		options:
			product?.options.map(({ id, title, isGallery, values }) => ({
				id,
				title,
				isGallery,
				values: values.map(({ id, value }) => ({ id, value }))
			})) ?? [],
		variants: product?.variants.map(({ id, sku, price, optionValues }) => ({
			id,
			sku,
			price: Number(price),
			optionValues: optionValues.map(({ optionValue }) => ({
				title: optionValue.option.title,
				value: optionValue.value
			}))
		})) ?? [{ sku: '', price: 0, optionValues: [] }],
		images:
			product?.images.map(({ id, fileName, alt, optionValueId }) => {
				const option = product.options.find(item =>
					item.values.some(value => value.id === optionValueId)
				)
				const value = option?.values.find(item => item.id === optionValueId)

				return {
					id,
					fileName,
					alt: alt ?? '',
					optionValue:
						option && value ? { title: option.title, value: value.value } : null
				}
			}) ?? []
	}
}

export function getProductFormRequest(values: TProductFormValues) {
	return {
		...values,
		characteristics: values.characteristics.filter(item => item.value),
		options: values.options.map((option, position) => ({
			...option,
			position,
			values: option.values.map((value, position) => ({ ...value, position }))
		})),
		images: values.images.map((image, position) => ({ ...image, position }))
	}
}
