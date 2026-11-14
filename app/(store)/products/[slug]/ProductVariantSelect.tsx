import { Dropdown } from '@/components/ui/dropdown/Dropdown'
import type { IProductVariant } from '@/types/product-variant.types'
import type { IProduct } from '@/types/product.types'
import { formatPrice } from '@/utils/format-price.util'

interface IProductVariantSelectProps extends Pick<IProduct, 'variants'> {
	variantId?: IProductVariant['id']
	onChangeVariant: (variantId: IProductVariant['id']) => void
}

export function ProductVariantSelect({
	variants,
	variantId,
	onChangeVariant
}: IProductVariantSelectProps) {
	const options = variants.map(variant => {
		const title =
			variant.optionValues
				.map(
					({ optionValue }) =>
						`${optionValue.option.title}: ${optionValue.value}`
				)
				.join(' / ') || variant.sku

		return {
			value: variant.id,
			label: `${title} — ${formatPrice(Number(variant.price))}`
		}
	})

	return (
		<Dropdown
			label='Choose a variant'
			options={options}
			value={variantId ?? ''}
			onChange={onChangeVariant}
			isField
		/>
	)
}
