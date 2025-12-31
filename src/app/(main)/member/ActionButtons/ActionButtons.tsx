'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { LogOut } from '@/components/animate-ui/icons/log-out'
import * as React from 'react'
import { logoutMember } from '@/app/(main)/(Auth)/action'

export default function ActionButtons() {
    const handleClickLogout = async () => {
        return await logoutMember()
    }
    return (
        <>
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
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2" onClick={handleClickLogout}>
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
        </>
    )
}
