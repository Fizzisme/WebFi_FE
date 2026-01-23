import { fetchGraphQL } from '@/lib/graphql'
import Image from 'next/image'
import Link from 'next/link'

interface IStat {
    views: number
    likes: number
    comments: number
}
interface IAuthor {
    id: string
    name: string
    avatar?: string
    email: string
}
export interface IProject {
    _id: string

    name: string
    title: string
    slug: string
    description: string
    shortDescription: string

    thumbnail: string
    images: string[]

    demoUrl: string
    gitHubUrl: string

    techStack: string[]
    features: string[]
    status: 'draft' | 'published' | 'archived'

    stats: IStat
    tags: string[]
    author: IAuthor
}
interface IProjectResponse {
    projectsBySubCategory: IProject[]
}

export default async function ProjectList({
    subCategoryId,
    categoryId,
}: {
    subCategoryId: string
    categoryId: string
}) {
    const res = await fetchGraphQL<IProjectResponse>(`
    query {
        projectsBySubCategory(subSlug: "${subCategoryId}") {
        _id
        title
        slug
        thumbnail
        name
          }
        }   
    `)

    const projects = res.projectsBySubCategory
    return (
        <div
            className="grid gap-4"
            style={{
                gridTemplateColumns: 'repeat(6, 1fr)',
            }}
        >
            {projects.map((project, index) => {
                const rowIndex = index % 5
                const isOddRow = rowIndex < 3
                return (
                    <Link
                        key={project.slug}
                        className="relative aspect-video rounded-xl bg-muted/50 overflow-hidden group cursor-pointer"
                        style={{
                            gridColumn: isOddRow ? 'span 2' : 'span 3',
                        }}
                        href={`/projects/${categoryId}/${subCategoryId}/${project._id}`}
                    >
                        {/* Image với fill */}
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay với thông tin project */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                                <p className="text-sm text-gray-300">{project.title}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
