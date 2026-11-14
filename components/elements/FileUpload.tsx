'use client'

import { useMutation } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { ZodType } from 'zod'

import { uploadsService } from '@/services/uploads.service'
import type { IUploadResponse, TUploadFolder } from '@/types/upload.types'
import { cn } from '@/utils/cn.util'

interface IFileUploadProps {
	label?: string
	pendingLabel?: string
	accept?: string
	schema: ZodType<File>
	folder: TUploadFolder
	isPending?: boolean
	icon?: LucideIcon
	className?: string
	onUpload: (result: IUploadResponse) => void | Promise<void>
	onUploadingChange?: (isUploading: boolean) => void
}

export function FileUpload({
	label = 'Choose file',
	pendingLabel = 'Uploading...',
	accept,
	schema,
	folder,
	isPending = false,
	icon: Icon = Upload,
	className,
	onUpload,
	onUploadingChange
}: IFileUploadProps) {
	const mutation = useMutation({
		mutationFn: (file: File) => uploadsService.upload(file, { folder }),
		onSuccess: onUpload
	})

	const isUploading = isPending || mutation.isPending

	useEffect(() => {
		onUploadingChange?.(mutation.isPending)
	}, [mutation.isPending, onUploadingChange])

	const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]

		event.target.value = ''

		if (!file) {
			return
		}

		const result = schema.safeParse(file)

		if (!result.success) {
			toast.error(result.error.issues[0].message)

			return
		}

		mutation.mutate(result.data)
	}

	return (
		<label
			aria-busy={isUploading}
			className={cn(
				'relative inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary has-disabled:pointer-events-none has-disabled:opacity-50 motion-reduce:transition-none',
				className
			)}
		>
			<Icon size={16} aria-hidden='true' />
			{isUploading ? pendingLabel : label}
			<input
				type='file'
				accept={accept}
				className='absolute inset-0 size-full cursor-pointer opacity-0'
				disabled={isUploading}
				onChange={onChangeFile}
			/>
		</label>
	)
}
