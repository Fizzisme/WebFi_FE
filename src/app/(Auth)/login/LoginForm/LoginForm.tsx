'use client'

import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/animate-ui/components/buttons/button'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Separator } from '@/components/ui/separator'
import { LoginAction } from '@/app/(Auth)/login/action'
import Toast from '@/components/Toast/Toast'
// Zod validation schema
const loginSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .max(255),
})

type LoginFormData = z.infer<typeof loginSchema>

type FormErrors = Partial<Record<keyof LoginFormData, string>>

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    // Get change from input
    const handleInputChange = (field: keyof LoginFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    // Submit and call api
    const handleSubmit = async () => {
        const parsed = loginSchema.safeParse(formData)

        if (!parsed.success) {
            const fieldErrors: FormErrors = {}
            parsed.error.issues.forEach(e => {
                fieldErrors[e.path[0] as keyof typeof fieldErrors] = e.message
            })
            setErrors(fieldErrors)
            return
        }

        setLoading(true)
        setErrors({})

        const result = await LoginAction(parsed.data)

        setLoading(false)

        if (!result.success) {
            setError(result.error)
            return
        }

        setSuccess(true)
    }

    // Cancel
    const handleCancel = () => {
        setFormData({
            email: '',
            password: '',
        })
        setErrors({})
    }

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('')
            }, 3000)

            // Cleanup: clear timeout
            return () => clearTimeout(timer)
        }
    }, [error])

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false)
            }, 3000)

            // Cleanup: clear timeout
            return () => clearTimeout(timer)
        }
    }, [success])
    return (
        <div className="relative w-full flex justify-center items-center">
            <FieldGroup className="w-full max-w-md shadow-sm p-5 rounded-2xl dark:border-[#737373] border-2">
                {/* ACCOUNT INFO */}
                <FieldSet>
                    <div className="flex gap-2 h-[20px]">
                        <Link
                            href="/register"
                            className="text-[#f2f2f3] hover:text-black hover:scale-105 duration-300 dark:text-[#737373] dark:hover:text-white"
                        >
                            <FieldLegend variant={'label'}>Register</FieldLegend>
                        </Link>

                        <Separator orientation="vertical" className="h-full" />

                        <FieldLegend variant={'label'}>Login</FieldLegend>
                    </div>

                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={e => handleInputChange('email', e.target.value)}
                            placeholder="Fizz@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </Field>

                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={e => handleInputChange('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </Field>
                </FieldSet>

                <p>or</p>

                {/* ACTIONS */}
                <Field orientation="horizontal">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Field>
            </FieldGroup>

            <Toast title={'Login Failed!'} value={error} status={false} onCloseToast={() => setError('')} />
            <Toast title={'Login success!'} status={success} onCloseToast={() => setSuccess(false)} />
        </div>
    )
}
