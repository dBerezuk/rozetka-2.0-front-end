import { ChevronRight, LayoutGrid } from 'lucide-react'
import Image from 'next/image'

import { mediaConfig } from '@/config/media.config'
import type { ICategory } from '@/types/category.types'
import { cn } from '@/utils/cn.util'

interface ICatalogCategoryButtonProps {
	category: ICategory
	isActive: boolean
	onSelect: () => void
}

export function CatalogCategoryButton({
	category,
	isActive,
	onSelect
}: ICatalogCategoryButtonProps) {
	return (
		<button
			type='button'
			aria-pressed={isActive}
			onMouseEnter={onSelect}
			onFocus={onSelect}
			onClick={onSelect}
			className={cn(
				'flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none',
				isActive && 'bg-primary/10 text-primary'
			)}
		>
			{category.iconPathName ? (
				<Image
					src={mediaConfig.getUrl(category.iconPathName)}
					alt=''
					width={24}
					height={24}
					className='size-6 shrink-0 object-contain brightness-0 opacity-70'
					unoptimized
				/>
			) : (
				<LayoutGrid size={22} aria-hidden='true' className='shrink-0' />
			)}
			<span className='flex-1'>{category.title}</span>
			<ChevronRight size={16} aria-hidden='true' className='shrink-0' />
		</button>
	)
}
