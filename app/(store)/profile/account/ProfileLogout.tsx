'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { authService } from '@/services/auth.service'

interface IProfileLogoutProps {
	isLoading?: boolean
}

export function ProfileLogout({ isLoading = false }: IProfileLogoutProps) {
	const router = useRouter()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.setQueryData(queryKeysConfig.profile, null)

			queryClient.removeQueries({ queryKey: queryKeysConfig.myStores })
			queryClient.removeQueries({ queryKey: queryKeysConfig.profileStores })
			queryClient.removeQueries({ queryKey: queryKeysConfig.storeProducts })
			queryClient.removeQueries({ queryKey: queryKeysConfig.sessions })
			queryClient.removeQueries({ queryKey: queryKeysConfig.admin })

			toast.success('Signed out successfully.')

			router.replace(pagesConfig.home)
		}
	})

	return (
		<Button
			variant='outline'
			isLoading={isLoading}
			disabled={mutation.isPending}
			onClick={() => mutation.mutate()}
		>
			<LogOut size={16} aria-hidden='true' />
			{mutation.isPending ? 'Signing out...' : 'Sign out'}
		</Button>
	)
}
