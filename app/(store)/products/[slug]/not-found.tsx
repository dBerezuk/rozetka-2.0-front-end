import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'

export default function ProductNotFound() {
	return (
		<div className='my-6 space-y-4 rounded-xl bg-white p-8 text-center sm:my-8'>
			<h1 className='text-2xl font-semibold'>Product not found</h1>
			<p className='text-sm text-gray-500'>
				This product may have been removed.
			</p>
			<Button url={pagesConfig.home}>Continue shopping</Button>
		</div>
	)
}
