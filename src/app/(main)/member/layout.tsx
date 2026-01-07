import Image from 'next/image'
import { MapPin, Link as LinkIcon, Calendar, Briefcase } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import * as React from 'react'
import ActionButtons from '@/app/(main)/member/ActionButtons/ActionButtons'
import { getMember } from '@/service/member'
export default async function MemberLayout({ children }: { children: React.ReactNode }) {
    const member = await getMember()
    return (
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
                                <AvatarImage src={member?.profile?.avatar} className="object-cover" />
                                <AvatarFallback>Fizz</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Action Buttons (Right Side) */}
                        <ActionButtons />

                        {/* --- INFO SECTION --- */}
                        <div className="mt-2">
                            {/* Name & Verify */}
                            <div className="flex items-center gap-1">
                                <h1 className="text-xl font-extrabold text-gray-900 leading-tight">
                                    {member?.displayName}
                                </h1>
                                {/*<BadgeCheck*/}
                                {/*    className="w-5 h-5 text-blue-500 fill-blue-500 text-white"*/}
                                {/*    fill="currentColor"*/}
                                {/*    stroke="none"*/}
                                {/*/>*/}
                                {/* Note: Icon BadgeCheck của Lucide rỗng, để giống hệt cần style fill/stroke hoặc dùng SVG custom */}
                            </div>
                            <p className="text-[15px] text-gray-500">@{member?.username}</p>

                            {/* Bio */}
                            <p className="mt-3 text-[15px] text-gray-900 leading-normal">{member?.profile?.bio}</p>

                            {/* Meta Data */}
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-3 text-[15px] text-gray-500">
                                {member?.workHistory &&
                                    member?.workHistory.map(w => (
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={18} />
                                            <span>{w.company}</span>
                                        </div>
                                    ))}

                                {member?.profile?.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin size={18} />
                                        <span>{member?.profile?.location}</span>
                                    </div>
                                )}

                                {member?.profile?.website && (
                                    <div className="flex items-center gap-1">
                                        <LinkIcon size={18} />
                                        <a href={member?.profile?.website} className="text-blue-500 hover:underline">
                                            fb.com
                                        </a>
                                    </div>
                                )}

                                {member?.profile?.birthday && (
                                    <div className="flex items-center gap-1">
                                        <span className="text-lg leading-none">🎈</span>
                                        <span>{member?.profile?.birthday}</span>
                                    </div>
                                )}

                                {member?.dateJoined && (
                                    <div className="flex items-center gap-1">
                                        <Calendar size={18} />
                                        <span>{member?.dateJoined}</span>
                                    </div>
                                )}
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
    )
}
