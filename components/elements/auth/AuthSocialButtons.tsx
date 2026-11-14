import Image from 'next/image'

import { Button } from '@/components/ui/button/Button'

export function AuthSocialButtons() {
	return (
		<div className='space-y-3'>
			<div className='flex items-center gap-3 text-xs text-gray-500'>
				<span className='h-px flex-1 bg-gray-200' />
				<span>Or continue with</span>
				<span className='h-px flex-1 bg-gray-200' />
			</div>
			<div className='grid grid-cols-2 gap-3'>
				<Button type='button' variant='outline'>
					<Image
						src='/google.svg'
						alt=''
						width={20}
						height={20}
						className='shrink-0'
					/>
					Google
				</Button>
				<Button type='button' variant='outline'>
					<Image
						src='/facebook.svg'
						alt=''
						width={20}
						height={20}
						className='shrink-0'
					/>
					Facebook
				</Button>
			</div>
		</div>
	)
}
