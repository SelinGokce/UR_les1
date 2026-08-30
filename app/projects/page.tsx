"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectHeader from '@/components/ui/ProjectHeader'
import { useAuth } from '@/components/context/MockAuthContext'

export default function ProjectsDashboardPage() {
    const { currentRole } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Form input states
    const [newTitle, setNewTitle] = useState('')
    const [newType, setNewType] = useState('')
    const [newImage, setNewImage] = useState('/beatbliss/mockupbeatbliss.png')

    // Local state dataset array
    const [portfolioProjects, setPortfolioProjects] = useState([
        {
            title: 'Beat Bliss',
            type: 'Vinyl & AR',
            href: '/beatbliss',
            image: '/beatbliss/mockupbeatbliss.png',
        },
        {
            title: 'Consequences',
            type: 'Thinkpiece Installation',
            href: '/consequences',
            image: '/consequences/20250526_141329.jpg',
        },
        {
            title: 'Birds-Eye',
            type: 'UI/UX Application',
            href: '/birdseye',
            image: '/birdseye/mockupbirdseye.png',
        }
    ])

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTitle || !newType) return

        const newProject = {
            title: newTitle,
            type: newType,
            href: `/${newTitle.toLowerCase().replace(/\s+/g, '')}`,
            image: newImage || '/beatbliss/mockupbeatbliss.png'
        }

        setPortfolioProjects([...portfolioProjects, newProject])

        // Reset Form Input States & Close Overlay Container
        setNewTitle('')
        setNewType('')
        setNewImage('/beatbliss/mockupbeatbliss.png')
        setIsModalOpen(false)
    }

    return (
        <div className="relative min-h-screen">
            <div className="max-w-6xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

                {/* Header Action Row */}
                <section className="mb-6 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <div className="flex-1 w-full">
                        <ProjectHeader title="Selected Interactive Works" />
                    </div>

                    {(currentRole === 'user' || currentRole === 'admin') && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-mono font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full transition-all duration-300 backdrop-blur-md text-xs sm:text-sm shadow-lg whitespace-nowrap"
                        >
                            ➕ Add Project
                        </button>
                    )}
                </section>

                {/* Game Box Grid Layout System */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                    {portfolioProjects.map((project, index) => (
                        <Link
                            key={index}
                            href={project.href}
                            className="group relative flex flex-col justify-end aspect-[3/4] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000752]/90 via-black/30 to-transparent" />
                            </div>

                            <div className="relative z-10 p-5 sm:p-8">
                                <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/70 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/10">
                                    {project.type}
                                </span>
                                <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight mt-2.5 sm:mt-4">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 sm:mt-4 text-white/50 text-xs sm:text-sm font-medium transition-all duration-300 group-hover:text-white group-hover:gap-4">
                                    <span>Explore Experience</span>
                                    <span className="text-sm sm:text-lg font-light">&#8594;</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>

            {/* Creation Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-[#000752] border border-white/20 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-md shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-mono">Create New Project Box</h2>

                        <form onSubmit={handleAddProject} className="space-y-4 font-mono">
                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Project Title</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g., Cyber Resonance"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Experience Type</label>
                                <input
                                    type="text"
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value)}
                                    placeholder="e.g., Web3 Simulation / Print"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Cover Image Path</label>
                                <input
                                    type="text"
                                    value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                    placeholder="e.g., /beatbliss/posterbb.png"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    required
                                />

                                <div className="mt-2 space-y-1">
                                    <span className="text-[10px] text-white/40 block ml-1">Quick select local assets:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setNewImage('/beatbliss/mockupbeatbliss.png')}
                                            className={`text-[10px] px-2 py-1 rounded-md border transition-all ${newImage === '/beatbliss/mockupbeatbliss.png' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/5 text-white/60 border-white/10'}`}
                                        >
                                            Vinyl Box
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewImage('/consequences/20250526_141329.jpg')}
                                            className={`text-[10px] px-2 py-1 rounded-md border transition-all ${newImage === '/consequences/20250526_141329.jpg' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/10 text-white/60 border-white/10'}`}
                                        >
                                            Installation Box
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewImage('/birdseye/mockupbirdseye.png')}
                                            className={`text-[10px] px-2 py-1 rounded-md border transition-all ${newImage === '/birdseye/mockupbirdseye.png' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/5 text-white/60 border-white/10'}`}
                                        >
                                            App UX Box
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 py-2 rounded-xl text-xs sm:text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-white text-[#000752] font-bold py-2 rounded-xl text-xs sm:text-sm hover:bg-white/90 transition-colors"
                                >
                                    Publish Box
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}