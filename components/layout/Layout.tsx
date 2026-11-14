import type { ReactNode } from 'react'

import { Header } from '@/components/layout/Header'

interface ILayoutProps {
	children: ReactNode
}

export function Layout({ children }: ILayoutProps) {
	return (
		<>
			<a
				href='#main-content'
				className='sr-only rounded-lg bg-white px-4 py-3 text-gray-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50'
			>
				Skip to content
			</a>
			<Header />
			<main
				id='main-content'
				tabIndex={-1}
				className='container flex flex-1 flex-col bg-bg max-lg:overflow-x-clip'
			>
				{children}
			</main>
		</>
	)
}
