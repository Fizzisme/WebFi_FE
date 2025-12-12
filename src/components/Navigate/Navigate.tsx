export default function Navigate() {
    return (
        <div className="flex gap-7 px-5 items-center font-semibold rounded-3xl fixed left-1/2 -translate-x-1/2 top-4 w-fit h-[50px] backdrop-blur-[10px] z-20">
            <p className="cursor-pointer hover:text-gray-600 transition-colors">Projects</p>
            <p className="cursor-pointer hover:text-gray-600 transition-colors">Members</p>
            <p className="cursor-pointer hover:text-gray-600 transition-colors">Posts</p>
            <p className="cursor-pointer hover:text-gray-600 transition-colors">Contact Us</p>
        </div>
    )
}
