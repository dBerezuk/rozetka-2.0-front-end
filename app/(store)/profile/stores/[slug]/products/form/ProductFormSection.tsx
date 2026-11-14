'use client'

import { Pencil } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { Modal } from '@/components/elements/modal/Modal'
import { Button } from '@/components/ui/button/Button'
import type { TProductFormValues } from '@/schemas/product.schema'
import { cn } from '@/utils/cn.util'

interface IProductFormSectionProps {
	name: Extract<
		keyof TProductFormValues,
		'images' | 'options' | 'variants' | 'characteristics'
	>
	title: string
	summary: string
	icon: LucideIcon
	children: ReactNode
	isBusy?: boolean
}

export function ProductFormSection({
	name,
	title,
	summary,
	icon: Icon,
	children,
	isBusy = false
}: IProductFormSectionProps) {
	const [isOpen, setIsOpen] = useState(false)

	const {
		trigger,
		formState: { errors }
	} = useFormContext<TProductFormValues>()

	const isInvalid = !!errors[name]

	const onDone = async () => {
		if (await trigger(name, { shouldFocus: true })) {
			setIsOpen(false)
		}
	}

	return (
		<section
			className={cn(
				'rounded-xl border bg-white p-4',
				isInvalid ? 'border-red-600' : 'border-gray-200'
			)}
		>
			<div className='flex items-center justify-between gap-3'>
				<div className='flex min-w-0 items-center gap-3'>
					<Icon
						size={20}
						className='shrink-0 text-gray-500'
						aria-hidden='true'
					/>
					<div className='min-w-0'>
						<h3 className='text-sm font-semibold'>{title}</h3>
						<p className='mt-1 text-xs text-gray-500'>{summary}</p>
					</div>
				</div>
				<Button
					variant='ghost'
					size='small'
					onClick={() => setIsOpen(true)}
					aria-label={`Manage ${title.toLowerCase()}`}
				>
					<Pencil size={16} aria-hidden='true' />
					Edit
				</Button>
			</div>
			{isInvalid && (
				<p role='alert' className='mt-2 text-xs text-red-600'>
					Review this section.
				</p>
			)}
			<Modal
				isOpen={isOpen}
				title={title}
				description='Changes are saved with the product.'
				isBusy={isBusy}
				onClose={() => setIsOpen(false)}
				footer={
					<Button disabled={isBusy} onClick={() => void onDone()}>
						Done
					</Button>
				}
			>
				{children}
			</Modal>
		</section>
	)
}
