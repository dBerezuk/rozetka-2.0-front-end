import { Store } from 'lucide-react'

import { StoreCatalog } from '@/app/(store)/stores/[slug]/StoreCatalog'
import type { IPaginatedResponse } from '@/types/api.types'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'

interface IStorePageProps {
	store: IStore
	products: IPaginatedResponse<IProduct>
}

export function StorePage({ store, products }: IStorePageProps) {
	return (
		<div className='space-y-8 py-6 sm:py-8'>
			<header className='rounded-xl bg-white p-5 sm:p-7'>
				<div className='flex items-center gap-4'>
					<div className='grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary'>
						<Store size={24} aria-hidden='true' />
					</div>
					<h1 className='min-w-0 text-2xl font-semibold tracking-tight break-words sm:text-3xl'>
						{store.title}
					</h1>
				</div>
				{store.description && (
					<p className='mt-4 max-w-3xl text-sm leading-relaxed wrap-break-word whitespace-pre-line text-gray-600'>
						{store.description}
					</p>
				)}
			</header>
			<section aria-labelledby='store-products' className='space-y-4'>
				<h2 id='store-products' className='text-xl font-semibold'>
					Products
				</h2>
				<StoreCatalog
					key={store.slug}
					slug={store.slug}
					initialProducts={products}
				/>
			</section>
		</div>
	)
}
