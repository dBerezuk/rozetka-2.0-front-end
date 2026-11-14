'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'jotai'
import { useState } from 'react'
import type { PropsWithChildren } from 'react'

export function QueryProvider({ children }: PropsWithChildren) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: { staleTime: 60 * 1000 }
				}
			})
	)

	return (
		<Provider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	)
}
