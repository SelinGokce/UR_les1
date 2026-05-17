"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/context/MockAuthContext'

interface ProjectLink {
    title: string
    href: string
    description?: string
}

export default function LatestArticles() {
    const { currentRole } = useAuth()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')

    const [projects, setProjects] = useState<ProjectLink[]>([
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
            title: 'Concequences',
            href: '/cqcexperience',
            description: 'A thinkpiece installation.',
        },
    ])

    const handleAddArticle = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTitle) return

        const safeSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const newArticle: ProjectLink = {
            title: newTitle,
            href: `/${safeSlug}`,
            description: newDescription || undefined
        }

        setProjects([newArticle, ...projects])
        setNewTitle('')
        setNewDescription('')
        setIsFormOpen(false)
    }

    return (
        <div className="flex gap-12 items-start max-w-6xl mx-auto">
            {/* Left Side Hierarchy Icon */}
            <div className="flex flex-col items-center gap-2 mt-10">
                <div>
                    <Image src="/newspaper-fill.svg" alt="News" width={100} height={100} />
                </div>
                <span className="text-white text-2xl font-medium tracking-tight">News</span>
            </div>

            {/* Right Side Stack Stream */}
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4 flex-grow">
                        <h2 className="text-2xl font-medium text-white whitespace-nowrap">Latest Articles</h2>
                        <div className="h-[1.5px] bg-white/30 w-full mt-2"></div>
                    </div>

                    {/* Creation button remains accessible to both users and admins */}
                    {(currentRole === 'user' || currentRole === 'admin') && (
                        <button
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-bold py-1.5 px-4 rounded-full transition-all duration-300 backdrop-blur-sm text-xs uppercase tracking-wider"
                        >
                            {isFormOpen ? "Close Panel" : "➕ Add Article"}
                        </button>
                    )}
                </div>

                {/* Glassmorphic Creation Form Control Panel */}
                {isFormOpen && (
                    <form
                        onSubmit={handleAddArticle}
                        style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(217, 217, 217, 0.02) 100%)' }}
                        className="border border-white/10 p-6 rounded-[2rem] space-y-4 backdrop-blur-md animate-[fadeInUp_0.4s_ease-out_forwards]"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Article Heading..."
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Brief Summary Description..."
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none"
                            />
                        </div>
                        <button type="submit" className="w-full bg-white text-[#000752] font-bold py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-white/90">
                            Publish to Live Feed
                        </button>
                    </form>
                )}

                {/* List Items (Cleaned up: No edit triggers here anymore) */}
                <ul className="space-y-6">
                    {projects.map((p) => (
                        <li key={p.href} className="relative group">
                            <Link
                                href={p.href}
                                style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
                                className="block border border-white/20 rounded-[2rem] overflow-hidden hover:border-white/40 transition-all duration-300"
                            >
                                <div className="p-8 flex justify-between items-center">
                                    <div className="max-w-[70%]">
                                        <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                                        {p.description && <p className="text-white/80 text-sm mt-1">{p.description}</p>}
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