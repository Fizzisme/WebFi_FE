'use server'

interface RegisterPayload {
    username: string
    email: string
    password: string
    gender: string
    country: string
}

export async function registerAction(payload: RegisterPayload) {
    try {
        const res = await fetch('http://localhost:8080/v1/member/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
        })

        const data = await res.json()
        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'Register failed',
            }
        }

        return { success: true }
    } catch {
        return {
            success: false,
            error: 'Cannot connect to server',
        }
    }
}
