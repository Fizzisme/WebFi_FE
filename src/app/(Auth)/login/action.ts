'use server'
import { cookies } from 'next/headers'

interface LoginPayload {
    email: string
    password: string
}
function extractToken(setCookie: string) {
    return setCookie.split(';')[0].split('=')[1]
}
// This func to get > 1 token in cookie
function parseSetCookie(header: string) {
    return header.split(/,(?=\s*\w+=)/).map(cookie => {
        const [pair] = cookie.split(';')
        const [name, value] = pair.split('=')
        return { name, value }
    })
}
export async function LoginAction(payload: LoginPayload) {
    try {
        const res = await fetch('http://localhost:8080/v1/member/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
            credentials: 'include',
        })

        const data = await res.json()
        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'Login failed',
            }
        }

        const setCookie = res.headers.get('set-cookie')
        if (setCookie) {
            const cookieStore = await cookies()
            const parsedCookies = parseSetCookie(setCookie)

            for (const c of parsedCookies) {
                cookieStore.set({
                    name: c.name,
                    value: c.value,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'lax',
                })
            }
        }

        return { success: true }
    } catch {
        return {
            success: false,
            error: 'Cannot connect to server',
        }
    }
}
