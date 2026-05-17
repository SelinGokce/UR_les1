"use client"

import Image from 'next/image'
import Link from 'next/link'
import ProjectHeader from '@/components/ui/ProjectHeader'

export default function ProjectsDashboardPage() {
    // Central definition for your interactive game boxes
    const portfolioProjects = [
        {
            title: 'Beat Bliss',
            type: 'Vinyl & AR',
            href: '/beatbliss',
            image: '/beatbliss/mockupbeatbliss.png',
            delay: '100ms'
        },
        {
            title: 'Consequences',
            type: 'Thinkpiece Installation',
            href: '/cqcexperience',
            image: '/cqc/20250526_141329.jpg',
            delay: '250ms'
        },
        {
            title: 'Birds-Eye',
            type: 'UI/UX Application',
            href: '/birdseye',
            image: '/birdseye/mockupbirdseye.png',
            delay: '400ms'
        }
    ]

    return (
        <div className="relative min-h-screen">
            {/* Outer layout wrapper running our global layout and fade entry animation */}
            <div className="max-w-6xl mx-auto pt-10 pb-20 fade-in-up">

                {/* Section 1: Dashboard Header (Fades in slightly quicker) */}
                <section className="opacity-0 [animation-delay:100ms] animate-[fadeInUp_0.8s_ease-out_forwards] mb-12">
                    <ProjectHeader title="Selected Interactive Works" />
                </section>

                {/* Section 2: Game Box Grid Layout */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioProjects.map((project, index) => (
                        <Link
                            key={index}
                            href={project.href}
                            style={{ animationDelay: project.delay }}
                            className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] group relative flex flex-col justify-end aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer"
                        >
                            {/* Core Thumbnail Image Container */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} Game Box Art`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority={index === 0}
                                />
                                {/* Smooth glassmorphic gradient cover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000752]/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                            </div>

                            {/* Lower Text/Meta Box Interface */}
                            <div className="relative z-10 p-8 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                                <span className="text-xs font-mono tracking-widest uppercase text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
                                    {project.type}
                                </span>
                                <h3 className="text-3xl font-bold text-white tracking-tight mt-4 group-hover:text-white drop-shadow-md">
                                    {project.title}
                                </h3>

                                {/* Decorative retro "Launch / View Project" arrow indicator */}
                                <div className="flex items-center gap-2 mt-4 text-white/40 text-sm font-medium transition-all duration-300 group-hover:text-white group-hover:gap-4">
                                    <span>Explore</span>
                                    <span className="text-lg font-light">&#8594;</span>
                                </div>
                            </div>

                            {/* High-end glass lining shine overlay */}
                            <div className="absolute inset-0 border border-white/20 rounded-[2.5rem] pointer-events-none mix-blend-overlay opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </section>

            </div>
        </div>
    )
}