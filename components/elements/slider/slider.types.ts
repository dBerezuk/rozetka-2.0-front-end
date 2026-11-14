import type { ReactNode } from 'react'

export interface ISliderProps {
	children: ReactNode
	label: string
	className?: string
	trackClassName?: string
	slideClassName?: string
	dotsClassName?: string
	arrowsClassName?: string
	arrowsVariant?: 'grouped' | 'sides'
	isArrowsVisible?: boolean
	isDotsVisible?: boolean
}
