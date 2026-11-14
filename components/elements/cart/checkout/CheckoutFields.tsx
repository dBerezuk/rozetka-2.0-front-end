import type { UseFormReturn } from 'react-hook-form'

import { Field } from '@/components/ui/field/Field'
import { Textarea } from '@/components/ui/Textarea'
import type { TCheckoutFormValues } from '@/schemas/checkout.schema'

interface ICheckoutFieldsProps {
	form: UseFormReturn<TCheckoutFormValues>
}

export function CheckoutFields({ form }: ICheckoutFieldsProps) {
	const {
		register,
		formState: { errors }
	} = form

	return (
		<>
			<div className='grid gap-5 sm:grid-cols-2'>
				<Field
					label='Full name'
					autoComplete='name'
					error={errors.fullname?.message}
					{...register('fullname')}
				/>
				<Field
					label='Email address'
					type='email'
					autoComplete='email'
					error={errors.email?.message}
					{...register('email')}
				/>
			</div>
			<Field
				label='Phone number'
				type='tel'
				autoComplete='tel'
				placeholder='+380...'
				error={errors.phone?.message}
				{...register('phone')}
			/>
			<Field
				label='Delivery address or pickup branch'
				autoComplete='street-address'
				placeholder='City, carrier and branch, or full address'
				error={errors.shippingAddress?.message}
				{...register('shippingAddress')}
			/>
			<Textarea
				label='Order comment (optional)'
				error={errors.comment?.message}
				{...register('comment')}
			/>
		</>
	)
}
