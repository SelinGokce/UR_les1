import Image from 'next/image'

export default function ContactSidebarBadge() {
    return (
        <div className="flex flex-row md:flex-col items-center md:items-start gap-3 mt-2 md:mt-10 opacity-0 [animation-delay:100ms] animate-[fadeInUp_0.8s_ease-out_forwards] self-start">
            <div className="p-2 sm:p-5 rounded-2xl">
                <Image
                    src="/userbadge.svg"
                    alt="Contact badge Icon"
                    width={55}
                    height={55}
                    className="w-10 h-10 sm:w-[55px] sm:h-[55px] object-contain"
                />
            </div>
            <span className="text-white text-xl sm:text-2xl font-bold tracking-tight text-left">Contact</span>
        </div>
    )
}