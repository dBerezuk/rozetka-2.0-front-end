import { z } from 'zod'

import { getAuthSchema } from '@/schemas/auth.schema'

const registrationSchema = getAuthSchema('register')

export const profileSchema = registrationSchema.extend({
	password: registrationSchema.shape.password.or(z.literal(''))
})

const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024

export const avatarSchema = z
	.file()
	.max(MAX_AVATAR_SIZE_BYTES, 'Image must not exceed 5 MB.')
	.mime(['image/jpeg', 'image/png', 'image/webp'], 'Choose a JPEG, PNG or WebP image.')

export type TProfileFormValues = z.infer<typeof profileSchema>
