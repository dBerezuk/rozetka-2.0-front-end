import type { IProduct } from '@/types/product.types'

type TProductSpecificationsProps = Pick<IProduct, 'characteristics'>

export function ProductSpecifications({
	characteristics
}: TProductSpecificationsProps) {
	return (
		<section
			className='rounded-xl bg-white p-5 sm:p-6'
			aria-labelledby='product-specifications'
		>
			<h2 id='product-specifications' className='mb-4 text-xl font-semibold'>
				Specifications
			</h2>
			{characteristics.length ? (
				<dl className='divide-y divide-gray-100'>
					{characteristics.map(({ id, characteristic, value }) => (
						<div
							key={id}
							className='grid gap-1 py-3 text-sm sm:grid-cols-2 sm:gap-6'
						>
							<dt className='text-gray-500'>{characteristic.title}</dt>
							<dd className='min-w-0 break-words font-medium'>{value}</dd>
						</div>
					))}
				</dl>
			) : (
				<p className='text-sm text-gray-500'>No specifications available.</p>
			)}
		</section>
	)
}
