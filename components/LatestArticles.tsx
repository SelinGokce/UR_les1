import Link from 'next/link'
import Image from 'next/image'

interface ProjectLink {
    title: string
    href: string
    description?: string
    thumbnail?: string
}

const projects: ProjectLink[] = [
    {
        title: 'Beat Bliss',
        href: '/beatbliss',
        description: 'A site about music and beats, showcasing our latest work.',
    },
    {
        title: 'Birds Eye',
        href: '/birdseye',
        description: 'An app for nature diaries and photography with fauna/flora search.',
    },
    {
        title: 'Redux Lantis',
        href: '/lantisapp',
        description: 'A location-based game demonstrating the importance of infrastructure.',
    },
]

export default function LatestArticles() {
    return (
        <div className="flex gap-12 items-start max-w-6xl mx-auto">
            {/* Left Side: Category Icon and Label */}
            <div className="flex flex-col items-center gap-3 mt-10">
                <div>
                    <Image
                        src="/newspaper-fill.svg"
                        alt="News Icon"
                        width={100}
                        height={100}
                    />
                </div>
                <span className="text-white text-2xl font-bold tracking-tight">News</span>
            </div>

            {/* Right Side: Articles List */}
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-2xl font-medium text-white whitespace-nowrap">Latest Articles</h2>
                    <div className="h-[1.5px] bg-white/30 w-full mt-2"></div>
                </div>

                <ul className="space-y-6">
                    {projects.map((p) => (
                        <li key={p.href}>
                            <Link
                                href={p.href}
                                /* Matching your design screenshot:
                                   0% Stop: #FFFFFF at 40% Opacity (rgba 255,255,255,0.4)
                                   100% Stop: #D9D9D9 at 0% Opacity (rgba 217,217,217,0)
                                */
                                style={{
                                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)'
                                }}
                                className="group block border border-white/20 rounded-[2rem] overflow-hidden hover:border-white/40 transition-all duration-300"
                            >
                                <div className="p-8 flex justify-between items-center">
                                    <div className="max-w-[70%]">
                                        <h3 className="text-2xl font-semibold text-white">
                                            {p.title}
                                        </h3>
                                        {p.description && (
                                            <p className="text-white/80 text-sm mt-1">
                                                {p.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-white text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        Read Article <span>→</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}