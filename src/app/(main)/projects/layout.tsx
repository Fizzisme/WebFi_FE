import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar'
import { SideBar } from '@/components/SideBar/SideBar'
import { getMember } from '@/service/member'

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    return (
        <>
            <SidebarProvider>
                <SideBar member={member} />
                <SidebarInset>
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
