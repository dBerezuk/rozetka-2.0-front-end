import type { IProduct } from '@/types/product.types'

export function ProductDescription({
	description
}: Pick<IProduct, 'description'>) {
	return (
		<section
			className='space-y-3 rounded-xl bg-white p-5 sm:p-6'
			aria-labelledby='product-description'
		>
			<h2 id='product-description' className='text-lg font-semibold'>
				Description
			</h2>
			<p className='whitespace-pre-wrap text-sm leading-6 text-gray-600'>
				{description || 'No description available.'}
			</p>
		</section>
	)
}
