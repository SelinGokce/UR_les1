"use client"

import Image from "next/image"
import HeroHeader from "@/components/home/HeroHeader"
import NavLinkButton from "@/components/home/NavLinkButton"
import EasterEggHint from "@/components/home/EasterEggHint"
import { useAuth } from "@/components/context/MockAuthContext"

export default function HomeClient() {
    const { toggleSim } = useAuth()

    const navItems = [
        { href: "/about", label: "About me" },
        { href: "/projects", label: "My works" },
        { href: "/contact", label: "Contact me" },
    ]

    return (
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center fade-in-up py-6 sm:py-20 px-2 sm:px-4">
            <div
                style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
                className="relative w-full max-w-[92vw] sm:max-w-none border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] pt-24 sm:pt-36 pb-6 sm:pb-16 px-4 sm:px-8 md:px-20 backdrop-blur-sm shadow-xl flex flex-col items-center text-center overflow-visible mt-10 sm:mt-0"
            >
                <HeroHeader />

                <div className="w-full max-w-sm space-y-3 sm:space-y-4 z-10 mt-6 sm:mt-12">
                    <p className="text-white/80 text-[11px] sm:text-xs md:text-sm font-mono tracking-widest mb-3 sm:mb-6 text-center">
                        // Welcome! //
                    </p>

                    {navItems.map((item) => (
                        <NavLinkButton key={item.href} href={item.href} label={item.label} />
                    ))}

                    <EasterEggHint onClick={toggleSim} />
                </div>

                <Image
                    src="/stars-bottom.svg"
                    alt="Bottom right stars"
                    width={130}
                    height={130}
                    className="absolute -bottom-3 -right-2 sm:-bottom-8 sm:-right-7 z-40 pointer-events-none w-12 sm:w-24 md:w-32 h-auto object-contain"
                />
            </div>
        </div>
    )
}