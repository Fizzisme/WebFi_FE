'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'
import { Button } from '@/components/animate-ui/components/buttons/button'
import { Checkbox } from '@/components/animate-ui/components/headless/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { registerAction } from '@/app/(Auth)/register/action'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import Toast from '@/components/Toast/Toast'

// Zod validation schema
const registerSchema = z
    .object({
        username: z
            .string()
            .min(3)
            .max(255),
        email: z.string().email(),
        password: z
            .string()
            .min(8)
            .max(255),
        gender: z.string(),
        country: z.string(),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

type RegisterFormData = z.infer<typeof registerSchema>

type FormErrors = Partial<Record<keyof RegisterFormData, string>>

export default function RegisterForm({ countries }: { countries: string[] }) {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        country: '',
    })
    const [agreePolicy, setAgreePolicy] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    // Get change from input
    const handleInputChange = (field: keyof RegisterFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    // Submit and call api
    const handleSubmit = async () => {
        const parsed = registerSchema.safeParse(formData)

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

        const { confirmPassword, ...payload } = parsed.data
        const result = await registerAction(payload)

        setLoading(false)

        if (!result.success) {
            setError(result.error)
            return
        }

        setSuccess(true)
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            country: '',
        })
    }

    // Cancel
    const handleCancel = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            country: '',
        })
        setAgreePolicy(false)
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
                        <FieldLegend variant={'label'}>Register</FieldLegend>

                        <Separator orientation="vertical" className="h-full" />

                        <Link
                            href="/login"
                            className="text-[#f2f2f3] hover:text-black hover:scale-105 duration-300 dark:text-[#737373] dark:hover:text-white"
                        >
                            {' '}
                            <FieldLegend variant={'label'}>Login</FieldLegend>
                        </Link>
                    </div>

                    <div className="flex columns-2 gap-5">
                        <Field>
                            <FieldLabel>Username</FieldLabel>
                            <Input
                                name="username"
                                value={formData.username}
                                onChange={e => handleInputChange('username', e.target.value)}
                                placeholder="Fizz_isme"
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </Field>

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
                    </div>

                    <div className="flex columns-2 gap-5">
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
                            <p className="text-xs text-gray-500 mt-1">
                                Min 8 chars, with uppercase, lowercase, number & special char
                            </p>
                        </Field>

                        <Field>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={e => handleInputChange('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </Field>
                    </div>

                    <div className="flex columns-2 gap-5">
                        <Field>
                            <FieldLabel>Gender</FieldLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onValueChange={value => handleInputChange('gender', value)}
                            >
                                <SelectTrigger className="cursor-pointer">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="cursor-pointer" value="male">
                                        Male
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="female">
                                        Female
                                    </SelectItem>
                                    <SelectItem className="cursor-pointer" value="other">
                                        Other
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                        </Field>

                        <Field>
                            <FieldLabel>Country</FieldLabel>
                            <Select
                                name="country"
                                value={formData.country}
                                onValueChange={value => handleInputChange('country', value)}
                            >
                                <SelectTrigger className="w-full cursor-pointer">
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="w-full h-[400px]">
                                    {countries.map((name: string) => (
                                        <SelectItem key={name} value={name} className="cursor-pointer">
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                        </Field>
                    </div>
                </FieldSet>

                <FieldSeparator />

                {/* POLICY */}
                <FieldSet>
                    <Field orientation="horizontal">
                        <Checkbox className="cursor-pointer" checked={agreePolicy} onChange={setAgreePolicy} />
                        <FieldLabel className="font-normal">
                            I agree to the{' '}
                            <a href="/policy" className="underline">
                                Terms & Conditions
                            </a>
                        </FieldLabel>
                    </Field>
                </FieldSet>

                {/* ACTIONS */}
                <Field orientation="horizontal">
                    <Button onClick={handleSubmit} disabled={!agreePolicy || loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Field>
            </FieldGroup>

            <Toast title={'Register Failed!'} value={error} status={false} onCloseToast={() => setError('')} />
            <Toast title={'Register success!'} status={success} onCloseToast={() => setSuccess(false)} />
        </div>
    )
}
