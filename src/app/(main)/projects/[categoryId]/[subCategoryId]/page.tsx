import { Suspense } from 'react'
import ProjectSkeleton from '@/app/(main)/projects/[categoryId]/[subCategoryId]/ProjectSkeleton/ProjectSkeleton'
import ProjectList from '@/app/(main)/projects/[categoryId]/[subCategoryId]/ProjectList/ProjectList'
import { notFound } from 'next/navigation'
export default async function CategoriesPage({
    params,
}: {
    params: Promise<{
        categoryId?: string
        subCategoryId?: string
    }>
}) {
    const { categoryId, subCategoryId } = await params
    if (!subCategoryId || !categoryId) {
        notFound()
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Suspense fallback={<ProjectSkeleton />}>
                <ProjectList categoryId={categoryId} subCategoryId={subCategoryId} />
            </Suspense>
        </div>
    )
}
