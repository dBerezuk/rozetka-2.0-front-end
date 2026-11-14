'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SubmitEvent, SyntheticEvent } from 'react'

import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { pagesConfig } from '@/config/pages.config'

export function HeaderSearch() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const initialQuery = searchParams.get('query') ?? ''

	const onSubmitSearch = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault()

		const query = String(new FormData(event.currentTarget).get('query') ?? '')

		router.replace(pagesConfig.getSearch(query))
	}

	const onResetSearch = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault()

		const input = event.currentTarget.elements.namedItem(
			'query'
		) as HTMLInputElement

		input.value = ''
	}

	return (
		<search aria-label='Product search'>
			<form
				action={pagesConfig.search}
				method='get'
				onSubmit={onSubmitSearch}
				onReset={onResetSearch}
				className='group flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-500 bg-gray-700 focus-within:border-primary pl-3 pr-1'
			>
				<Search
					size={20}
					aria-hidden='true'
					className='shrink-0 text-gray-400'
				/>
				<Field
					key={initialQuery}
					id='product-search'
					label='Search products'
					isLabelHidden
					variant='plain'
					name='query'
					defaultValue={initialQuery}
					type='search'
					placeholder='I am looking for...'
					wrapperClassName='flex-1'
					className='text-white placeholder:text-gray-400 focus-visible:ring-0 [&::-webkit-search-cancel-button]:appearance-none'
				/>
				<Button
					type='reset'
					variant='ghost'
					size='icon'
					aria-label='Clear search'
					className='-mr-2 size-9 text-gray-400 hover:text-white group-has-[input:placeholder-shown]:hidden'
				>
					<X size={16} aria-hidden='true' />
				</Button>
				<Button
					type='submit'
					size='small'
					className='focus-visible:outline-white sm:px-6'
				>
					Search
				</Button>
			</form>
		</search>
	)
}
