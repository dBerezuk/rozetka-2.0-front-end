'use client'

import { useAdminForm } from '@/app/(store)/admin/useAdminForm'
import { Modal } from '@/components/elements/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Field } from '@/components/ui/field/Field'
import { adminCharacteristicSchema } from '@/schemas/admin.schema'
import { characteristicsService } from '@/services/characteristics.service'
import type { ICategory } from '@/types/category.types'
import type { ICharacteristic } from '@/types/characteristic.types'

interface ICharacteristicFormProps {
	characteristic?: ICharacteristic
	category: ICategory
	onClose: () => void
}

export function CharacteristicForm({
	characteristic,
	category,
	onClose
}: ICharacteristicFormProps) {
	const { form, onSubmit, isPending } = useAdminForm(
		adminCharacteristicSchema,
		{
			title: characteristic?.title ?? '',
			isSorting: characteristic?.isSorting ?? false
		},
		values =>
			characteristic
				? characteristicsService.update(characteristic.id, values)
				: characteristicsService.create({ ...values, categoryId: category.id }),
		onClose
	)

	return (
		<Modal
			isOpen
			title={characteristic ? 'Edit characteristic' : 'New characteristic'}
			description={category.title}
			isBusy={isPending}
			onClose={onClose}
		>
			<form noValidate onSubmit={onSubmit}>
				<fieldset disabled={isPending} className='space-y-5'>
					<Field
						label='Title'
						error={form.formState.errors.title?.message}
						{...form.register('title')}
					/>
					<Checkbox
						label='Use as a product filter'
						{...form.register('isSorting')}
					/>
					<div className='flex justify-end gap-3 border-t border-gray-100 pt-5'>
						<Button variant='outline' onClick={onClose}>
							Cancel
						</Button>
						<Button type='submit'>
							{isPending ? 'Saving...' : 'Save characteristic'}
						</Button>
					</div>
				</fieldset>
			</form>
		</Modal>
	)
}
