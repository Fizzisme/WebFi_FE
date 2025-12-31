import { cookies } from 'next/headers'
import { cache } from 'react'

interface IProfile {
    bio: string
    location: string
    website: string
    birthday: Date | null
    avatar: string
    coverImg: string
    gender: string
}

interface IWorkHistory {
    company: string
    position: string
    startDate: Date | null
    endDate: Date | null
    isCurrent: boolean
}

export interface IMember {
    id: string
    username: string
    email: string
    profile: IProfile
    workHistory: IWorkHistory[]
    dateJoined: string
}

export const getMember = cache(
    async (): Promise<IMember | null> => {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('access_token')?.value
        const res = await fetch('http://localhost:8080/v1/member/me', {
            headers: { Cookie: `access_token=${accessToken}` },
            cache: 'no-store',
        })
        if (!res.ok) return null

        return await res.json()
    },
)
