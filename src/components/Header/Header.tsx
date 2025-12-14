import { User } from '@/components/animate-ui/icons/user'
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler'
import Search from '@/components/Header/Search/Search'

import { Github } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-[82px] bg-white dark:bg-sidebar border-b border-gray-200 dark:border-none  z-10 flex items-center justify-between px-6">
            <Link href="/" className="text-[20px] font-semibold">
                Fi
            </Link>

            <div className="flex items-center gap-3">
                <Search />

                <a
                    href="https://github.com/Fizzisme/WebFi_FE"
                    className="border-[2px] border-[#000]   rounded flex items-center justify-center"
                    style={{ height: '25px', width: '25px' }}
                >
                    <Github className="size-5 cursor-pointer" strokeWidth={1.5} />
                </a>

                <div className="border-[2px] h-[25px] w-[25px] border-[#000]  rounded-full flex items-center justify-center">
                    <User animateOnHover className="size-5 cursor-pointer" strokeWidth={1.5} />
                </div>

                <div className="border-[2px] border-[#000] rounded h-[25px] w-[25px] flex items-center justify-center">
                    <ThemeTogglerButton />
                </div>
            </div>
        </header>
    )
}
