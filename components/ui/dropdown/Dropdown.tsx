'use client'

import type { IDropdownMenuProps } from '@/components/ui/dropdown/DropdownMenu'
import { DropdownMenu } from '@/components/ui/dropdown/DropdownMenu'
import type { TDropdownTriggerProps } from '@/components/ui/dropdown/DropdownTrigger'
import { DropdownTrigger } from '@/components/ui/dropdown/DropdownTrigger'
import { useDropdown } from '@/components/ui/dropdown/useDropdown'
import { cn } from '@/utils/cn.util'

interface IDropdownProps<TValue extends string> extends Pick<
	IDropdownMenuProps<TValue>,
	'onLoadMore' | 'isLoadingMore'
> {
	label: string
	options: IDropdownMenuProps<TValue>['options']
	value: TValue
	onChange: (value: TValue) => void
	variant?: TDropdownTriggerProps['variant']
	className?: string
	isField?: boolean
	disabled?: boolean
	error?: string
}

export function Dropdown<TValue extends string>({
	label,
	options,
	value,
	onChange,
	variant = 'outline',
	className,
	isField = false,
	disabled = false,
	error,
	...pagination
}: IDropdownProps<TValue>) {
	const {
		isOpen,
		onToggleDropdown,
		triggerRef,
		listId,
		onCloseDropdown,
		onBlurDropdown,
		onKeyDownDropdown
	} = useDropdown()

	const selectedLabel =
		options.find(option => option.value === value)?.label ?? 'Select an option'
	const errorId = listId + '-error'
	const triggerId = listId + '-trigger'
	const wrapperClassName = isField
		? 'min-w-0 flex-col text-gray-950'
		: 'items-center text-gray-700'

	return (
		<div
			className={cn('flex gap-2 text-sm', wrapperClassName)}
			onBlur={onBlurDropdown}
			onKeyDown={onKeyDownDropdown}
		>
			<label htmlFor={triggerId} className={cn(isField && 'font-medium')}>
				{label}
			</label>
			<div className={cn('relative', isField && 'min-w-0')}>
				<DropdownTrigger
					ref={triggerRef}
					label={label}
					listId={listId}
					isOpen={isOpen}
					isField={isField}
					variant={variant}
					error={error}
					disabled={disabled}
					onClick={onToggleDropdown}
					className={className}
				>
					{selectedLabel}
				</DropdownTrigger>
				<DropdownMenu
					{...pagination}
					id={listId}
					options={options}
					value={value}
					isOpen={isOpen && !disabled}
					isField={isField}
					onSelect={value => {
						onChange(value)

						onCloseDropdown()
					}}
				/>
			</div>
			{error && (
				<p id={errorId} role='alert' className='text-sm text-red-600'>
					{error}
				</p>
			)}
		</div>
	)
}
