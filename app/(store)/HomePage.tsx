'use client'

import { useQuery } from '@tanstack/react-query'

import { HomeHero } from '@/app/(store)/home/hero/HomeHero'
import { getHomeCategories } from '@/app/(store)/home/home-category.util'
import { HomeAbout } from '@/app/(store)/home/HomeAbout'
import { HomeProducts } from '@/app/(store)/home/HomeProducts'
import { LinksSection } from '@/components/elements/sessions/links/LinksSection'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { HOME_SIDEBAR_SECTIONS } from '@/components/layout/sidebar/sidebar.data'
import type { ISidebarSection } from '@/components/layout/sidebar/sidebar.types'
import { mediaConfig } from '@/config/media.config'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { categoriesService } from '@/services/categories.service'
import type { IPaginatedResponse } from '@/types/api.types'
import type { ICategory, ICategoryListItem } from '@/types/category.types'
import type { IProduct } from '@/types/product.types'

interface IHomePageProps {
	categories: IPaginatedResponse<ICategoryListItem>
	products: IPaginatedResponse<IProduct>
	categoryProducts: Record<ICategory['slug'], IPaginatedResponse<IProduct>>
}

export function HomePage({
	categories,
	products,
	categoryProducts
}: IHomePageProps) {
	const { data, isLoading } = useQuery({
		queryKey: queryKeysConfig.categories,
		queryFn: () => categoriesService.getAll(),
		placeholderData: categories
	})

	const currentCategories = (data ?? categories).data
	const featuredCategories = getHomeCategories(currentCategories)

	const categoryLinks = currentCategories.map(category => ({
		label: category.title,
		url: pagesConfig.getCategoryProducts(category.slug),
		iconPathName: category.iconPathName,
		iconUrl: category.iconPathName
			? mediaConfig.getUrl(category.iconPathName)
			: undefined,
		imageUrl: category.imageFileName
			? mediaConfig.getFileUrl(
					mediaConfig.folders.categories,
					category.imageFileName
				)
			: undefined
	}))

	const sections: ISidebarSection[] = [
		{
			label: 'Categories',
			isLabelHidden: true,
			links: categoryLinks
		},
		...HOME_SIDEBAR_SECTIONS
	]

	return (
		<div className='grid flex-1 grid-cols-1 bg-secondary lg:grid-cols-[280px_minmax(0,1fr)]'>
			<Sidebar
				sections={sections}
				isLoading={isLoading}
				emptyMessage='No categories available.'
				label='Product categories and information'
			/>
			<div className='min-w-0 space-y-8 bg-bg p-4 sm:p-6 lg:rounded-tl-2xl lg:p-8'>
				<HomeHero categories={featuredCategories} />
				<LinksSection
					label='Explore categories'
					links={categoryLinks.slice(0, 4)}
				/>
				<HomeProducts products={products} />
				{featuredCategories.slice(0, 2).map(category => (
					<HomeProducts
						key={category.id}
						category={category}
						products={categoryProducts[category.slug]}
					/>
				))}
				<HomeAbout />
			</div>
		</div>
	)
}
