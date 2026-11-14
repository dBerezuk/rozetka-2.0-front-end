import type { ReactNode } from 'react'

import { getBlogCategories } from '@/app/(store)/blog/blog-data'
import { BlogSidebar } from '@/app/(store)/blog/BlogSidebar'

interface IBlogLayoutProps {
	children: ReactNode
}

export default async function BlogLayout({ children }: IBlogLayoutProps) {
	const categories = await getBlogCategories()

	return (
		<div className='grid flex-1 bg-secondary lg:grid-cols-[250px_minmax(0,1fr)]'>
			<BlogSidebar categories={categories} />
			<div className='min-w-0 rounded-t-2xl bg-white p-4 sm:p-6 lg:rounded-tr-none lg:p-8'>
				{children}
			</div>
		</div>
	)
}
