import { Star } from 'lucide-react'
import { useState } from 'react'

import { ProductRatingDialog } from '@/app/(store)/products/[slug]/ProductRatingDialog'
import { Button } from '@/components/ui/button/Button'
import type { IProductDetails } from '@/types/product.types'

interface IProductRatingsProps {
	product: Pick<IProductDetails, 'id' | 'ratings'>
}

const RATING_SCORES = [5, 4, 3, 2, 1]

export function ProductRatings({ product }: IProductRatingsProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const { ratings } = product
	const total = ratings.length
	const average = total
		? ratings.reduce((sum, rating) => sum + rating.score, 0) / total
		: 0

	const distribution = RATING_SCORES.map(score => {
		const count = ratings.filter(rating => rating.score === score).length

		return { score, percentage: total ? (count / total) * 100 : 0 }
	})

	return (
		<section className='grid gap-5 rounded-xl bg-white p-5 sm:grid-cols-2 sm:p-6'>
			<div className='space-y-3'>
				<h2 className='font-semibold text-gray-950'>Product ratings</h2>
				<p
					className='flex items-center gap-2 text-sm text-gray-600'
					aria-live='polite'
				>
					<Star
						size={18}
						aria-hidden='true'
						className='fill-amber-500 stroke-none'
					/>
					{total ? (
						<>
							<span className='font-semibold text-gray-950'>
								{average.toFixed(1)} / 5
							</span>
							<span>
								({total} {total === 1 ? 'rating' : 'ratings'})
							</span>
						</>
					) : (
						'No ratings yet'
					)}
				</p>
				<Button
					size='small'
					variant='outline'
					aria-haspopup='dialog'
					onClick={() => setIsDialogOpen(true)}
				>
					Rate this product
				</Button>
			</div>
			<ul
				className='space-y-2 self-center text-xs text-gray-600'
				aria-label='Rating distribution'
			>
				{distribution.map(({ score, percentage }) => (
					<li key={score} className='flex items-center gap-2'>
						<span className='w-10 shrink-0'>
							{score} {score === 1 ? 'star' : 'stars'}
						</span>
						<span
							className='h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100'
							aria-hidden='true'
						>
							<span
								className='block h-full rounded-full bg-primary'
								style={{ width: `${percentage}%` }}
							/>
						</span>
						<span className='w-9 shrink-0 text-right tabular-nums'>
							{Math.round(percentage)}%
						</span>
					</li>
				))}
			</ul>
			{isDialogOpen && (
				<ProductRatingDialog
					productId={product.id}
					onClose={() => setIsDialogOpen(false)}
				/>
			)}
		</section>
	)
}
