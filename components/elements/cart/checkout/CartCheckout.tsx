import { LockKeyhole } from 'lucide-react'

import { CheckoutFields } from '@/components/elements/cart/checkout/CheckoutFields'
import { CheckoutFooter } from '@/components/elements/cart/checkout/CheckoutFooter'
import { useCheckoutForm } from '@/components/elements/cart/checkout/useCheckoutForm'
import { Modal } from '@/components/elements/modal/Modal'
import type { IUser } from '@/types/user.types'

interface ICartCheckoutProps {
	profile: IUser
	isOpen: boolean
	amount: number
	onClose: () => void
	onBack: () => void
}

export function CartCheckout({
	profile,
	isOpen,
	amount,
	onClose,
	onBack
}: ICartCheckoutProps) {
	const checkout = useCheckoutForm(profile, onClose)
	const isLocked = checkout.mutation.isPending || Boolean(checkout.draft)

	return (
		<Modal
			isOpen={isOpen}
			title='Checkout'
			description='Contact details and delivery'
			isBusy={checkout.mutation.isPending}
			onClose={onClose}
			footer={
				<CheckoutFooter
					checkout={checkout}
					amount={amount}
					onBack={onBack}
					onClose={onClose}
				/>
			}
		>
			<form
				id={checkout.formId}
				noValidate
				onSubmit={checkout.onSubmitOrder}
				aria-busy={checkout.mutation.isPending}
				className='space-y-5'
			>
				{checkout.draft && (
					<p
						role='status'
						className='rounded-xl bg-gray-100 p-4 text-sm text-gray-700'
					>
						Your checkout is saved. Continue with the same order; its details
						are fixed once submitted.
					</p>
				)}
				<fieldset disabled={isLocked} className='space-y-5'>
					<legend className='sr-only'>Recipient and delivery</legend>
					<CheckoutFields form={checkout} />
				</fieldset>
				{checkout.mutation.isError && (
					<p role='alert' className='text-sm text-red-600'>
						{checkout.mutation.error.message}
					</p>
				)}
				<p className='flex items-start gap-2 text-xs leading-relaxed text-gray-500'>
					<LockKeyhole
						size={16}
						className='mt-0.5 shrink-0'
						aria-hidden='true'
					/>
					Your order is priced in EUR. Monobank may convert the payment to UAH;
					check the final amount before confirming. Delivery charges are not
					included.
				</p>
			</form>
		</Modal>
	)
}
