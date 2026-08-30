import Image from "next/image"

export default function HeroHeader() {
    return (
        <>
            {/* TOP-LEFT CORNER SPARKLES */}
            <Image
                src="/stars-top.svg"
                alt="Top left stars"
                width={130}
                height={130}
                className="absolute -top-10 -left-4 sm:-top-8 sm:-left-7 z-40 pointer-events-none w-16 sm:w-24 md:w-32 h-auto object-contain"
                priority
            />

            {/* HERO TITLE + SUBTITLE WRAPPER */}
            <div className="absolute -top-10 sm:-top-20 md:-top-24 left-1/2 -translate-x-1/2 z-30 w-[240px] xs:w-[280px] sm:w-[540px] md:w-[640px]">
                <Image
                    src="/hero-title.svg"
                    alt="Portfolio"
                    width={640}
                    height={180}
                    className="w-full h-auto object-contain pointer-events-none"
                    priority
                />
                <p className="text-white/70 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-mono tracking-wider text-left pl-1 xs:pl-3 sm:pl-6 md:pl-10 -mt-2 xs:-mt-3 sm:-mt-10 md:-mt-14 relative z-40">
          //By Selin Gokce
                </p>
            </div>
        </>
    )
}