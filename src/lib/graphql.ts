import { env } from '@/config/environment'

export async function fetchGraphQL<T>(query: string, variables?: string): Promise<T> {
    const res = await fetch(env.GRAPHQL_ENDPOINT!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),

        // với categories là data public
        next: { revalidate: 60 },
    })

    const json = await res.json()
    return json.data
}
