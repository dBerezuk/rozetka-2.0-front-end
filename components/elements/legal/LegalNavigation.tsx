import Link from 'next/link'

import type { ILegalDocumentProps } from '@/components/elements/legal/LegalDocument'
import { pagesConfig } from '@/config/pages.config'

export function LegalNavigation({
	title,
	sections
}: Pick<ILegalDocumentProps, 'title' | 'sections'>) {
	const legalLinks = [
		{ label: 'Privacy policy', url: pagesConfig.privacy },
		{ label: 'Terms of use', url: pagesConfig.legalTerms }
	]

	return (
		<aside className='space-y-6 lg:sticky lg:top-6'>
			<nav
				aria-label='Legal documents'
				className='flex flex-wrap gap-2 lg:flex-col'
			>
				{legalLinks.map(link => (
					<Link
						key={link.label}
						href={link.url}
						aria-current={link.label === title ? 'page' : undefined}
						className='rounded-lg px-4 py-3 text-sm text-gray-500 transition-colors hover:bg-white hover:text-green-600 aria-[current=page]:bg-white aria-[current=page]:font-medium aria-[current=page]:text-green-600 motion-reduce:transition-none'
					>
						{link.label}
					</Link>
				))}
			</nav>
			<nav aria-label='On this page' className='hidden space-y-3 px-4 lg:block'>
				<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
					On this page
				</p>
				<ol className='space-y-3'>
					{sections.map((section, index) => (
						<li key={section.id}>
							<a
								href={`#${section.id}`}
								className='text-sm text-gray-500 transition-colors hover:text-green-600 motion-reduce:transition-none'
							>
								{index + 1}. {section.title}
							</a>
						</li>
					))}
				</ol>
			</nav>
		</aside>
	)
}
