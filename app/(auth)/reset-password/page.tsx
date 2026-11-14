import type { Metadata } from 'next'

import { AuthForm } from '@/components/elements/auth/AuthForm'

export const metadata: Metadata = { title: 'Reset your password' }

export default function ResetPasswordPage() {
	return <AuthForm mode='resetPassword' />
}
