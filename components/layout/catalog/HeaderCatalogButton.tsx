'use client'

import { LayoutGrid } from 'lucide-react'
import { useState } from 'react'

import { Modal } from '@/components/elements/modal/Modal'
import { CatalogMenu } from '@/components/layout/catalog/CatalogMenu'
import { Button } from '@/components/ui/button/Button'

export function HeaderCatalogButton() {
	const [isOpen, setIsOpen] = useState(false)

	const onClose = () => setIsOpen(false)

	return (
		<>
			<Button
				variant='secondary'
				aria-haspopup='dialog'
				aria-expanded={isOpen}
				onClick={() => setIsOpen(true)}
			>
				<LayoutGrid size={20} aria-hidden='true' />
				<span className='hidden sm:inline'>Catalog</span>
				<span className='sr-only sm:hidden'>Catalog</span>
			</Button>
			<Modal isOpen={isOpen} title='Catalog' size='large' onClose={onClose}>
				<CatalogMenu isOpen={isOpen} onClose={onClose} />
			</Modal>
		</>
	)
}
