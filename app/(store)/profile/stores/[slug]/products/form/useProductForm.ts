import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	getProductFormRequest,
	getProductFormValues
} from '@/app/(store)/profile/stores/[slug]/products/form/product-form.util'
import { pagesConfig } from '@/config/pages.config'
import { queryKeysConfig } from '@/config/query-keys.config'
import { productSchema } from '@/schemas/product.schema'
import type { TProductFormValues } from '@/schemas/product.schema'
import { productsService } from '@/services/products.service'
import type { IApiError } from '@/types/api.types'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'
import { setServerValidationErrors } from '@/utils/set-server-validation-errors.util'

export function useProductForm(store: IStore, product?: IProduct) {
	const router = useRouter()
	const queryClient = useQueryClient()

	const form = useForm<TProductFormValues>({
		shouldFocusError: false,
		defaultValues: getProductFormValues(product),
		resolver: zodResolver(productSchema)
	})

	const mutation = useMutation({
		mutationFn: (values: TProductFormValues) => {
			const body = getProductFormRequest(values)

			return product
				? productsService.update(product.id, body)
				: productsService.create({ ...body, storeId: store.id })
		},
		onSuccess: async savedProduct => {
			form.reset(getProductFormValues(savedProduct))

			await queryClient.invalidateQueries({
				queryKey: queryKeysConfig.getProductDetails(savedProduct.slug)
			})

			if (product && product.slug !== savedProduct.slug) {
				queryClient.removeQueries({
					queryKey: queryKeysConfig.getProductDetails(product.slug)
				})
			}

			await queryClient.invalidateQueries({
				queryKey: queryKeysConfig.getStoreProducts(store.slug)
			})

			toast.success(
				product
					? 'Product updated successfully.'
					: 'Product created successfully.'
			)

			router.replace(pagesConfig.getStoreProducts(store.slug))
		},
		onError: (error: IApiError) => {
			setServerValidationErrors(error.fields, form.setError)

			form.setError('root', {
				message: 'Unable to save the product. Review the fields and try again.'
			})
		}
	})

	return {
		form,
		onSubmitProduct: form.handleSubmit(
			values => mutation.mutate(values),
			() => {
				form.setError('root', {
					message: 'Review the highlighted fields and sections before saving.'
				})
			}
		),
		isPending: mutation.isPending,
		isSaved: mutation.isSuccess
	}
}
