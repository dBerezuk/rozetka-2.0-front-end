import type { IPaginatedResponse, IPaginationQuery } from '@/types/api.types'

export async function getStaticSlugParams(
	route: string,
	getPage: (query: IPaginationQuery) => Promise<IPaginatedResponse<{ slug: string }>>
) {
	const params: { slug: string }[] = []
	let hasMore = true

	try {
		while (hasMore) {
			const page = await getPage({ skip: params.length, take: 100 })
			params.push(...page.data.map(({ slug }) => ({ slug })))
			hasMore = page.more && page.data.length > 0
		}
	} catch (error) {
		if (
			!(error instanceof Error) ||
			!('statusCode' in error) ||
			error.statusCode !== undefined
		) {
			throw error
		}

		console.warn(`API unavailable during build. ${route} will be generated on demand.`)
		return []
	}

	return params
}
