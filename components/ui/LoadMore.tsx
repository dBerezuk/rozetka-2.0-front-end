'use client'

import type { UseInfiniteQueryResult } from '@tanstack/react-query'

import { Button } from '@/components/ui/button/Button'
import { useScroll } from '@/hooks/useScroll'

interface ILoadMoreProps {
	query: Pick<
		UseInfiniteQueryResult,
		'hasNextPage' | 'isFetching' | 'isError' | 'fetchNextPage' | 'refetch'
	>
}

export function LoadMore({ query }: ILoadMoreProps) {
	const onLoadMore = () =>
		void (query.hasNextPage
			? query.fetchNextPage({ cancelRefetch: false })
			: query.refetch({ cancelRefetch: false }))
	const { bottomRef } = useScroll<HTMLDivElement>({
		isEnabled: query.hasNextPage && !query.isFetching && !query.isError,
		onReachBottom: onLoadMore
	})

	return (
		(query.hasNextPage || query.isError) && (
			<div ref={bottomRef} className='flex flex-col items-center gap-3 py-4'>
				{query.isError ? (
					<>
						<p role='alert' className='text-sm text-gray-500'>
							Unable to load items. Please try again.
						</p>
						<Button
							variant='outline'
							disabled={query.isFetching}
							onClick={onLoadMore}
						>
							Try again
						</Button>
					</>
				) : (
					<p role='status' aria-live='polite' className='text-sm text-gray-500'>
						{query.isFetching ? 'Loading...' : 'Scroll to load more'}
					</p>
				)}
			</div>
		)
	)
}
