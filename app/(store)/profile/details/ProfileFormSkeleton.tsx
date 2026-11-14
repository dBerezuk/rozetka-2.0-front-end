import { Camera, Save, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { Section } from '@/components/ui/Section'
import { Skeleton } from '@/components/ui/Skeleton'

export function ProfileFormSkeleton() {
	return (
		<Section title='Personal details' description='Manage your photo and account information.' icon={UserRound} aria-hidden='true'>
			<div className='flex flex-wrap items-center gap-5'>
				<Skeleton className='size-20 shrink-0 rounded-2xl' />
				<div className='space-y-2.5'>
					<div className='flex flex-wrap gap-2'>
						<Button isLoading size='small' variant='outline'>
							<Camera size={16} />
							Change photo
						</Button>
						<Button isLoading size='small'>
							Remove
						</Button>
					</div>
					<p className='text-xs text-gray-500'>JPEG, PNG or WebP. Up to 5 MB.</p>
				</div>
			</div>
			<div className='mt-6 space-y-6 border-t border-gray-200 pt-6'>
				<div className='grid gap-5 sm:grid-cols-2'>
					<Field isLoading label='Full name' />
					<Field isLoading label='Email address' />
				</div>
				<div className='space-y-2'>
					<Field isLoading label='New password (optional)' />
					<p className='text-xs text-gray-500'>Leave blank to keep your current password. Use 8–128 characters.</p>
				</div>
				<div className='flex flex-wrap items-center justify-between gap-4'>
					<p className='text-xs text-gray-500'>Your email is used to sign in to your account.</p>
					<Button isLoading>
						<Save size={16} />
						Save changes
					</Button>
				</div>
			</div>
		</Section>
	)
}
