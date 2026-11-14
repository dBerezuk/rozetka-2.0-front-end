import { z } from 'zod'

import type { TAuthMode } from '@/types/auth.types'

export function getAuthSchema(mode: TAuthMode) {
	return z.object({
		fullname:
			mode === 'register'
				? z.string().trim().min(1, 'Enter your full name.').max(200)
				: z.string(),
		email:
			mode === 'newPassword'
				? z.string()
				: z
						.string()
						.trim()
						.toLowerCase()
						.min(1, 'Enter your email address.')
						.max(254)
						.pipe(z.email({ error: 'Enter a valid email address.' })),
		password:
			mode === 'resetPassword'
				? z.string()
				: z
						.string()
						.min(8, 'Use at least 8 characters.')
						.max(128, 'Use no more than 128 characters.')
	})
}

export type TAuthFormValues = z.infer<ReturnType<typeof getAuthSchema>>
