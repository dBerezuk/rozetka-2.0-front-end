'use client'

import { Button } from '@/components/ui/button/Button'

interface ICategoryErrorProps {
	reset: () => void
}

export default function CategoryError({ reset }: ICategoryErrorProps) {
	return (
		<div
			role='alert'
			className='my-8 space-y-4 rounded-xl bg-white p-8 text-center'
		>
			<h1 className='text-2xl font-semibold'>Unable to load category</h1>
			<p className='text-sm text-gray-500'>Please try again.</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	)
}
