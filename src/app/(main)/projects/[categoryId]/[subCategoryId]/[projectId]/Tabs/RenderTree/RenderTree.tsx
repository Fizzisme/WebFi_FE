'use client'
import { IFileNode } from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/page'
import {
    FileItem,
    FolderItem,
    FolderTrigger,
    FolderContent,
    SubFiles,
} from '@/components/animate-ui/components/radix/files'
import { FileJsonIcon, FileCodeIcon } from 'lucide-react'
import ReactIcon from '@/components/file-icons/ReactIcon'
import TsIcon from '@/components/file-icons/TsIcon'
import JsIcon from '@/components/file-icons/JsIcon'
import GitIgnoreIcon from '@/components/file-icons/GitIgnoreIcon'
import HtmlIcon from '@/components/file-icons/HtmlIcon'
import CssIcon from '@/components/file-icons/CssIcon'
import EnvIcon from '@/components/file-icons/EnvIcon'
import ReadmeIcon from '@/components/file-icons/ReadmeIcon'

export function getFileIcon(fileName: string) {
    const ext = fileName
        .split('.')
        .pop()
        ?.toLowerCase()

    switch (ext) {
        case 'tsx':
        case 'jsx':
            return ReactIcon
        case 'ts':
            return TsIcon
        case 'js':
            return JsIcon
        case 'json':
            return FileJsonIcon
        case 'gitignore':
            return GitIgnoreIcon

        case 'html':
            return HtmlIcon
        case 'css':
            return CssIcon
        case 'env':
            return EnvIcon
        case 'md':
            return ReadmeIcon

        default:
            return FileCodeIcon // fallback
    }
}

export default function RenderTree({ nodes }: { nodes: IFileNode[] }) {
    return (
        <>
            {nodes.map(node => {
                if (node.type === 'folder') {
                    return (
                        <FolderItem key={node.name} value={node.name}>
                            <FolderTrigger gitStatus="modified">{node.name}</FolderTrigger>

                            <FolderContent>
                                <SubFiles>{node.children && <RenderTree nodes={node.children} />}</SubFiles>
                            </FolderContent>
                        </FolderItem>
                    )
                }

                return (
                    <FileItem
                        icon={getFileIcon(node.name)}
                        key={node.name}
                        className={
                            node.name.endsWith('.tsx') || node.name.endsWith('.jsx')
                                ? 'text-sky-500'
                                : node.name.endsWith('.js')
                                ? 'text-yellow-400'
                                : node.name.endsWith('.ts')
                                ? 'text-blue-500'
                                : node.name.endsWith('.html')
                                ? 'text-orange-500'
                                : node.name.endsWith('.css')
                                ? 'text-blue-500'
                                : node.name.endsWith('.env')
                                ? 'text-emerald-500'
                                : ''
                        }
                    >
                        {node.name}
                    </FileItem>
                )
            })}
        </>
    )
}
