import { BadgeCheck, MoreHorizontal as MoreIcon, Repeat } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function PostPage() {
    return (
        <>
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                {/* Repost Label */}
                <div className="flex items-center gap-2 text-gray-500 text-[13px] font-bold mb-1 ml-8">
                    <Repeat size={16} />
                    <span>You reposted</span>
                </div>

                <div className="flex gap-3">
                    {/* User Avatar Tiny */}
                    <div className="shrink-0">
                        <Avatar className="w-10 h-10">
                            {/* Placeholder Avatar cho user khác */}
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>MM</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Post Body */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[15px]">
                                <span className="font-bold text-gray-900 hover:underline">Modest Mitkus</span>
                                <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
                                <span className="text-gray-500">@ModestMitkus</span>
                                <span className="text-gray-500">·</span>
                                <span className="text-gray-500 hover:underline">Nov 20, 2023</span>
                            </div>
                            <button className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full p-1 -mr-2">
                                <MoreIcon size={18} />
                            </button>
                        </div>

                        <div className="text-[15px] text-gray-900 mt-1 space-y-4">
                            <p>Everyone should own products that earn $10,000/month.</p>
                            <p>Unfortunately, most people have no idea how...</p>
                            <p>Here’s my tested blueprint to go from $0 → $10,000/month:</p>
                        </div>

                        {/* Post Image Mockup */}
                        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 h-[280px] w-full relative">
                            {/* Ảnh đen trong post mockup */}
                            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-gray-700/50 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
