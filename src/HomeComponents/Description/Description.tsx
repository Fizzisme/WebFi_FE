'use client'

import { Button } from '@/components/animate-ui/components/buttons/button'
import { motion } from 'framer-motion'
import { EyeClosed, Eye } from 'lucide-react'
import LogoFramework from '@/HomeComponents/LogoFramework/LogoFramework'

export default function Description() {
    return (
        <div className="text-center mt-20 flex flex-col items-center">
            <div className="relative w-[70%] min-h-[48px]">
                {/* Layer mờ dưới */}
                <motion.p
                    className="text-5xl font-medium select-none text-black/30 absolute inset-0"
                    initial={{ filter: 'blur(8px)' }}
                    animate={{ filter: 'blur(0px)' }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                >
                    Showcase your projects to the World
                </motion.p>

                {/* Layer sáng trên */}
                <motion.p
                    className="text-5xl font-medium select-none absolute inset-0"
                    initial={{
                        filter: 'blur(8px)',
                        opacity: 0,
                        x: -30,
                    }}
                    animate={{
                        filter: 'blur(0px)',
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 1.6,
                        ease: 'easeOut',
                    }}
                >
                    <motion.span
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                        transition={{
                            duration: 1.6,
                            ease: 'easeOut',
                        }}
                        className="inline-block pb-[10px]"
                    >
                        Showcase your projects to the World
                    </motion.span>
                </motion.p>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="mt-6 w-[55%] text-lg leading-relaxed text-[#737373]"
            >
                A modern platform where you can share your personal web projects, explore work from other creators and
                exchange insights with a community of developers who love creating just as much as you do.
            </motion.p>

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
                className="flex gap-3 mt-5"
            >
                <Button className="cursor-pointer">Get started</Button>

                <Button variant="ghost" className="group w-[150px] flex items-center justify-between cursor-pointer">
                    <span>View projects</span>

                    <span className="relative w-5 h-5">
                        <EyeClosed className="size-5 transition-all duration-300 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 absolute inset-0" />
                        <Eye className="size-5 transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 absolute inset-0" />
                    </span>
                </Button>
            </motion.div>

            {/*Logo framework*/}
            <LogoFramework />
        </div>
    )
}
