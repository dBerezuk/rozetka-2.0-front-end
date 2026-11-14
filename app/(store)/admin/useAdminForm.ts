import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { DefaultValues, FieldValues } from 'react-hook-form'
import { toast } from 'sonner'
import type { ZodType } from 'zod'

import { queryKeysConfig } from '@/config/query-keys.config'
import type { IApiError } from '@/types/api.types'
import { setServerValidationErrors } from '@/utils/set-server-validation-errors.util'

export function useAdminForm<TValues extends FieldValues>(
	schema: ZodType<TValues, TValues>,
	defaultValues: DefaultValues<TValues>,
	save: (values: TValues) => Promise<unknown>,
	onSaved: () => void
) {
	const queryClient = useQueryClient()

	const form = useForm<TValues>({
		resolver: zodResolver(schema),
		defaultValues
	})

	const mutation = useMutation({
		mutationFn: save,
		onError: (error: IApiError) =>
			setServerValidationErrors(error.fields, form.setError),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: queryKeysConfig.admin }),
				queryClient.invalidateQueries({ queryKey: queryKeysConfig.categories })
			])

			toast.success('Changes saved.')

			onSaved()
		}
	})

	return {
		form,
		isPending: mutation.isPending,
		onSubmit: form.handleSubmit(values => mutation.mutate(values))
	}
}
