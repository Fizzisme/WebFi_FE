'use client'
import { User } from '@/components/animate-ui/icons/user'
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler'
import Search from '@/components/Header/Search/Search'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/useHook/useAuth'
import { IMember } from '@/service/member'
import { getInitials } from '@/lib/utils'

interface HeaderProps {
    member: IMember | null
}

export default function Header({ member }: HeaderProps) {
    const { user, loading } = useAuth()
    return (
        <header className="fixed top-0 left-0 right-0 h-[82px] bg-white dark:bg-sidebar border-b border-gray-200 dark:border-none  z-10 flex items-center justify-between px-6">
            <Link href="/" className="text-[20px] font-semibold">
                Fi
            </Link>

            <div className="flex items-center gap-3">
                <Search />

                <a
                    href="https://github.com/Fizzisme/WebFi_FE"
                    className="border-[2px] border-[#000]  dark:border-white   rounded flex items-center justify-center"
                    style={{ height: '25px', width: '25px' }}
                >
                    <Github className="size-5 cursor-pointer" strokeWidth={1.5} />
                </a>

                {!loading &&
                    (user ? (
                        <Link href="/member/post">
                            <Avatar className="h-[28px] w-[28px] cursor-pointer border-2 border-black dark:border-white">
                                <AvatarImage src={member?.profile?.avatar} />
                                <AvatarFallback>{getInitials(member?.username ?? 'Guest')}</AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="border-[2px] h-[25px] w-[25px] border-black dark:border-white rounded-full flex items-center justify-center"
                        >
                            <User className="size-5" strokeWidth={1.5} />
                        </Link>
                    ))}

                <div className="border-[2px] border-[#000] dark:border-white rounded h-[25px] w-[25px] flex items-center justify-center cursor-pointer">
                    <ThemeTogglerButton />
                </div>
            </div>
        </header>
    )
}
