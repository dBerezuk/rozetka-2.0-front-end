'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { ComponentProps } from 'react'

import { Field } from '@/components/ui/field/Field'

type TPasswordFieldProps = Omit<
	ComponentProps<typeof Field>,
	'type' | 'className'
>

export function PasswordField({ label, ...props }: TPasswordFieldProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const Icon = isPasswordVisible ? EyeOff : Eye

	return (
		<Field
			{...props}
			label={label}
			type={isPasswordVisible ? 'text' : 'password'}
			className='pr-11'
			endAdornment={
				<button
					type='button'
					aria-label={`${isPasswordVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					className='absolute right-0 bottom-0 grid size-11 cursor-pointer place-items-center rounded-xl text-gray-500 hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-primary'
				>
					<Icon size={16} aria-hidden='true' />
				</button>
			}
		/>
	)
}
