import Header from '@/components/Header/Header'
import Image from 'next/image'
import Link from 'next/link'
import {
    MapPin,
    Link as LinkIcon,
    Calendar,
    Briefcase,
    MoreHorizontal,
    Mail,
    BadgeCheck,
    Repeat,
    MoreHorizontal as MoreIcon,
    Plus,
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu'
import { LogOut } from '@/components/animate-ui/icons/log-out'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import * as React from 'react'
import { IMember } from '@/app/projects/layout'
import { cookies } from 'next/headers'

const getMember = async (): Promise<IMember | null> => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value
    const res = await fetch('http://localhost:8080/v1/member/me', {
        headers: { Cookie: `access_token=${accessToken}` },
        cache: 'no-store',
    })
    if (!res.ok) return null

    return await res.json()
}
export default async function MemberLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    return (
        <>
            <Header member={member} />
            <main className="px-5">
                <div className="min-h-screen flex justify-center">
                    {/* Main Container*/}
                    <div className="w-full max-w-[1200px] border-x border-gray-100 min-h-screen pb-20">
                        {/* --- COVER IMAGE --- */}
                        <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] transition-all duration-500 ease-in-out bg-gray-200">
                            <Image
                                src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/484545053_666079059124859_7323931166720934663_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeF7_Ltl6UyOlTZXbwn0LxGuTfBYX3WCXg9N8FhfdYJeD75HO6mC9VqF_7ye2vSQWexmeLXcVKpDxuFdxOoU_B8B&_nc_ohc=btTrh6GU1EYQ7kNvwGMoqf2&_nc_oc=Adm7qFT88pcfQQtUBMmX3p5bJFL8Ff8e2buD0L0aP3vErhTy5ODmi60qJBANX58nIwhBp_7l1u1SxDaIEqjcX2hz&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=Az5Rpps0AyBTe1hR-Uyykg&oh=00_Afmze1QK7Nl5sTPaR9W6J3UsA0baotZDzb72ienxxCr4JA&oe=695663BF"
                                alt="Cover"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* --- PROFILE HEADER ACTIONS & AVATAR --- */}
                        <div className="relative px-4 pt-3 pb-2">
                            {/* Avatar Area */}
                            <div className="absolute top-0 left-4 -translate-y-1/2">
                                <Avatar className=" size-20 sm:size-25 md:size-30 lg:size-35 border-4 border-white bg-white shadow-sm">
                                    <AvatarImage
                                        src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/585541175_857469936652436_7584848147068491686_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEY_nzG0t54rpO5mmbjlAZCIRY0qvYfS-chFjSq9h9L53i17sPNo3R-Lhx8fJ8Do1mfA-0TCTrvABjXBE0R4tO2&_nc_ohc=e52vJSbuFVgQ7kNvwGm-ebl&_nc_oc=Adlo_flPGm3gVZYbskcWKItZJUH6_CqLEbHA0YTZYZuVdLgyENUCs5Cwa1eK8B6FKewUM3EtgzLJaYGF9joA9Nyr&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=w54fqWaPfFWoDALcdA0kSQ&oh=00_AfkQlD8oEZHqWGlVftUrMKVeQMiV3fZbqxLeSRagM35EmA&oe=69567AC9"
                                        className="object-cover"
                                    />
                                    <AvatarFallback>Fizz</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Action Buttons (Right Side) */}
                            <div className="flex justify-end gap-2 mb-8 sm:mb-10">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">
                                            <MoreHorizontal size={20} className="text-gray-700" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                        align="end"
                                        sideOffset={4}
                                    >
                                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                                            Settings
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="gap-2 p-2">
                                            <LogOut animateOnHover />
                                            <div className="font-medium text-muted-foreground">Log out</div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/*<button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition">*/}
                                {/*    <Mail size={20} className="text-gray-700" />*/}
                                {/*</button>*/}
                                {/*<button className="bg-black hover:bg-gray-800 text-white font-bold px-5 py-2 rounded-full text-[15px] transition">*/}
                                {/*    Follow*/}
                                {/*</button>*/}
                            </div>

                            {/* --- INFO SECTION --- */}
                            <div className="mt-2">
                                {/* Name & Verify */}
                                <div className="flex items-center gap-1">
                                    <h1 className="text-xl font-extrabold text-gray-900 leading-tight">Tuan Phi</h1>
                                    {/*<BadgeCheck*/}
                                    {/*    className="w-5 h-5 text-blue-500 fill-blue-500 text-white"*/}
                                    {/*    fill="currentColor"*/}
                                    {/*    stroke="none"*/}
                                    {/*/>*/}
                                    {/* Note: Icon BadgeCheck của Lucide rỗng, để giống hệt cần style fill/stroke hoặc dùng SVG custom */}
                                </div>
                                <p className="text-[15px] text-gray-500">@fizz_isme</p>

                                {/* Bio */}
                                <p className="mt-3 text-[15px] text-gray-900 leading-normal">
                                    This product was built by me
                                </p>

                                {/* Meta Data */}
                                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-3 text-[15px] text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Briefcase size={18} />
                                        <span>ĐH CNTT</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={18} />
                                        <span>Viet Nam</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <LinkIcon size={18} />
                                        <a
                                            href="https://www.facebook.com/Fi.is.me.hello?locale=vi_VN"
                                            className="text-blue-500 hover:underline"
                                        >
                                            fb.com
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {/* Icon Balloon sinh nhật thay bằng map pin tạm hoặc icon cake */}
                                        <span className="text-lg leading-none">🎈</span>
                                        <span>Born September 9, 2005</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={18} />
                                        <span>Joined December 2025</span>
                                    </div>
                                </div>

                                {/* Follow Stats */}
                                <div className="flex gap-5 mt-3 text-[15px]">
                                    <div className="hover:underline cursor-pointer">
                                        <span className="font-bold text-gray-900">143</span>{' '}
                                        <span className="text-gray-500">Following</span>
                                    </div>
                                    <div className="hover:underline cursor-pointer">
                                        <span className="font-bold text-gray-900">149</span>{' '}
                                        <span className="text-gray-500">Followers</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- TABS --- */}
                        <div className="flex border-b border-gray-200 mt-2">
                            {['Posts', 'Projects', 'Following', 'Follower'].map((tab, index) => (
                                <div key={tab} className="flex-1 hover:bg-gray-50 transition cursor-pointer relative">
                                    <div
                                        className={`flex items-center justify-center h-[53px] text-[15px] font-medium ${
                                            index === 0 ? 'text-gray-900 font-bold' : 'text-gray-500'
                                        }`}
                                    >
                                        {tab}
                                        {index === 0 && (
                                            <div className="absolute bottom-0 w-14 h-[4px] bg-blue-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- POST CONTENT (MOCKUP) --- */}
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}
