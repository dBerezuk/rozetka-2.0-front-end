import { LinkCard } from '@/components/elements/sessions/links/LinkCard'
import type { ILinkCardProps } from '@/components/elements/sessions/links/LinkCard'

interface ILinksSectionProps {
	links: ILinkCardProps[]
	label: string
}

export function LinksSection({ links, label }: ILinksSectionProps) {
	return (
		links.length > 0 && (
			<section aria-label={label}>
				<ul className='grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 xl:grid-cols-4'>
					{links.map(link => (
						<li key={link.url}>
							<LinkCard {...link} />
						</li>
					))}
				</ul>
			</section>
		)
	)
}
