'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button/Button'
import type { TPriceRange } from '@/components/ui/price-range/price-range.types'
import { PriceRange } from '@/components/ui/price-range/PriceRange'
import type { IProductQuery } from '@/types/product-query.types'

interface IPriceFilterProps {
	min: number
	max: number
	query: IProductQuery
	onChange: (query: IProductQuery) => void
}

export function PriceFilter({ min, max, query, onChange }: IPriceFilterProps) {
	const minimum = query.minPrice ?? min
	const maximum = query.maxPrice ?? max
	const [value, setValue] = useState<TPriceRange>([minimum, maximum])

	const isInvalid =
		!value.every(Number.isFinite) ||
		value[0] < min ||
		value[1] > max ||
		value[0] > value[1]
	const isChanged = value[0] !== minimum || value[1] !== maximum

	return (
		<form
			className='space-y-3'
			onSubmit={event => {
				event.preventDefault()

				if (!isInvalid) {
					onChange({
						...query,
						minPrice: value[0] === min ? undefined : value[0],
						maxPrice: value[1] === max ? undefined : value[1]
					})
				}
			}}
		>
			<PriceRange
				min={min}
				max={max}
				value={value}
				onChange={setValue}
				isDisabled={min === max}
			/>
			{isInvalid && (
				<p role='alert' className='text-xs text-red-600'>
					Enter a valid price range.
				</p>
			)}
			<Button
				type='submit'
				size='small'
				className='w-full rounded-lg'
				disabled={isInvalid || !isChanged}
			>
				Apply price
			</Button>
		</form>
	)
}
