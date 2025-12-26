'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { Button } from '@/components/animate-ui/components/buttons/button'
import { Checkbox } from '@/components/animate-ui/components/headless/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { registerAction } from '@/app/(Auth)/register/action'
import { AlertCircleIcon, CheckCircle2Icon, X } from 'lucide-react'
import Link from 'next/link'

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

    return (
        <div className="relative w-full flex justify-center items-center">
            <FieldGroup className="w-full max-w-md shadow-sm p-5 rounded-2xl dark:border-[#737373] border-2">
                {/* ACCOUNT INFO */}
                <FieldSet>
                    <div className="flex gap-2">
                        <FieldLegend variant={'label'}>Register</FieldLegend>

                        <Link href="/login">
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

            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        key="error-alert"
                        initial={{ opacity: 0, y: -100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: [0, -5, 5, -5, 5, 0] }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            rotate: {
                                duration: 0.5,
                                ease: 'easeInOut',
                            },
                        }}
                        className="fixed top-10 right-5 z-50 shadow-lg max-w-md" // ← fixed + max-w
                    >
                        <Alert variant="destructive" className="bg-white dark:bg-black relative pr-10">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Register Failed!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setError('')}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </motion.button>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {success && (
                    <motion.div
                        key="error-alert"
                        initial={{ opacity: 0, y: -100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: [0, -5, 5, -5, 5, 0] }}
                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            rotate: {
                                duration: 0.5,
                                ease: 'easeInOut',
                            },
                        }}
                        className="fixed top-10 right-5 z-50 shadow-lg max-w-md"
                    >
                        <Alert variant="destructive" className="bg-white dark:bg-black relative pr-10">
                            <CheckCircle2Icon className="h-4 w-4" />
                            <AlertTitle>Register success!</AlertTitle>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSuccess(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </motion.button>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
