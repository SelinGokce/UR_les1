import Image from 'next/image'

export interface ContactLink {
    platform: string
    href: string
}

interface SocialPlatformsSectionProps {
    contactLinks: ContactLink[]
}

export default function SocialPlatformsSection({ contactLinks }: SocialPlatformsSectionProps) {
    return (
        <div>
            <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-3 sm:mb-4 ml-0.5">
                Platforms & Socials
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full">
                {contactLinks.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-start gap-3 sm:gap-4 py-3 sm:py-3.5 px-6 sm:px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group sm:min-w-[200px]"
                    >
                        <div className="relative w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] shrink-0">
                            <Image
                                src="/star-button.svg"
                                alt="Star icon outlined"
                                width={20}
                                height={20}
                                className="block group-hover:hidden transition-all duration-200 object-contain w-full h-full"
                            />
                            <Image
                                src="/star.svg"
                                alt="Star icon filled"
                                width={20}
                                height={20}
                                className="hidden group-hover:block group-hover:scale-110 transition-all duration-200 object-contain w-full h-full"
                            />
                        </div>
                        <span className="text-white font-medium text-xs sm:text-sm md:text-base tracking-wide drop-shadow-sm">
                            {item.platform}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    )
}