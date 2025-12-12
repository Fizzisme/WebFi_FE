'use client'
import { useState } from 'react'
import MemberCard from '@/HomeComponents/MemberOfYear/MemberCard/MemberCard'
import ReadmePreviewer from '@/HomeComponents/MemberOfYear/ReadmePreviewer/ReadmePreviewer'

export default function FlipCard({ emoji, color, code }: { emoji: string; color: string; code: string }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = (e: React.MouseEvent) => {
        // Chỉ flip nếu KHÔNG click vào button hoặc link
        const target = e.target as HTMLElement
        const isInteractive = target.closest('button, a, input, textarea, select')

        if (!isInteractive) {
            setIsFlipped(!isFlipped)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`text-5xl font-bold ${color} mb-12`}>{emoji}</div>

            {/* Card Container */}
            <div
                className="relative w-full cursor-pointer"
                style={{ perspective: '1000px', minHeight: '500px' }}
                onClick={handleFlip}
            >
                {/* Flip Inner */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.8s',
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* Front */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                    >
                        <MemberCard />
                    </div>

                    {/* Back */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <ReadmePreviewer duration={5000} delay={0} writing={true} cursor={true} code={code} />
                    </div>
                </div>
            </div>
        </div>
    )
}
