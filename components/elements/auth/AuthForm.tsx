'use client'

import { LockKeyhole } from 'lucide-react'
import Link from 'next/link'

import { PasswordField } from '@/components/ui/PasswordField'
import { AuthSocialButtons } from '@/components/elements/auth/AuthSocialButtons'
import { useAuthForm } from '@/components/elements/auth/useAuthForm'
import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { pagesConfig } from '@/config/pages.config'
import type { TAuthMode } from '@/types/auth.types'

const FORM_COPY = {
	login: {
		title: 'Sign in',
		description: 'Welcome back to Rozetka.',
		action: 'Sign in'
	},
	register: {
		title: 'Create an account',
		description: 'Start shopping with Rozetka.',
		action: 'Create account'
	},
	resetPassword: {
		title: 'Reset your password',
		description: 'Enter your email to request a password reset link.',
		action: 'Send reset link'
	},
	newPassword: {
		title: 'Choose a new password',
		description: 'Enter a new password for your account.',
		action: 'Save password'
	}
}

export function AuthForm({ mode: initialMode }: { mode: TAuthMode }) {
	const {
		register,
		mode,
		onSubmit,
		isPending,
		isSuccess,
		formState: { errors }
	} = useAuthForm(initialMode)

	const { title, description, action } = FORM_COPY[mode]
	const isLogin = mode === 'login'
	const isResetPassword = mode === 'resetPassword'
	const isNewPassword = mode === 'newPassword'

	return (
		<div className='min-h-[456px] space-y-4'>
			<div className='space-y-1.5 text-center'>
				<div className='mx-auto grid size-9 place-items-center rounded-lg bg-primary/10 text-green-600'>
					<LockKeyhole size={20} aria-hidden='true' />
				</div>
				<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
					{title}
				</h1>
				<p className='text-sm text-gray-500'>{description}</p>
			</div>
			<form
				method='post'
				noValidate
				className='space-y-3'
				onSubmit={onSubmit}
				aria-busy={isPending}
			>
				<fieldset
					disabled={isPending || (isNewPassword && isSuccess)}
					className='min-w-0 space-y-3'
				>
					{mode === 'register' && (
						<Field
							label='Full name'
							autoComplete='name'
							error={errors.fullname?.message}
							{...register('fullname')}
						/>
					)}
					{!isNewPassword && (
						<Field
							label='Email'
							type='email'
							autoComplete='email'
							error={errors.email?.message}
							{...register('email')}
						/>
					)}
					{!isResetPassword && (
						<PasswordField
							label={isNewPassword ? 'New password' : 'Password'}
							autoComplete={isLogin ? 'current-password' : 'new-password'}
							error={errors.password?.message}
							{...register('password')}
						/>
					)}
					{isLogin && (
						<Link
							href={pagesConfig.resetPassword}
							className='block text-right text-sm font-medium text-green-600 hover:underline'
						>
							Reset password
						</Link>
					)}
					<Button
						variant='secondary'
						type='submit'
						disabled={isPending || (isNewPassword && isSuccess)}
						className='w-full'
					>
						{isPending ? 'Please wait...' : action}
					</Button>
				</fieldset>
			</form>
			{!isResetPassword && !isNewPassword && <AuthSocialButtons />}
			{isNewPassword && !isSuccess && (
				<Link
					href={pagesConfig.resetPassword}
					className='block text-center text-sm font-medium text-green-600 hover:underline'
				>
					Request a new reset link
				</Link>
			)}
			<p className='text-center text-sm text-gray-500'>
				{isLogin && 'New to Rozetka? '}
				<Link
					href={isLogin ? pagesConfig.register : pagesConfig.login}
					className='font-medium text-green-600 hover:underline'
				>
					{isLogin ? 'Create an account' : 'Back to sign in'}
				</Link>
			</p>
		</div>
	)
}
