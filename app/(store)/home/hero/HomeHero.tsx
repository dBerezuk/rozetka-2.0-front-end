import { HomeBanner } from '@/app/(store)/home/hero/HomeBanner'
import { Slider } from '@/components/elements/slider/Slider'
import type { ICategory } from '@/types/category.types'

interface IHomeHeroProps {
	categories: ICategory[]
}

export function HomeHero({ categories }: IHomeHeroProps) {
	return (
		<div>
			<h1 className='sr-only'>Discover your next favorite at Rozetka</h1>
			<Slider
				label='Shopping inspiration'
				trackClassName='rounded-lg'
				dotsClassName='absolute inset-x-0 bottom-1 mt-0 text-white'
				isDotsVisible
			>
				<HomeBanner index={0} />
				{categories.slice(0, 3).map((category, index) => (
					<HomeBanner key={category.id} category={category} index={index + 1} />
				))}
			</Slider>
		</div>
	)
}
