'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button/Button'
import { Checkbox } from '@/components/ui/Checkbox'

interface IFilterOptionsProps {
	options: { value: string; label: string }[]
	selected: string[]
	onChange: (values: string[]) => void
	isSingle?: boolean
}

const VISIBLE_OPTIONS = 5

export function FilterOptions({
	options,
	selected,
	onChange,
	isSingle = false
}: IFilterOptionsProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const visible = isExpanded ? options : options.slice(0, VISIBLE_OPTIONS)

	return (
		<div className='space-y-1'>
			{visible.map(option => (
				<Checkbox
					key={option.value}
					label={option.label}
					checked={selected.includes(option.value)}
					onChange={event =>
						onChange(
							event.target.checked
								? isSingle
									? [option.value]
									: [...selected, option.value]
								: selected.filter(value => value !== option.value)
						)
					}
				/>
			))}
			{options.length > VISIBLE_OPTIONS && (
				<Button
					variant='plain'
					size='small'
					className='mt-2 h-auto px-0 text-primary'
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? 'Show less' : `Show all (${options.length})`}
				</Button>
			)}
		</div>
	)
}
