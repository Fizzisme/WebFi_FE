import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar'
import { SideBar } from '@/components/SideBar/SideBar'
import { getMember } from '@/service/member'
import { fetchGraphQL } from '@/lib/graphql'

export interface subCategory {
    _id?: string
    title?: string
    slug?: string
    order?: string
}

export interface IProjectCategory {
    title?: string
    key?: string
    slug?: string
    _id?: string
    icon?: string
    subCategories?: subCategory[]
}

interface IProjectCategoriesResponse {
    projectCategories: IProjectCategory[]
}

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    const res = await fetchGraphQL<IProjectCategoriesResponse>(`
     query {
          projectCategories {
          _id
            key
            title
            icon
            slug
            subCategories {
                title
                slug
            }
          }
        }`)

    const projectCategories = res.projectCategories

    return (
        <>
            <SidebarProvider>
                <SideBar member={member} projectCategories={projectCategories} />
                <SidebarInset>
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
