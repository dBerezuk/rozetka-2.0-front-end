import { Star } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utils/cn.util'

interface IProductRatingStarsProps {
	savedScore: number | null
	isDisabled: boolean
}

const RATING_SCORES = [1, 2, 3, 4, 5]

export function ProductRatingStars({
	savedScore,
	isDisabled
}: IProductRatingStarsProps) {
	const [selectedScore, setSelectedScore] = useState<number>()
	const [hoveredScore, setHoveredScore] = useState<number>()
	const currentScore = selectedScore ?? savedScore
	const highlightedScore =
		(isDisabled ? currentScore : (hoveredScore ?? currentScore)) ?? 0

	return (
		<fieldset
			aria-label='Choose a rating'
			disabled={isDisabled}
			className='flex disabled:opacity-60'
			onMouseLeave={() => setHoveredScore(undefined)}
		>
			{RATING_SCORES.map(score => (
				<label
					key={score}
					className={isDisabled ? 'cursor-default' : 'cursor-pointer'}
					onMouseEnter={() => setHoveredScore(score)}
				>
					<input
						type='radio'
						name='score'
						value={score}
						aria-label={`${score} ${score === 1 ? 'star' : 'stars'}`}
						checked={currentScore === score}
						onChange={() => setSelectedScore(score)}
						required
						className='peer sr-only'
					/>
					<span className='grid size-11 place-items-center rounded-lg peer-focus-visible:outline-2 peer-focus-visible:outline-primary sm:size-12'>
						<Star
							size={30}
							aria-hidden='true'
							className={cn(
								'motion-safe:transition-colors motion-safe:duration-150',
								score <= highlightedScore
									? 'fill-amber-400 text-amber-500'
									: 'text-gray-400'
							)}
						/>
					</span>
				</label>
			))}
		</fieldset>
	)
}
