import type { Metadata } from 'next'

export const siteName = 'Rozetka 2.0'

export const defaultOpenGraph = {
	type: 'website',
	siteName,
	locale: 'en_US',
	images: [
		{
			url: '/social-preview.png',
			width: 1200,
			height: 630,
			alt: siteName
		}
	]
} satisfies Metadata['openGraph']
