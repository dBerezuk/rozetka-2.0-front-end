import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { queryKeysConfig } from '@/config/query-keys.config'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { storesService } from '@/services/stores.service'
import type { IStore } from '@/types/store.types'

export function useProfileStore() {
	const isHydrated = useIsHydrated()

	const { slug = '' } = useParams<Partial<Pick<IStore, 'slug'>>>()

	const query = useQuery({
		queryKey: queryKeysConfig.getProfileStore(slug),
		queryFn: () => storesService.getMyStoreBySlug(slug),
		enabled: !!slug
	})

	return {
		...query,
		data: isHydrated ? query.data : undefined,
		isPending: !isHydrated || query.isPending
	}
}
