'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Section } from '@/components/ui/Section'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { usersService } from '@/services/users.service'

export function ProfileDeleteAccount() {
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const router = useRouter()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => usersService.deleteAccount(),
		onSuccess: () => {
			queryClient.setQueryData(queryKeysConfig.profile, null)

			queryClient.removeQueries({ queryKey: queryKeysConfig.profileStores })
			queryClient.removeQueries({ queryKey: queryKeysConfig.storeProducts })
			queryClient.removeQueries({ queryKey: queryKeysConfig.sessions })
			queryClient.removeQueries({ queryKey: queryKeysConfig.myStores })

			setIsConfirmOpen(false)

			toast.success('Your account has been deleted.')

			router.replace(pagesConfig.home)
		}
	})

	return (
		<Section
			title='Delete account'
			description='Permanently delete your account and profile data. This action cannot be undone.'
			isInline
			className='border-red-500/20'
		>
			<Button
				variant='danger'
				disabled={mutation.isPending}
				onClick={() => setIsConfirmOpen(true)}
			>
				<Trash2 size={16} aria-hidden='true' />
				Delete account
			</Button>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				title='Delete your account?'
				description="Your profile and cart will be permanently deleted, and you'll be signed out on all devices. Delete any stores you own first. This action cannot be undone."
				confirmLabel='Delete account'
				pendingLabel='Deleting...'
				variant='danger'
				isPending={mutation.isPending}
				onConfirm={() => mutation.mutate()}
				onClose={() => setIsConfirmOpen(false)}
			/>
		</Section>
	)
}
