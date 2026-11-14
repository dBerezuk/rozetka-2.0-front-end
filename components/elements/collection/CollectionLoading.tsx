import { ProductCardLoading } from '@/components/elements/product-card/ProductCardLoading'

export function CollectionLoading() {
	return (
		<div role='status'>
			<span className='sr-only'>Loading products...</span>
			<ul
				aria-hidden='true'
				className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4'
			>
				{[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
					<li key={item}>
						<ProductCardLoading />
					</li>
				))}
			</ul>
		</div>
	)
}
