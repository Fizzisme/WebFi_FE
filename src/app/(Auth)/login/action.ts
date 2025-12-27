'use server'

interface LoginPayload {
    email: string
    password: string
}

export async function LoginAction(payload: LoginPayload) {
    try {
        const res = await fetch('http://localhost:8080/v1/member/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
            credentials: 'include',
        })

        const data = await res.json()
        if (!res.ok) {
            return {
                success: false,
                error: data.message || 'Login failed',
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
