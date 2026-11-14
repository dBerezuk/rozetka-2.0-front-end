import type { ReactNode } from 'react'

interface IPageContentProps {
	title: string
	description: string
	actions?: ReactNode
	children: ReactNode
}

export function PageContent({ title, description, actions, children }: IPageContentProps) {
	return (
		<div className='space-y-6'>
			<header className='flex flex-wrap items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{title}</h1>
					<p className='mt-2 text-sm text-gray-500'>{description}</p>
				</div>
				{actions}
			</header>
			{children}
		</div>
	)
}
