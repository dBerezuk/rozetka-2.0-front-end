'use client'

import { ArrowUpRight } from 'lucide-react'

import { useStoreForm } from '@/app/(store)/profile/stores/form/useStoreForm'
import { Button } from '@/components/ui/button/Button'
import { Field } from '@/components/ui/field/Field'
import { Textarea } from '@/components/ui/Textarea'
import { pagesConfig } from '@/config/pages.config'
import type { IStore } from '@/types/store.types'

interface IStoreFormProps {
	store?: IStore
}

export function StoreForm({ store }: IStoreFormProps) {
	const {
		register,
		onSubmitStore,
		isPending,
		isDisabled,
		formState: { errors }
	} = useStoreForm(store)

	return (
		<form
			noValidate
			onSubmit={onSubmitStore}
			aria-busy={isPending}
			className='rounded-2xl border border-gray-200 bg-white p-5 sm:p-7'
		>
			<fieldset disabled={isDisabled} className='space-y-6'>
				<Field
					label='Store name'
					placeholder='Your store name'
					error={errors.title?.message}
					{...register('title')}
				/>
				<div className='space-y-2'>
					<Field
						label='Store address'
						placeholder='my-store'
						autoCapitalize='none'
						spellCheck={false}
						aria-describedby='store-address-help'
						error={errors.slug?.message}
						{...register('slug')}
					/>
					<p id='store-address-help' className='text-xs text-gray-500'>
						Choose a unique address using letters, numbers and single hyphens.
					</p>
				</div>
				<Textarea
					label='Description'
					placeholder='Tell shoppers about your store and the products you offer.'
					rows={5}
					error={errors.description?.message}
					{...register('description')}
				/>
				<div className='flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-6'>
					<Button
						variant='outline'
						url={
							store
								? pagesConfig.getProfileStore(store.slug)
								: pagesConfig.myStores
						}
					>
						Cancel
					</Button>
					<Button type='submit' disabled={isDisabled}>
						{isPending ? 'Saving...' : store ? 'Save changes' : 'Create store'}
						<ArrowUpRight size={16} aria-hidden='true' />
					</Button>
				</div>
			</fieldset>
		</form>
	)
}
