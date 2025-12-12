// lib/get-strict-context.ts
import { createContext, useContext } from 'react'

export function getStrictContext<T>(name: string) {
    const Context = createContext<T | undefined>(undefined)

    function useStrictContext() {
        const context = useContext(Context)
        if (context === undefined) {
            throw new Error(`use${name} must be used within ${name}Provider`)
        }
        return context
    }

    return [Context.Provider, useStrictContext] as const
}
