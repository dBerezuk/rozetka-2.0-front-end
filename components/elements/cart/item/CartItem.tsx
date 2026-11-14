import { Trash2 } from 'lucide-react'
import Link from 'next/link'

import { CartItemImage } from '@/components/elements/cart/item/CartItemImage'
import { CartQuantity } from '@/components/elements/cart/item/CartQuantity'
import { Button } from '@/components/ui/button/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { pagesConfig } from '@/config/pages.config'
import type { ICartLine } from '@/types/cart.types'
import { formatPrice } from '@/utils/format-price.util'

interface ICartItemProps {
	line: ICartLine
	isDisabled: boolean
	onChangeQuantity: (quantity: number) => void
	onClose: () => void
	onRetry: () => void
}

export function CartItem({
	line,
	isDisabled,
	onChangeQuantity,
	onClose,
	onRetry
}: ICartItemProps) {
	const options = line.variant?.optionValues
		.map(
			({ optionValue }) => `${optionValue.option.title}: ${optionValue.value}`
		)
		.join(' / ')

	return (
		<li className='flex gap-3 py-5 first:pt-0 last:pb-0 sm:gap-4'>
			<CartItemImage line={line} />
			<div className='min-w-0 flex-1 space-y-3'>
				<div className='flex items-start justify-between gap-3'>
					<div className='min-w-0 space-y-1'>
						{line.isLoading ? (
							<Skeleton className='h-5 w-40 max-w-full' />
						) : (
							<Link
								href={pagesConfig.getProduct(line.productSlug)}
								onClick={onClose}
								className='text-sm font-medium break-words hover:text-primary focus-visible:outline-primary'
							>
								{line.product?.title ?? 'Product unavailable'}
							</Link>
						)}
						{options && <p className='text-xs text-gray-500'>{options}</p>}
					</div>
					<Button
						variant='ghost'
						size='icon'
						className='size-9 shrink-0 text-gray-500 hover:text-red-600'
						aria-label={`Remove ${line.product?.title ?? 'product'} from cart`}
						disabled={isDisabled}
						onClick={() => onChangeQuantity(0)}
					>
						<Trash2 size={16} aria-hidden='true' />
					</Button>
				</div>
				{line.isError && (
					<div role='alert' className='text-xs text-gray-500'>
						Unable to load this variant.{' '}
						<button
							type='button'
							className='cursor-pointer text-primary underline'
							onClick={onRetry}
						>
							Try again
						</button>{' '}
						or remove it.
					</div>
				)}
				<div className='flex flex-wrap items-center justify-between gap-3'>
					<CartQuantity
						quantity={line.quantity}
						isDisabled={isDisabled || !line.variant}
						onChange={onChangeQuantity}
					/>
					<p className='text-lg font-semibold tabular-nums'>
						{line.variant
							? formatPrice(Number(line.variant.price) * line.quantity)
							: '—'}
					</p>
				</div>
			</div>
		</li>
	)
}
