import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL

		if (!apiUrl) {
			throw new Error('NEXT_PUBLIC_API_URL is required')
		}

		return [{ source: '/api/:path*', destination: `${apiUrl}/:path*` }]
	},
	/* config options here */
	experimental: {
		agentFeedback: true
	},
	turbopack: {
		rules: {
			'*.css': {
				loaders: ['@tailwindcss/turbopack'],
				as: '*.css'
			}
		}
	}
}

export default nextConfig
