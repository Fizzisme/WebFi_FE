import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar'
import Header from '@/components/Header/Header'
import { SideBar } from '@/components/SideBar/SideBar'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <SidebarProvider>
                <SideBar />
                <SidebarInset>
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
