'use client'

import { Save, UserRound } from 'lucide-react'

import { ProfileAvatar } from '@/app/(store)/profile/details/ProfileAvatar'
import { useProfileForm } from '@/app/(store)/profile/details/useProfileForm'
import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { PasswordField } from '@/components/ui/PasswordField'
import { Section } from '@/components/ui/Section'
import type { IUser } from '@/types/user.types'

interface IProfileFormProps {
	profile: IUser
}

export function ProfileForm({ profile }: IProfileFormProps) {
	const {
		register,
		onSubmitProfile,
		isPending,
		formState: { errors, isDirty }
	} = useProfileForm(profile)

	return (
		<Section title='Personal details' description='Manage your photo and account information.' icon={UserRound}>
			<ProfileAvatar profile={profile} />
			<form noValidate onSubmit={onSubmitProfile} aria-busy={isPending} className='mt-6 border-t border-gray-200 pt-6'>
				<fieldset disabled={isPending} className='space-y-6'>
					<div className='grid gap-5 sm:grid-cols-2'>
						<Field label='Full name' autoComplete='name' error={errors.fullname?.message} {...register('fullname')} />
						<Field label='Email address' type='email' autoComplete='email' error={errors.email?.message} {...register('email')} />
					</div>
					<div className='space-y-2'>
						<PasswordField label='New password (optional)' autoComplete='new-password' error={errors.password?.message} {...register('password')} />
						<p className='text-xs text-gray-500'>Leave blank to keep your current password. Use 8–128 characters.</p>
					</div>
					<div className='flex flex-wrap items-center justify-between gap-4'>
						<p className='text-xs text-gray-500'>Your email is used to sign in to your account.</p>
						<Button type='submit' variant='secondary' disabled={!isDirty || isPending}>
							<Save size={16} aria-hidden='true' />
							{isPending ? 'Saving...' : 'Save changes'}
						</Button>
					</div>
				</fieldset>
			</form>
		</Section>
	)
}
