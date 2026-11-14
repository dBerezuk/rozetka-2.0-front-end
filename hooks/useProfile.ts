import { useQuery } from '@tanstack/react-query'

import { queryKeysConfig } from '@/config/query-keys.config'
import { usersService } from '@/services/users.service'

export function useProfile() {
	return useQuery({
		queryKey: queryKeysConfig.profile,
		queryFn: ({ signal }) => usersService.getProfile(signal)
	})
}
