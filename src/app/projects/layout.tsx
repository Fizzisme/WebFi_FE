import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import Header from '@/components/Header/Header'
import { SideBar } from '@/components/SideBar/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            <main>{children}</main>
        </>
    )
}
