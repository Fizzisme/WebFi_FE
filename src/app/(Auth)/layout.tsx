import Header from '@/components/Header/Header'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <Header />
            <main>{children}</main>
        </div>
    )
}
