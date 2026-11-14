import type { ReactNode } from 'react'

import { Layout } from '@/components/layout/Layout'

interface IStoreLayoutProps {
	children: ReactNode
}

export const revalidate = 60

export default function StoreLayout({ children }: IStoreLayoutProps) {
	return <Layout>{children}</Layout>
}
