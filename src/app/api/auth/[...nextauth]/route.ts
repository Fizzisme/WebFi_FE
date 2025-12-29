import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

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

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            const payload = {
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account?.provider,
                providerId: user.id,
            }

            const res = await fetch('http://localhost:8080/v1/member/google-login', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
            })

            const data = await res.json()

            if (!res.ok) {
                return false
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

            return true
        },
        async session({ session, token }) {
            // Customize session data
            return session
        },
    },
    pages: {
        signIn: '/login', // Trang login của bạn
    },
})

export { handler as GET, handler as POST }
