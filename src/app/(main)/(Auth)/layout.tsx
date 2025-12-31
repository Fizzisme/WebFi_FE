import Header from '@/components/Header/Header'
import { cookies } from 'next/headers'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    const res = await fetch(`http://localhost:8080/v1/member/me`, {
        method: 'GET',
        headers: {
            Cookie: `access_token=${accessToken}`,
        },
        cache: 'no-store',
    })

    return <main className="w-full h-full mt-30">{children}</main>
}
