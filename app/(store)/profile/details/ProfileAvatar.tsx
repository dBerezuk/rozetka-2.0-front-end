'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Camera, UserRound } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

import { FileUpload } from '@/components/elements/FileUpload'
import { Button } from '@/components/ui/button/Button'
import { mediaConfig } from '@/config/media.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { avatarSchema } from '@/schemas/profile.schema'
import { usersService } from '@/services/users.service'
import type { IUser } from '@/types/user.types'

interface IProfileAvatarProps {
	profile: IUser
}

export function ProfileAvatar({ profile }: IProfileAvatarProps) {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (avatarFileName: string | null) =>
			usersService.updateProfile({ avatarFileName }),
		onSuccess: updatedProfile => {
			queryClient.setQueryData(queryKeysConfig.profile, updatedProfile)

			toast.success('Profile photo updated.')
		}
	})

	return (
		<div
			className='flex flex-wrap items-center gap-5'
			aria-busy={mutation.isPending}
		>
			<div className='relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary/10 text-green-600'>
				{profile.avatarFileName ? (
					<Image
						src={mediaConfig.getFileUrl(
							mediaConfig.folders.avatars,
							profile.avatarFileName
						)}
						alt={profile.fullname}
						width={80}
						height={80}
						sizes='80px'
						unoptimized
						className='size-20 object-cover'
					/>
				) : (
					<UserRound size={32} aria-hidden='true' />
				)}
			</div>
			<div className='space-y-2.5'>
				<div className='flex flex-wrap gap-2'>
					<FileUpload
						label='Change photo'
						pendingLabel='Updating...'
						accept='image/jpeg,image/png,image/webp'
						schema={avatarSchema}
						folder={mediaConfig.folders.avatars}
						isPending={mutation.isPending}
						icon={Camera}
						onUpload={async ({ filename }) => {
							await mutation.mutateAsync(filename)
						}}
					/>
					<Button
						variant='ghost'
						size='small'
						disabled={mutation.isPending || !profile.avatarFileName}
						className={!profile.avatarFileName ? 'invisible' : undefined}
						onClick={() => mutation.mutate(null)}
					>
						Remove
					</Button>
				</div>
				<p className='text-xs text-gray-500'>JPEG, PNG or WebP. Up to 5 MB.</p>
			</div>
		</div>
	)
}
