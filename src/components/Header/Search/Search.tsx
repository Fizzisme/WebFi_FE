import { Input } from '@/components/ui/input'
import { Search as SearchIcon } from '@/components/animate-ui/icons/search'

export default function Search() {
    return (
        <div
            className=" border-2 p-1 px-[6px] hover:bg-white  border-[#000] rounded-md bg-[#f6f6f7] text-gray-500 text-xs select-none cursor-pointer flex gap-1"
            style={{ width: '200px', height: '25px', background: '#f6f6f7' }}
        >
            <div className="relative top-[-2px]">
                <SearchIcon animateOnHover className={'x size-4'} />
            </div>
            Search...
        </div>
    )
}
