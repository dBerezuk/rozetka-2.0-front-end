import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'

export default function NotFound() {
	return (
		<div className='space-y-4 py-16 text-center'>
			<h1 className='text-2xl font-semibold'>Page not found</h1>
			<p className='text-sm text-gray-500'>
				This article or category is no longer available.
			</p>
			<Button url={pagesConfig.blog}>Back to blog</Button>
		</div>
	)
}
