import { notFound } from 'next/navigation'

export function handleNotFound(error: unknown): never {
	if (
		error instanceof Error &&
		'statusCode' in error &&
		error.statusCode === 404
	) {
		notFound()
	}

	throw error
}
