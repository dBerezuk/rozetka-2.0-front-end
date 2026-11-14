import {
	useIsMutating,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { useProfile } from '@/hooks/useProfile'
import { usersService } from '@/services/users.service'
import type { IProduct } from '@/types/product.types'

export function useFavoriteButton(productId: IProduct['id']) {
	const isHydrated = useIsHydrated()
	const router = useRouter()
	const queryClient = useQueryClient()

	const {
		data: profile,
		isPending: isProfilePending,
		isError: isProfileError
	} = useProfile()

	const queryKey = queryKeysConfig.profile
	const mutationKey = queryKeysConfig.getFavoriteMutation(
		profile?.id,
		productId
	)

	const isMutating = useIsMutating({ mutationKey }) > 0
	const isFavorite = Boolean(
		isHydrated && profile?.favorites.some(product => product.id === productId)
	)

	const mutation = useMutation({
		mutationKey,
		scope: { id: `favorites-${profile?.id}` },
		mutationFn: (isFavorite: boolean) =>
			usersService.setFavorite(productId, isFavorite),
		onMutate: () => queryClient.cancelQueries({ queryKey }),
		onSuccess: updatedProfile => {
			queryClient.setQueryData(queryKey, updatedProfile)
		}
	})

	const onToggleFavorite = () => {
		if (!profile) {
			router.push(pagesConfig.login)

			return
		}

		if (!queryClient.isMutating({ mutationKey })) {
			mutation.mutate(!isFavorite)
		}
	}

	return {
		isFavorite,
		isPending: isHydrated && (mutation.isPending || isMutating),
		isDisabled: !isHydrated || isProfilePending || isProfileError,
		onToggleFavorite
	}
}
