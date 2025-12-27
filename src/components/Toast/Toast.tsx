'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon, CheckCircle2Icon, X } from 'lucide-react'

export default function Toast({
    value = '',
    title,
    status,
    onCloseToast,
}: {
    value?: string
    title: string
    status: boolean
    onCloseToast: () => void
}) {
    return (
        <AnimatePresence mode="wait">
            {(status || value) && (
                <motion.div
                    key={`${value}-alert`}
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
                        {status ? <CheckCircle2Icon className="h-4 w-4" /> : <AlertCircleIcon className="h-4 w-4" />}
                        <AlertTitle>{title}</AlertTitle>

                        {value && <AlertDescription>{value}</AlertDescription>}

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onCloseToast}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
