import { z } from 'zod'

export const checkoutSchema = z.object({
	fullname: z.string().trim().min(2, 'Enter your full name.').max(100),
	email: z
		.string()
		.trim()
		.toLowerCase()
		.max(254)
		.pipe(z.email({ error: 'Enter a valid email address.' })),
	phone: z.string().trim().min(7, 'Enter your phone number.').max(30),
	shippingAddress: z
		.string()
		.trim()
		.min(5, 'Enter your delivery address or branch.')
		.max(500),
	comment: z.string().max(1000)
})

export type TCheckoutFormValues = z.infer<typeof checkoutSchema>
