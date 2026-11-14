import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'

export default function NotFound() {
	return (
		<div className='space-y-4 px-4 py-16 text-center'>
			<h1 className='text-2xl font-semibold'>Category not found</h1>
			<Button url={pagesConfig.home}>Continue shopping</Button>
		</div>
	)
}
