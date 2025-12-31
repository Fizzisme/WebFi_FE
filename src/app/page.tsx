import Header from '@/HomeComponents/Header/Header'
import Description from '@/HomeComponents/Description/Description'
import SeeTop3 from '@/HomeComponents/Description/SeeTop3/SeeTop3'
import MainCard from '@/HomeComponents/MainCard/MainCard'
import { getMember } from '@/service/member'

export default async function Home() {
    const member = await getMember()
    return (
        <div className="px-20">
            <Header member={member} />
            <Description />
            <MainCard />
            <SeeTop3 />
        </div>
    )
}
