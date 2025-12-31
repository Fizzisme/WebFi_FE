import * as React from 'react'
import Header from '@/components/Header/Header'
import { getMember } from '@/service/member'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    return (
        <>
            <Header member={member} />

            {children}
        </>
    )
}
