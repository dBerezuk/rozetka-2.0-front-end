'use client'

import { Field } from '@/components/ui/field/Field'
import type { IPriceRangeProps } from '@/components/ui/price-range/price-range.types'
import { RangeSlider } from '@/components/ui/price-range/RangeSlider'

export function PriceRange({
	min,
	max,
	value,
	onChange,
	isDisabled = false
}: IPriceRangeProps) {
	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-2'>
				<Field
					label='Minimum price'
					isLabelHidden
					type='number'
					min={min}
					max={max}
					step='0.01'
					value={value[0]}
					disabled={isDisabled}
					className='h-10 rounded-lg px-2 tabular-nums'
					onChange={event => onChange([Number(event.target.value), value[1]])}
				/>
				<span aria-hidden='true' className='text-gray-400'>
					—
				</span>
				<Field
					label='Maximum price'
					isLabelHidden
					type='number'
					min={min}
					max={max}
					step='0.01'
					value={value[1]}
					disabled={isDisabled}
					className='h-10 rounded-lg px-2 tabular-nums'
					onChange={event => onChange([value[0], Number(event.target.value)])}
				/>
			</div>
			<RangeSlider
				min={min}
				max={max}
				value={value}
				onChange={onChange}
				isDisabled={isDisabled}
			/>
		</div>
	)
}
