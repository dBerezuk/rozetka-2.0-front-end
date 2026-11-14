import { DropdownOption } from '@/components/ui/dropdown/DropdownOption'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@/utils/cn.util'

export interface IDropdownMenuProps<TValue extends string> {
	id: string
	options: readonly { value: TValue; label: string }[]
	value: TValue
	isOpen: boolean
	isField: boolean
	onSelect: (value: TValue) => void
	onLoadMore?: () => void
	isLoadingMore?: boolean
}

export function DropdownMenu<TValue extends string>({
	id,
	options,
	value,
	isOpen,
	isField,
	onSelect,
	onLoadMore,
	isLoadingMore = false
}: IDropdownMenuProps<TValue>) {
	const { onScroll } = useScroll<HTMLUListElement>({
		isEnabled: isOpen && !isLoadingMore,
		onReachBottom: onLoadMore
	})

	return (
		<ul
			id={id}
			inert={!isOpen}
			aria-busy={isLoadingMore}
			onScroll={onScroll}
			className={cn(
				'absolute top-full right-0 z-20 mt-1 max-h-56 min-w-full overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg motion-safe:transition-[opacity,translate] motion-safe:duration-200 motion-safe:ease-out',
				isField && 'w-full',
				!isOpen && 'pointer-events-none opacity-0 motion-safe:-translate-y-1'
			)}
		>
			{options.map((option, index) => (
				<DropdownOption
					key={index}
					label={option.label}
					isSelected={option.value === value}
					onSelect={() => onSelect(option.value)}
				/>
			))}
			{isLoadingMore && (
				<li role='status' className='px-2 py-3 text-sm text-gray-500'>
					Loading...
				</li>
			)}
		</ul>
	)
}
