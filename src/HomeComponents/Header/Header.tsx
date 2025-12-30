'use client'

import { User } from '@/components/animate-ui/icons/user'
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler'
import Link from 'next/link'
import { useAuth } from '@/useHook/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IMember } from '@/app/projects/layout'

interface HeaderProps {
    member: IMember | null
}

export default function Header({ member }: HeaderProps) {
    const { user, loading } = useAuth()
    return (
        <div className="flex justify-between h-[82px]">
            <div className="flex items-center text-[80px]">Fi</div>
            <div className="flex items-center justify-between gap-5">
                {!loading &&
                    (user ? (
                        <Link href="/member/post">
                            <Avatar className="h-[32px] w-[32px] cursor-pointer border-black border-2 dark:border-white">
                                <AvatarImage src={member?.profile?.avatar} />
                                <AvatarFallback>{member?.username ?? 'Guest'}</AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Link href="/login" className="border-[2px]   border-[#000] dark:border-[#fff] rounded-full">
                            <User animateOnHover className="size-7 cursor-pointer" strokeWidth={1.5} />
                        </Link>
                    ))}
                <div className="border-[2px]   border-[#000] dark:border-[#fff] rounded   h-[30px] w-[30px] flex items-center justify-center cursor-pointer">
                    <ThemeTogglerButton />
                </div>
            </div>
        </div>
    )
}
