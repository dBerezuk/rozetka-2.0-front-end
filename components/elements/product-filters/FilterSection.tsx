import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface IFilterSectionProps {
	title: string
	children: ReactNode
}

export function FilterSection({ title, children }: IFilterSectionProps) {
	return (
		<details
			open
			className='group border-t border-gray-100 py-4 first:border-0 first:pt-0 last:pb-0'
		>
			<summary className='flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium [&::-webkit-details-marker]:hidden'>
				{title}
				<ChevronDown
					size={16}
					aria-hidden='true'
					className='shrink-0 text-gray-400 transition-transform group-open:rotate-180'
				/>
			</summary>
			<div className='mt-4'>{children}</div>
		</details>
	)
}
