import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

import { ProductRatingStars } from '@/app/(store)/products/[slug]/ProductRatingStars'
import { Modal } from '@/components/elements/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { useProfile } from '@/hooks/useProfile'
import { productsService } from '@/services/products.service'
import type { IProduct } from '@/types/product.types'

interface IProductRatingDialogProps {
	productId: IProduct['id']
	onClose: () => void
}

export function ProductRatingDialog({
	productId,
	onClose
}: IProductRatingDialogProps) {
	const router = useRouter()
	const queryClient = useQueryClient()
	const {
		data: user,
		isPending: isUserPending,
		isError: isUserError
	} = useProfile()
	const queryKey = queryKeysConfig.getMyProductRating(productId, user?.id)
	const rating = useQuery({
		queryKey,
		queryFn: ({ signal }) => productsService.getMyRating(productId, signal),
		enabled: Boolean(user)
	})
	const { mutate, isPending } = useMutation({
		mutationFn: (score: number) =>
			productsService.setMyRating(productId, score),
		onMutate: () => queryClient.cancelQueries({ queryKey }),
		onSuccess: savedRating => {
			queryClient.setQueryData(queryKey, savedRating)
			router.refresh()
			onClose()
		}
	})

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		mutate(Number(new FormData(event.currentTarget).get('score')))
	}

	return (
		<Modal
			isOpen
			title='Rate this product'
			isBusy={isPending}
			onClose={onClose}
		>
			{isUserError || rating.isError ? (
				<p role='alert'>Unable to load your rating. Please try again.</p>
			) : isUserPending || (user && rating.isPending) ? (
				<p role='status'>Loading…</p>
			) : user ? (
				<form onSubmit={onSubmit} className='flex flex-col items-center gap-4'>
					<ProductRatingStars
						savedScore={rating.data?.score ?? null}
						isDisabled={isPending}
					/>
					<Button type='submit' disabled={isPending}>
						{isPending ? 'Saving…' : 'Save rating'}
					</Button>
				</form>
			) : (
				<Button url={pagesConfig.login} onClick={onClose}>
					Sign in to rate this product
				</Button>
			)}
		</Modal>
	)
}
