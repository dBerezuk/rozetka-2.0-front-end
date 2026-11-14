'use client'

import { useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { ProductCategoryFields } from '@/app/(store)/profile/stores/[slug]/products/form/category/ProductCategoryFields'
import { ProductAdditionalFields } from '@/app/(store)/profile/stores/[slug]/products/form/ProductAdditionalFields'
import { ProductDetailsFields } from '@/app/(store)/profile/stores/[slug]/products/form/ProductDetailsFields'
import { useProductForm } from '@/app/(store)/profile/stores/[slug]/products/form/useProductForm'
import { Button } from '@/components/ui/button/Button'
import { pagesConfig } from '@/config/pages.config'
import type { IProductDetails } from '@/types/product.types'
import type { IStore } from '@/types/store.types'

interface IProductFormProps {
	store: IStore
	product?: IProductDetails
}

export function ProductForm({ store, product }: IProductFormProps) {
	const { form, onSubmitProduct, isPending, isSaved } = useProductForm(
		store,
		product
	)

	const [isUploading, setIsUploading] = useState(false)
	const [isCategoryReady, setIsCategoryReady] = useState(false)

	const isDisabled = isPending || isSaved

	return (
		<FormProvider {...form}>
			<form
				noValidate
				onSubmit={onSubmitProduct}
				aria-busy={isPending}
				className='space-y-4'
			>
				<fieldset disabled={isDisabled} className='space-y-4'>
					<ProductDetailsFields />
					<ProductCategoryFields
						product={product}
						onReadyChange={setIsCategoryReady}
					/>
					<ProductAdditionalFields
						isUploading={isUploading}
						onUploadingChange={setIsUploading}
					/>
					{form.formState.errors.root?.message && (
						<p role='alert' className='text-sm text-red-600'>
							{form.formState.errors.root.message}
						</p>
					)}
					<div className='flex flex-wrap justify-end gap-3'>
						<Button
							variant='outline'
							url={pagesConfig.getStoreProducts(store.slug)}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							disabled={isDisabled || isUploading || !isCategoryReady}
						>
							{isPending
								? 'Saving...'
								: product
									? 'Save changes'
									: 'Create product'}
						</Button>
					</div>
				</fieldset>
			</form>
		</FormProvider>
	)
}
