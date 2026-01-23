'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { IProject } from '@/app/(main)/projects/[categoryId]/[subCategoryId]/ProjectList/ProjectList'
import { IFileNode } from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/page'
import RenderTree from '@/app/(main)/projects/[categoryId]/[subCategoryId]/[projectId]/Tabs/RenderTree/RenderTree'
import { Files, SubFiles, FolderItem, FolderContent } from '@/components/animate-ui/components/radix/files'
import { FolderOpen } from 'lucide-react'
export default function ProjectTabs({
    project,
    fileTree,
    repo,
}: {
    project: IProject
    fileTree: IFileNode[]
    repo: string
}) {
    const [activeTab, setActiveTab] = useState<'info' | 'source' | 'comments'>('info')

    return (
        <div className="w-full flex flex-col">
            {/* --- PHẦN NAVIGATION --- */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto max-w-5xl px-4 lg:px-0">
                    <div className="flex gap-8">
                        {['Info', 'Source code', 'Comments'].map(item => {
                            const value = item.toLowerCase().split(' ')[0] as 'info' | 'source' | 'comments'
                            const isActive = activeTab === value

                            return (
                                <button
                                    key={value}
                                    onClick={() => setActiveTab(value)}
                                    className={cn(
                                        // Layout & Spacing
                                        'relative px-0 py-3 text-base font-medium outline-none transition-colors duration-200',
                                        // Xóa border-b cứng cũ đi, chỉ giữ logic màu chữ
                                        isActive
                                            ? 'text-black dark:text-white'
                                            : 'text-gray-400 hover:text-black dark:hover:text-gray-200',
                                    )}
                                >
                                    {item}

                                    {/* --- MAGIC UNDERLINE --- */}
                                    {/* Chỉ render cái gạch chân này ở tab đang Active */}
                                    {isActive && (
                                        <motion.div
                                            // layoutId là chìa khóa: Framer Motion sẽ nhận diện ID này
                                            // và tự động animate sự thay đổi vị trí của nó giữa các button
                                            layoutId="active-tab-underline"
                                            // Style cho gạch chân: nằm dưới cùng (bottom-0), cao 2px, màu đen
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white"
                                            // Tinh chỉnh độ nảy (spring) cho mượt
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* --- PHẦN NỘI DUNG VỚI MOTION (Giữ nguyên) --- */}
            <div className="container mx-auto max-w-5xl px-4 lg:px-0 min-h-[200px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="mt-6"
                    >
                        {activeTab === 'info' && (
                            <article className="space-y-8">
                                {/* Description */}
                                <section>
                                    <h2 className="text-lg md:text-xl font-semibold mb-3">Description</h2>
                                    <div className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                        {project.description}
                                    </div>
                                </section>
                                <Separator className="my-8" />
                                <div>{project.stats.comments}</div>
                                <Separator className="my-8" />

                                {/* Tech Stack & Tags */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.techStack?.length > 0 && (
                                        <section>
                                            <h2 className="text-lg md:text-xl font-semibold mb-3">Tech Stack</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech: string) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs md:text-sm text-gray-700 dark:text-gray-300"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {project.tags?.length > 0 && (
                                        <section>
                                            <h2 className="text-lg md:text-xl font-semibold mb-3">Tags</h2>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 rounded-full text-xs md:text-sm font-medium"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </article>
                        )}

                        {activeTab === 'source' && (
                            <div className="relative size-full rounded-2xl border bg-background overflow-auto">
                                <Files className="w-full" defaultOpen={[repo]}>
                                    <FolderItem value={repo}>
                                        <div className="px-3 py-2 font-medium text-sm flex items-center gap-2">
                                            <FolderOpen className="size-5" />
                                            {repo}
                                        </div>

                                        <FolderContent>
                                            <SubFiles>
                                                <RenderTree nodes={fileTree} />
                                            </SubFiles>
                                        </FolderContent>
                                    </FolderItem>
                                </Files>
                            </div>
                        )}

                        {activeTab === 'comments' && (
                            <div className="py-10 text-center text-gray-500">
                                <h3 className="text-lg font-medium mb-2">No comments yet</h3>
                                <p>Be the first to comment on this project.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
