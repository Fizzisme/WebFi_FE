import Header from '@/HomeComponents/Header/Header'
import Description from '@/HomeComponents/Description/Description'

import SeeTop3 from '@/HomeComponents/Description/SeeTop3/SeeTop3'
import MainCard from '@/HomeComponents/MainCard/MainCard'
import { cookies } from 'next/headers'
import { IMember } from '@/app/projects/layout'

const getMember = async (): Promise<IMember | null> => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value
    const res = await fetch('http://localhost:8080/v1/member/me', {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: 'no-store',
    })
    if (!res.ok) return null

    return await res.json()
}

export default async function Home() {
    const member = await getMember()
    return (
        <div className="px-20">
            <Header member={member} />
            <Description />
            <MainCard />
            <SeeTop3 />
        </div>
    )
}
