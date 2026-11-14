import { Check } from 'lucide-react'

interface IDropdownOptionProps {
	label: string
	isSelected: boolean
	onSelect: () => void
}

export function DropdownOption({
	label,
	isSelected,
	onSelect
}: IDropdownOptionProps) {
	return (
		<li>
			<button
				type='button'
				aria-pressed={isSelected}
				onClick={onSelect}
				className='flex min-h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1 text-left break-words hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-primary aria-pressed:text-green-600'
			>
				{label}
				{isSelected && (
					<Check aria-hidden='true' size={14} className='shrink-0' />
				)}
			</button>
		</li>
	)
}
