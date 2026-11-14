'use client'

import { Button } from '@/components/ui/button/Button'

interface IProductErrorProps {
	reset: () => void
}

export default function ProductError({ reset }: IProductErrorProps) {
	return (
		<div
			role='alert'
			className='my-6 space-y-4 rounded-xl bg-white p-8 text-center sm:my-8'
		>
			<h1 className='text-2xl font-semibold'>Unable to load product</h1>
			<p className='text-sm text-gray-500'>Please try again.</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	)
}
