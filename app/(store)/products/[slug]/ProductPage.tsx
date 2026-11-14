import { ProductDetails } from '@/app/(store)/products/[slug]/ProductDetails'
import { ProductsSection } from '@/components/elements/sessions/products/ProductsSection'
import type { IProduct, IProductDetails } from '@/types/product.types'

interface IProductPageProps {
	product: IProductDetails
	similarProducts: IProduct[]
}

export function ProductPage({ product, similarProducts }: IProductPageProps) {
	return (
		<div className='space-y-10'>
			<ProductDetails key={product.id} product={product} />
			<ProductsSection
				title='Similar products'
				products={similarProducts}
				emptyMessage='No similar products available yet.'
			/>
		</div>
	)
}
