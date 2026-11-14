'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { queryKeysConfig } from '@/config/query-keys.config'

interface IAdminDeleteDialogProps {
	item: { id: string; title: string } | null
	onDelete: (id: string) => Promise<unknown>
	onClose: () => void
}

export function AdminDeleteDialog({
	item,
	onDelete,
	onClose
}: IAdminDeleteDialogProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: onDelete,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: queryKeysConfig.admin }),
				queryClient.invalidateQueries({ queryKey: queryKeysConfig.categories })
			])

			toast.success('Deleted successfully.')

			onClose()
		}
	})

	return (
		<ConfirmDialog
			isOpen={!!item}
			title='Delete item?'
			description={`Delete “${item?.title ?? ''}”? This action cannot be undone.`}
			confirmLabel='Delete'
			variant='danger'
			isPending={mutation.isPending}
			onConfirm={() => item && mutation.mutate(item.id)}
			onClose={onClose}
		/>
	)
}
