import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar'
import Header from '@/components/Header/Header'
import { SideBar } from '@/components/SideBar/SideBar'
import { cookies } from 'next/headers'

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

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    return (
        <>
            <Header member={member} />
            <SidebarProvider>
                <SideBar member={member} />
                <SidebarInset>
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
