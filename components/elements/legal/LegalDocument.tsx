import { LegalNavigation } from '@/components/elements/legal/LegalNavigation'
import { PageContent } from '@/components/layout/PageContent'

export interface ILegalDocumentProps {
	title: string
	description: string
	sections: { id: string; title: string; text: string }[]
}

export function LegalDocument({
	title,
	description,
	sections
}: ILegalDocumentProps) {
	return (
		<div className='p-4 sm:p-6 lg:p-8'>
			<div className='mx-auto max-w-6xl'>
				<PageContent title={title} description={description}>
					<div className='grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
						<LegalNavigation title={title} sections={sections} />
						<article
							aria-label={title}
							className='space-y-8 rounded-2xl bg-white p-6 sm:p-8 lg:p-10'
						>
							{sections.map((section, index) => (
								<section
									key={section.id}
									id={section.id}
									className='scroll-mt-24 space-y-3'
								>
									<h2 className='text-lg font-semibold tracking-tight'>
										{index + 1}. {section.title}
									</h2>
									<p className='text-sm leading-7 text-gray-500'>
										{section.text}
									</p>
								</section>
							))}
						</article>
					</div>
				</PageContent>
			</div>
		</div>
	)
}
