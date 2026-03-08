import Link from 'next/link'

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
        thumbnail: '/beatbliss/album.jpeg',
    },
    {
        title: 'Birds Eye',
        href: '/birdseye',
        description: 'An app for nature diaries and photography with fauna/flora search.',
        // placeholder image when no local asset
        thumbnail: 'https://via.placeholder.com/150?text=Birds+Eye',
    },
    {
        title: 'Redux Lantis',
        href: '/lantisapp',
        description: 'A location-based game demonstrating the importance of infrastructure.',
        thumbnail: 'https://via.placeholder.com/150?text=Lantis+App',
    },
]

export default function LatestArticles() {
    return (
        <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Latest articles</h2>
            <ul className="space-y-4">
                {projects.map((p) => (
                    <li key={p.href}>
                        <Link
                            href={p.href}
                            className="block bg-slate-700 rounded overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="flex flex-col">
                                {p.thumbnail && (
                                    <img
                                        src={p.thumbnail}
                                        alt={p.title + ' thumbnail'}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-blue-300">
                                        {p.title}
                                    </h3>
                                    {p.description && (
                                        <p className="text-slate-300 text-sm mt-1">
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
