import { SidebarTrigger } from '@/components/animate-ui/components/radix/sidebar'
import { Separator } from '@/components/ui/separator'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import * as React from 'react'
import { notFound } from 'next/navigation'
import { formatSlugToTitle } from '@/lib/utils'

export default async function CategoriesLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{
        categoryId?: string
        subCategoryId?: string
    }>
}) {
    const { categoryId, subCategoryId } = await params
    if (!subCategoryId || !categoryId) {
        notFound()
    }

    const subBreadCrumb: string = formatSlugToTitle(subCategoryId)
    const categoryBreadCrumb: string = formatSlugToTitle(categoryId)

    return (
        <main className="mt-[82px]">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Community&apos;s projects</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{categoryBreadCrumb}</BreadcrumbPage>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{subBreadCrumb}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            {children}
        </main>
    )
}
