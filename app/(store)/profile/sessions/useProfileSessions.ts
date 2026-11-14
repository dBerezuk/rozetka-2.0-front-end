import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { sessionsService } from '@/services/sessions.service'
import type { IUserSession } from '@/types/session.types'

export function useProfileSessions() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: queryKeysConfig.sessions,
		queryFn: () => sessionsService.getAll()
	})

	const mutation = useMutation({
		mutationFn: (session: IUserSession) => sessionsService.delete(session.id),
		onSuccess: async (_, session) => {
			toast.success(
				session.isCurrent
					? 'Signed out successfully.'
					: 'Session ended successfully.'
			)

			if (session.isCurrent) {
				queryClient.setQueryData(queryKeysConfig.profile, null)

				queryClient.removeQueries({ queryKey: queryKeysConfig.myStores })
				queryClient.removeQueries({ queryKey: queryKeysConfig.profileStores })
				queryClient.removeQueries({ queryKey: queryKeysConfig.storeProducts })
				queryClient.removeQueries({ queryKey: queryKeysConfig.sessions })

				router.replace(pagesConfig.login)

				return
			}

			await queryClient.invalidateQueries({
				queryKey: queryKeysConfig.sessions
			})
		}
	})

	return {
		...query,
		onEndSession: mutation.mutate,
		isEndingSession: mutation.isPending,
		endingSessionId: mutation.variables?.id
	}
}
