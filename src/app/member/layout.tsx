import Header from '@/components/Header/Header'
export default function MemberLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="px-5">{children}</main>
        </>
    )
}
