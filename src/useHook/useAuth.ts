'use client'

import { useEffect, useState } from 'react'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:8080/v1/member/me', {
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Not logged in')
                return res.json()
            })
            .then(data => setUser(data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    return { user, loading }
}
