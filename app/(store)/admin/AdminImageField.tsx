'use client'

import Image from 'next/image'

import { FileUpload } from '@/components/elements/FileUpload'
import { Button } from '@/components/ui/button/Button'
import { mediaConfig } from '@/config/media.config'
import { productImageSchema } from '@/schemas/product.schema'
import type { TUploadFolder } from '@/types/upload.types'

interface IAdminImageFieldProps {
	value: string | null
	folder: TUploadFolder
	onChange: (filename: string | null) => void
	onUploadingChange: (isUploading: boolean) => void
	isPending: boolean
}

export function AdminImageField({
	value,
	folder,
	onChange,
	onUploadingChange,
	isPending
}: IAdminImageFieldProps) {
	return (
		<div className='space-y-3'>
			<p className='text-sm font-medium'>Image</p>
			{value && (
				<Image
					src={mediaConfig.getFileUrl(folder, value)}
					alt='Selected image'
					width={160}
					height={120}
					className='h-auto max-h-28 w-auto max-w-40 rounded-lg object-contain'
					unoptimized
				/>
			)}
			<div className='flex flex-wrap gap-3'>
				<FileUpload
					label={value ? 'Replace image' : 'Upload image'}
					schema={productImageSchema}
					folder={folder}
					accept='image/jpeg,image/png,image/webp'
					isPending={isPending}
					onUpload={file => onChange(file.filename)}
					onUploadingChange={onUploadingChange}
				/>
				{value && (
					<Button
						size='small'
						variant='ghost'
						disabled={isPending}
						onClick={() => onChange(null)}
					>
						Remove image
					</Button>
				)}
			</div>
		</div>
	)
}
