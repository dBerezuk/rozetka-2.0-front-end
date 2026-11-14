'use client'

import '@/components/ui/price-range/price-range.css'
import type { IPriceRangeProps } from '@/components/ui/price-range/price-range.types'

export function RangeSlider({
	min,
	max,
	value,
	onChange,
	isDisabled = false
}: IPriceRangeProps) {
	const lower = Math.max(min, Math.min(max, value[0]))
	const upper = Math.max(lower, Math.min(max, value[1]))
	const distance = max - min
	const start = distance ? ((lower - min) / distance) * 100 : 0
	const end = distance ? ((upper - min) / distance) * 100 : 100
	const isInactive = isDisabled || distance <= 0

	return (
		<div className='relative mx-2 h-7'>
			<div className='absolute top-3 right-0 left-0 h-1 rounded bg-gray-100'>
				<div
					className='absolute h-full rounded bg-primary'
					style={{ left: `${start}%`, right: `${100 - end}%` }}
				/>
			</div>
			<input
				type='range'
				aria-label='Minimum price'
				aria-valuemax={upper}
				min={min}
				max={max}
				step='0.01'
				value={lower}
				disabled={isInactive}
				onChange={event =>
					onChange([Math.min(Number(event.target.value), upper), upper])
				}
				className='price-range-input'
				style={{ zIndex: lower === max ? 3 : 1 }}
			/>
			<input
				type='range'
				aria-label='Maximum price'
				aria-valuemin={lower}
				min={min}
				max={max}
				step='0.01'
				value={upper}
				disabled={isInactive}
				onChange={event =>
					onChange([lower, Math.max(lower, Number(event.target.value))])
				}
				className='price-range-input'
				style={{ zIndex: 2 }}
			/>
		</div>
	)
}
