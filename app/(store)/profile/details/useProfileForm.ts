import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { queryKeysConfig } from '@/config/query-keys.config'
import type { TProfileFormValues } from '@/schemas/profile.schema'
import { profileSchema } from '@/schemas/profile.schema'
import { usersService } from '@/services/users.service'
import type { IApiError } from '@/types/api.types'
import type { IUser } from '@/types/user.types'
import { setServerValidationErrors } from '@/utils/set-server-validation-errors.util'

export function useProfileForm({ fullname, email }: IUser) {
	const queryClient = useQueryClient()

	const form = useForm<TProfileFormValues>({
		defaultValues: { fullname, email, password: '' },
		resolver: zodResolver(profileSchema)
	})

	const mutation = useMutation({
		mutationFn: ({ password, ...values }: TProfileFormValues) =>
			usersService.updateProfile({
				...values,
				password: password || undefined
			}),
		onSuccess: profile => {
			queryClient.setQueryData(queryKeysConfig.profile, profile)

			form.reset({
				fullname: profile.fullname,
				email: profile.email,
				password: ''
			})

			toast.success('Profile updated successfully.')
		},
		onError: (error: IApiError) =>
			setServerValidationErrors(error.fields, form.setError)
	})

	const onSubmitProfile = form.handleSubmit(values => mutation.mutate(values))

	return { ...form, onSubmitProfile, isPending: mutation.isPending }
}
