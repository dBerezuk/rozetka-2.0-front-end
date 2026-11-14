import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import { Toast } from '@/components/ui/Toast'
import { defaultOpenGraph, siteName } from '@/config/seo.config'
import { QueryProvider } from '@/providers/QueryProvider'

import './globals.css'

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap'
})

export const viewport: Viewport = {
	themeColor: '#00a84f',
	colorScheme: 'light'
}

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
	),
	title: {
		default: siteName,
		template: `%s | ${siteName}`
	},
	description: 'Shop products from a variety of sellers at Rozetka 2.0.',
	applicationName: siteName,
	openGraph: defaultOpenGraph,
	twitter: { card: 'summary_large_image' },
	icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang='en' className={`${inter.variable} h-full antialiased`}>
			<body className='flex min-h-full flex-col bg-bg'>
				<QueryProvider>{children}</QueryProvider>
				<Toast />
			</body>
		</html>
	)
}
