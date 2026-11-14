import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { AdminLayout } from '@/app/(store)/admin/AdminLayout'

interface IAdminLayoutProps {
	children: ReactNode
}

export const metadata: Metadata = {
	robots: { index: false, follow: false }
}

export default function Layout({ children }: IAdminLayoutProps) {
	return <AdminLayout>{children}</AdminLayout>
}
