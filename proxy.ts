import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { canAccessAdmin } from '@/config/admin.config'
import { pagesConfig } from '@/config/pages.config'
import { SESSION_COOKIE_NAME } from '@/constants/auth.constants'
import type { IUser } from '@/types/user.types'

export async function proxy(request: NextRequest) {
	const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
	const isAuthPage = [
		pagesConfig.login,
		pagesConfig.register,
		pagesConfig.resetPassword
	].includes(request.nextUrl.pathname)
	const getGuestResponse = () =>
		isAuthPage
			? NextResponse.next()
			: NextResponse.redirect(new URL(pagesConfig.home, request.url))

	if (!sessionCookie) {
		return getGuestResponse()
	}

	const apiUrl = process.env.NEXT_PUBLIC_API_URL

	if (!apiUrl) {
		return getGuestResponse()
	}

	try {
		const response = await fetch(`${apiUrl}/users/me`, {
			headers: { cookie: request.headers.get('cookie') ?? '' },
			cache: 'no-store',
			signal: AbortSignal.timeout(5000)
		})

		if (response.status === 401) {
			const result = getGuestResponse()

			result.cookies.delete(SESSION_COOKIE_NAME)

			return result
		}

		if (!response.ok) {
			return getGuestResponse()
		}

		if (isAuthPage) {
			return NextResponse.redirect(new URL(pagesConfig.profile, request.url))
		}

		if (!request.nextUrl.pathname.startsWith('/admin')) {
			return NextResponse.next()
		}

		const user: IUser = await response.json()

		if (!canAccessAdmin(user.role, request.nextUrl.pathname)) {
			return NextResponse.rewrite(new URL('/404', request.url), { status: 404 })
		}

		return NextResponse.next()
	} catch {
		return getGuestResponse()
	}
}

export const config = {
	matcher: [
		'/login',
		'/register',
		'/reset-password',
		'/profile/:path*',
		'/orders/:path*',
		'/wishlist/:path*',
		'/seller/:path*',
		'/admin/:path*'
	]
}
