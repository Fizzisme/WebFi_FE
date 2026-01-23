import { IProject } from '@/app/(main)/projects/[categoryId]/[subCategoryId]/ProjectList/ProjectList'
import { fetchGraphQL } from '@/lib/graphql'
import { notFound } from 'next/navigation'
import AuthorCard from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/AuthorCard/AuthorCard'
import ProjectActions from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/ProjectActions/ProjectActions'
import ImageGallery from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/ImageGallery/ImageGallery'
import Tabs from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/Tabs/Tabs'
import { parseGithubUrl } from '@/lib/utils'
import { Metadata } from 'next'

interface IProjectResponse {
    project: IProject
}

type Props = {
    params: Promise<{ projectId: string }>
}

// 1. Tối ưu SEO: Tạo metadata động dựa trên dữ liệu project
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { projectId } = await params
    const res = await fetchGraphQL<IProjectResponse>(`
        query { project(id: "${projectId}") { title, shortDescription } }
    `)
    const project = res.project

    if (!project) return { title: 'Project Not Found' }

    return {
        title: project.title,
        description: project.shortDescription,
    }
}

export interface IFileNode {
    name: string
    type: 'file' | 'folder'
    children?: IFileNode[]
}
interface GitHubTreeItem {
    path: string
    mode: string
    type: 'blob' | 'tree' | 'commit'
    sha: string
    size?: number
    url: string
}
interface InternalNode {
    name: string
    type: 'file' | 'folder'
    children: Record<string, InternalNode>
}

const buildFileTree = (paths: string[]): IFileNode[] => {
    const root: Record<string, InternalNode> = {}

    paths.forEach(path => {
        const parts = path.split('/')
        let current = root

        parts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = {
                    name: part,
                    type: index === parts.length - 1 ? 'file' : 'folder',
                    children: {},
                }
            }
            current = current[part].children
        })
    })

    const convert = (node: Record<string, InternalNode>): IFileNode[] => {
        return Object.values(node).map(n => ({
            name: n.name,
            type: n.type,
            children: n.type === 'folder' && Object.keys(n.children).length > 0 ? convert(n.children) : undefined,
        }))
    }

    return convert(root)
}

export default async function ProjectPage({ params }: Props) {
    const { projectId } = await params

    if (!projectId) notFound()

    const resGraphQL = await fetchGraphQL<IProjectResponse>(`
        query {
            project(id: "${projectId}") {
                _id
                title
                slug
                thumbnail
                name
                description
                shortDescription
                demoUrl
                gitHubUrl
                techStack
                tags
                images
                stats{
                    views
                    likes
                    comments
                }
                author {
                    id
                    name
                    email
                    avatar
                }
            }
        }
    `)

    const project = resGraphQL.project
    if (!project) notFound()
    const { owner, repo } = parseGithubUrl(project.gitHubUrl)
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`)
    const treeFiles: GitHubTreeItem[] = await res.json().then(data => data.tree)
    const paths = treeFiles.filter(item => item.type === 'blob').map(item => item.path)

    const fileTree: IFileNode[] = buildFileTree(paths)

    return (
        <main className="py-10">
            {/* Container cho phần content chính */}
            <div className="container mx-auto max-w-5xl px-4 lg:px-0">
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        <span className="text-primary mr-2">[{project.name}]</span>
                        {project.title}
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">{project.shortDescription}</p>
                </header>

                {/* Thumbnail - Thêm priority để load nhanh vì đây là ảnh chính */}
                <ImageGallery thumbnail={project.thumbnail} images={project.images} title={project.title} />

                {/* Author & Actions Wrapper */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <AuthorCard
                        name={project.author.name}
                        email={project.author.email}
                        avatar={project.author.avatar}
                    />
                    <ProjectActions demoUrl={project.demoUrl} gitHubUrl={project.gitHubUrl} />
                </div>
            </div>

            <Tabs project={project} fileTree={fileTree} repo={repo} />
        </main>
    )
}
