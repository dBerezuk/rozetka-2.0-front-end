import { useQuery } from '@tanstack/react-query'

import { queryKeysConfig } from '@/config/query-keys.config'
import { storesService } from '@/services/stores.service'

export function useMyStores() {
	return useQuery({
		queryKey: queryKeysConfig.myStores,
		queryFn: () => storesService.getMyStores()
	})
}
