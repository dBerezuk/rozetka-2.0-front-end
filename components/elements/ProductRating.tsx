import { Star } from 'lucide-react'

interface IProductRatingProps {
	size?: number
	isLabelVisible?: boolean
}

export function ProductRating({
	size = 12,
	isLabelVisible = false
}: IProductRatingProps) {
	return (
		<div className='flex items-center gap-2'>
			<span aria-hidden='true' className='flex gap-0.5 text-gray-200'>
				{[1, 2, 3, 4, 5].map(star => (
					<Star key={star} size={size} className='fill-current stroke-none' />
				))}
			</span>
			<span className={isLabelVisible ? 'text-xs text-gray-500' : 'sr-only'}>
				No reviews
			</span>
		</div>
	)
}
