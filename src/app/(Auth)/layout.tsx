import Header from '@/components/Header/Header'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <Header />
            <main className="w-full h-full mt-30">{children}</main>
        </div>
    )
}
