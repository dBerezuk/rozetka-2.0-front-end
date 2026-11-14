export type TPriceRange = [number, number]

export interface IPriceRangeProps {
	min: number
	max: number
	value: TPriceRange
	onChange: (value: TPriceRange) => void
	isDisabled?: boolean
}
