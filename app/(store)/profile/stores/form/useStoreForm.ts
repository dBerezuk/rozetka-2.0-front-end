import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import type { TCreateStoreValues } from '@/schemas/store.schema'
import { createStoreSchema } from '@/schemas/store.schema'
import { storesService } from '@/services/stores.service'
import type { IApiError } from '@/types/api.types'
import type { IStore } from '@/types/store.types'
import { setServerValidationErrors } from '@/utils/set-server-validation-errors.util'

export function useStoreForm(store?: IStore) {
	const router = useRouter()
	const queryClient = useQueryClient()

	const form = useForm<TCreateStoreValues>({
		defaultValues: {
			title: store?.title ?? '',
			description: store?.description ?? '',
			slug: store?.slug ?? ''
		},
		resolver: zodResolver(createStoreSchema)
	})

	const mutation = useMutation({
		mutationFn: (values: TCreateStoreValues) =>
			store
				? storesService.update(store.id, values)
				: storesService.create(values),
		onSuccess: async updatedStore => {
			queryClient.setQueryData(
				queryKeysConfig.getProfileStore(updatedStore.slug),
				updatedStore
			)

			form.reset({
				title: updatedStore.title,
				description: updatedStore.description,
				slug: updatedStore.slug
			})

			if (store && store.slug !== updatedStore.slug) {
				await queryClient.invalidateQueries({
					queryKey: queryKeysConfig.getProfileStore(store.slug),
					refetchType: 'none'
				})
			}

			await queryClient.invalidateQueries({
				queryKey: queryKeysConfig.myStores
			})

			toast.success(
				store ? 'Store updated successfully.' : 'Your store has been created.'
			)

			router.replace(
				store
					? pagesConfig.getStoreSettings(updatedStore.slug)
					: pagesConfig.myStores
			)
		},
		onError: (error: IApiError) =>
			setServerValidationErrors(error.fields, form.setError)
	})

	const onSubmitStore = form.handleSubmit(values => mutation.mutate(values))

	return {
		...form,
		onSubmitStore,
		isPending: mutation.isPending,
		isDisabled: mutation.isPending || (!store && mutation.isSuccess)
	}
}
