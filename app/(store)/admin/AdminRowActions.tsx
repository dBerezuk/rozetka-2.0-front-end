import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'

interface IAdminRowActionsProps {
	title: string
	onEdit: () => void
	onDelete: () => void
}

export function AdminRowActions({
	title,
	onEdit,
	onDelete
}: IAdminRowActionsProps) {
	return (
		<div className='flex justify-end gap-1'>
			<Button
				variant='ghost'
				size='icon'
				className='size-9 rounded-lg'
				aria-label={`Edit ${title}`}
				onClick={onEdit}
			>
				<Pencil size={16} aria-hidden='true' />
			</Button>
			<Button
				variant='ghost'
				size='icon'
				className='size-9 rounded-lg text-red-500'
				aria-label={`Delete ${title}`}
				onClick={onDelete}
			>
				<Trash2 size={16} aria-hidden='true' />
			</Button>
		</div>
	)
}
