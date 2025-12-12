import { User } from '@/components/animate-ui/icons/user'
import { ThemeTogglerButton } from '@/components/animate-ui/components/buttons/theme-toggler'

export default function Header() {
    return (
        <div className="flex justify-between h-[82px]">
            <div className="flex items-center text-[80px]">Fi</div>
            <div className="flex items-center justify-between gap-5">
                <div className="border-[2px]   border-[#000] dark:border-[#fff] rounded-full">
                    <User animateOnHover className="size-7 cursor-pointer" strokeWidth={1.5} />
                </div>
                <div className="border-[2px]   border-[#000] dark:border-[#fff] rounded   h-[30px] w-[30px] flex items-center justify-center cursor-pointer">
                    <ThemeTogglerButton />
                </div>
            </div>
        </div>
    )
}
