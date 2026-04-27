"use client"

import Image from 'next/image'

interface Props {
    images: { src: string; alt: string }[]
    currentIndex: number | null
    onClose: () => void
    onNavigate: (index: number) => void
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: Props) {
    if (currentIndex === null) return null

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newIndex = (currentIndex - 1 + images.length) % images.length
        onNavigate(newIndex)
    }

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newIndex = (currentIndex + 1) % images.length
        onNavigate(newIndex)
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={onClose}
        >
            {/* Close Button */}
            <button className="absolute top-10 right-10 text-white text-4xl hover:scale-110 transition-transform z-[110]" onClick={onClose}>
                &times;
            </button>

            {/* Left Button */}
            <button
                className="absolute left-10 p-4 text-white text-5xl hover:bg-white/10 rounded-full transition-all z-[110]"
                onClick={handlePrev}
            >
                &#8249;
            </button>

            {/* Image Container */}
            <div className="relative w-[80vw] h-[80vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    className="object-contain"
                    priority
                />
                {/* Simple Counter */}
                <p className="absolute -bottom-12 text-white/50 text-sm">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>

            {/* Right Button */}
            <button
                className="absolute right-10 p-4 text-white text-5xl hover:bg-white/10 rounded-full transition-all z-[110]"
                onClick={handleNext}
            >
                &#8250;
            </button>
        </div>
    )
}