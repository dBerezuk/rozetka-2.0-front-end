import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

import type { IValidationFieldError } from '@/types/api.types'

export function setServerValidationErrors<TValues extends FieldValues>(
	fields: IValidationFieldError[] = [],
	setError: UseFormSetError<TValues>
) {
	for (const field of fields) {
		setError(field.property as FieldPath<TValues>, {
			type: 'server',
			message: field.errors.join(' ')
		})
	}
}
