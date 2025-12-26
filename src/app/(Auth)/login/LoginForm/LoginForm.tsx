'use client'

import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '@/components/ui/field'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/animate-ui/components/headless/checkbox'
import { Button } from '@/components/animate-ui/components/buttons/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon, CheckCircle2Icon, X } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { registerAction } from '@/app/(Auth)/register/action'
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

        // const { payload } = parsed.data
        // const result = await registerAction(payload)
        //
        // setLoading(false)
        //
        // if (!result.success) {
        //     setError(result.error)
        //     return
        // }
        //
        // setSuccess(true)
    }

    // Cancel
    const handleCancel = () => {
        setFormData({
            email: '',
            password: '',
        })
        setErrors({})
    }
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

            {/*<AnimatePresence mode="wait">*/}
            {/*    {error && (*/}
            {/*        <motion.div*/}
            {/*            key="error-alert"*/}
            {/*            initial={{ opacity: 0, y: -100, scale: 0.8 }}*/}
            {/*            animate={{ opacity: 1, y: 0, scale: 1, rotate: [0, -5, 5, -5, 5, 0] }}*/}
            {/*            exit={{ opacity: 0, x: 100, scale: 0.8 }}*/}
            {/*            transition={{*/}
            {/*                type: 'spring',*/}
            {/*                stiffness: 300,*/}
            {/*                damping: 25,*/}
            {/*                rotate: {*/}
            {/*                    duration: 0.5,*/}
            {/*                    ease: 'easeInOut',*/}
            {/*                },*/}
            {/*            }}*/}
            {/*            className="fixed top-10 right-5 z-50 shadow-lg max-w-md" // ← fixed + max-w*/}
            {/*        >*/}
            {/*            <Alert variant="destructive" className="bg-white dark:bg-black relative pr-10">*/}
            {/*                <AlertCircleIcon className="h-4 w-4" />*/}
            {/*                <AlertTitle>Register Failed!</AlertTitle>*/}
            {/*                <AlertDescription>{error}</AlertDescription>*/}

            {/*                <motion.button*/}
            {/*                    whileHover={{ scale: 1.1, rotate: 90 }}*/}
            {/*                    whileTap={{ scale: 0.9 }}*/}
            {/*                    onClick={() => setError('')}*/}
            {/*                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"*/}
            {/*                    aria-label="Close"*/}
            {/*                >*/}
            {/*                    <X className="h-4 w-4" />*/}
            {/*                </motion.button>*/}
            {/*            </Alert>*/}
            {/*        </motion.div>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}
            {/*<AnimatePresence mode="wait">*/}
            {/*    {success && (*/}
            {/*        <motion.div*/}
            {/*            key="error-alert"*/}
            {/*            initial={{ opacity: 0, y: -100, scale: 0.8 }}*/}
            {/*            animate={{ opacity: 1, y: 0, scale: 1, rotate: [0, -5, 5, -5, 5, 0] }}*/}
            {/*            exit={{ opacity: 0, x: 100, scale: 0.8 }}*/}
            {/*            transition={{*/}
            {/*                type: 'spring',*/}
            {/*                stiffness: 300,*/}
            {/*                damping: 25,*/}
            {/*                rotate: {*/}
            {/*                    duration: 0.5,*/}
            {/*                    ease: 'easeInOut',*/}
            {/*                },*/}
            {/*            }}*/}
            {/*            className="fixed top-10 right-5 z-50 shadow-lg max-w-md"*/}
            {/*        >*/}
            {/*            <Alert variant="destructive" className="bg-white dark:bg-black relative pr-10">*/}
            {/*                <CheckCircle2Icon className="h-4 w-4" />*/}
            {/*                <AlertTitle>Register success!</AlertTitle>*/}

            {/*                <motion.button*/}
            {/*                    whileHover={{ scale: 1.1, rotate: 90 }}*/}
            {/*                    whileTap={{ scale: 0.9 }}*/}
            {/*                    onClick={() => setSuccess(false)}*/}
            {/*                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"*/}
            {/*                    aria-label="Close"*/}
            {/*                >*/}
            {/*                    <X className="h-4 w-4" />*/}
            {/*                </motion.button>*/}
            {/*            </Alert>*/}
            {/*        </motion.div>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}
        </div>
    )
}
