import { SidebarInset, SidebarProvider } from '@/components/animate-ui/components/radix/sidebar'
import { SideBar } from '@/components/SideBar/SideBar'
import { getMember } from '@/service/member'
import { env } from '@/config/environment'

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
async function fetchCategories() {
    const res = await fetch(env.GRAPHQL_ENDPOINT!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
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
        }
      `,
        }),
        cache: 'no-store',
    })

    const json = await res.json()
    return json.data.projectCategories
}

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    const projectCategories = await fetchCategories()
    console.log(projectCategories)

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
