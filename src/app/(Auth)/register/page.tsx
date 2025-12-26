import RegisterForm from '@/app/(Auth)/register/RegisterForm/RegisterForm'

interface Country {
    country: string
    region: string
}

// Fetch api to get countries
const getCountries = async (): Promise<string[]> => {
    const res = await fetch('https://api.first.org/data/v1/countries?limit=249', {
        cache: 'force-cache',
    })
    const data = await res.json()
    return Array.from(
        new Set(
            Object.values(data.data as Record<string, Country>).map(item =>
                item.country.replace(/\s*\(.*?\)\s*/g, '').trim(),
            ),
        ),
    ).sort()
}

export default async function RegisterPage() {
    const countries = await getCountries()
    return (
        <div className={'w-full h-full mt-30'}>
            <RegisterForm countries={countries} />
        </div>
    )
}
