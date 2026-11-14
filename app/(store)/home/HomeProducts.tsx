import { useQuery } from '@tanstack/react-query'

import { ProductsSection } from '@/components/elements/sessions/products/ProductsSection'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { productsService } from '@/services/products.service'
import type { IPaginatedResponse } from '@/types/api.types'
import type { ICategory } from '@/types/category.types'
import type { IProduct } from '@/types/product.types'

interface IHomeProductsProps {
	category?: ICategory
	products?: IPaginatedResponse<IProduct>
}

export function HomeProducts({ category, products }: IHomeProductsProps) {
	const { data, isPending } = useQuery({
		queryKey: queryKeysConfig.getHomeProducts(category?.slug),
		initialData: products,
		queryFn: ({ signal }) =>
			productsService.getAll(
				{ sort: 'newest', take: 8, categorySlug: category?.slug },
				signal
			)
	})

	return (
		<ProductsSection
			id={category ? undefined : 'new-arrivals'}
			title={category ? `New in ${category.title}` : 'New arrivals'}
			products={data?.data}
			isLoading={isPending}
			url={
				category ? pagesConfig.getCategoryProducts(category.slug) : undefined
			}
			emptyMessage='New products are on their way. Check back soon.'
		/>
	)
}
