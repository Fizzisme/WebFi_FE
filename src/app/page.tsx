import Header from '@/HomeComponents/Header/Header'
import Description from '@/HomeComponents/Description/Description'

import SeeTop3 from '@/HomeComponents/Description/SeeTop3/SeeTop3'
import MainCard from '@/HomeComponents/MainCard/MainCard'

export default function Home() {
    return (
        <div className="px-20">
            <Header />
            <Description />
            <MainCard />
            <SeeTop3 />
        </div>
    )
}
