"use client"

import Link from "next/link"
import Image from "next/image"

export default function HomeClient() {
    return (
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center fade-in-up py-20 px-4">

            {/* MATCHED GLASS CONTAINER */}
            <div
                style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
                className="relative w-full border border-white/20 rounded-[2rem] pt-36 pb-16 px-8 md:px-20 backdrop-blur-sm shadow-xl flex flex-col items-center text-center overflow-visible"
            >

                {/* 1. TOP-LEFT CORNER SPARKLES */}
                <Image
                    src="/stars-top.svg"
                    alt="Top left stars"
                    width={130}
                    height={130}
                    className="absolute -top-8 -left-7 z-40 pointer-events-none w-24 md:w-32 h-auto object-contain"
                    priority
                />

                {/* 2. HERO TITLE + SUBTITLE WRAPPER */}
                <div className="absolute -top-20 md:-top-24 left-1/2 -translate-x-1/2 z-30 w-[380px] sm:w-[540px] md:w-[640px]">
                    <Image
                        src="/hero-title.svg"
                        alt="Portfolio"
                        width={640}
                        height={180}
                        className="w-full h-auto object-contain pointer-events-none"
                        priority
                    />

                    {/* Subtitle */}
                    <p className="text-white/70 text-[10px] sm:text-xs md:text-sm font-mono tracking-wider text-left pl-3 sm:pl-6 md:pl-10 -mt-6 sm:-mt-10 md:-mt-14 relative z-40">
            //By Selin Gokce
                    </p>
                </div>

                {/* NAVIGATION BUTTONS SECTION */}
                <div className="w-full max-w-sm space-y-4 z-10 mt-8 sm:mt-12">
                    <p className="text-white/80 text-xs md:text-sm font-mono tracking-widest mb-6 text-center">
            // Welcome! //
                    </p>

                    <Link
                        href="/about"
                        className="flex items-center justify-start gap-4 w-full py-3.5 px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group"
                    >
                        <div className="relative w-[20px] h-[20px] shrink-0">
                            <Image
                                src="/star-button.svg"
                                alt="Star icon outlined"
                                width={20}
                                height={20}
                                className="block group-hover:hidden transition-all duration-200 object-contain"
                            />
                            <Image
                                src="/star.svg"
                                alt="Star icon filled"
                                width={20}
                                height={20}
                                className="hidden group-hover:block group-hover:scale-110 transition-all duration-200 object-contain"
                            />
                        </div>
                        <span className="text-white font-medium text-sm md:text-base tracking-wide drop-shadow-sm">
                            About me
                        </span>
                    </Link>

                    <Link
                        href="/projects"
                        className="flex items-center justify-start gap-4 w-full py-3.5 px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group"
                    >
                        <div className="relative w-[20px] h-[20px] shrink-0">
                            <Image
                                src="/star-button.svg"
                                alt="Star icon outlined"
                                width={20}
                                height={20}
                                className="block group-hover:hidden transition-all duration-200 object-contain"
                            />
                            <Image
                                src="/star.svg"
                                alt="Star icon filled"
                                width={20}
                                height={20}
                                className="hidden group-hover:block group-hover:scale-110 transition-all duration-200 object-contain"
                            />
                        </div>
                        <span className="text-white font-medium text-sm md:text-base tracking-wide drop-shadow-sm">
                            My works
                        </span>
                    </Link>

                    <Link
                        href="/contact"
                        className="flex items-center justify-start gap-4 w-full py-3.5 px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group"
                    >
                        <div className="relative w-[20px] h-[20px] shrink-0">
                            <Image
                                src="/star-button.svg"
                                alt="Star icon outlined"
                                width={20}
                                height={20}
                                className="block group-hover:hidden transition-all duration-200 object-contain"
                            />
                            <Image
                                src="/star.svg"
                                alt="Star icon filled"
                                width={20}
                                height={20}
                                className="hidden group-hover:block group-hover:scale-110 transition-all duration-200 object-contain"
                            />
                        </div>
                        <span className="text-white font-medium text-sm md:text-base tracking-wide drop-shadow-sm">
                            Contact me
                        </span>
                    </Link>

                    {/* EASTER EGG HINT FOR TEACHERS */}
                    <p className="text-[11px] text-white/50 font-mono pt-4 text-center tracking-wide">
                        <span className="underline decoration-white/30">Tip:</span> Press <kbd className="bg-white/15 px-1.5 py-0.5 rounded border border-white/20 text-white font-sans">Ctrl</kbd> + <kbd className="bg-white/15 px-1.5 py-0.5 rounded border border-white/20 text-white font-sans">Shift</kbd> + <kbd className="bg-white/15 px-1.5 py-0.5 rounded border border-white/20 text-white font-sans">A</kbd> to unlock demo controls
                    </p>
                </div>

                {/* 3. BOTTOM-RIGHT CORNER SPARKLES */}
                <Image
                    src="/stars-bottom.svg"
                    alt="Bottom right stars"
                    width={130}
                    height={130}
                    className="absolute -bottom-8 -right-7 z-40 pointer-events-none w-24 md:w-32 h-auto object-contain"
                />

            </div>
        </div>
    )
}