"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectHeader from '@/components/ui/ProjectHeader'
import Lightbox from '@/components/ui/Lightbox'
import EditableProjectSection from '@/components/ui/EditableProjectSection'

export default function ProjectPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const initialProjectData = {
    title: 'Consequences',
    description: 'Consequences is an immersive live experience and physical thinkpiece designed to let users express and release deep inner emotions. Participants follow a structured sequence to intentionally shatter a physical plate inside a custom-engineered hexagonal mirror chamber, visualizing the sudden and raw impact of emotional release.',
    tools: 'Interactive Design, Experiential Installation, Hardware Prototyping, Spatial Layout, Team Collaboration',
    images: [
      { src: '/consequences/20250526_144731.jpg', alt: 'Physical interface setup with step-by-step instruction tokens' },
      { src: '/consequences/20250526_141329.jpg', alt: 'Hexagonal infinite reflection mirror chamber installation with ambient floor LED paths' },
    ]
  }

  // Related projects to display in the bottom navigation tab
  const relatedProjects = [
    { title: 'Beat Bliss', type: 'Vinyl & AR', href: '/beatbliss' },
    { title: 'Birds-Eye', type: 'UI/UX Application', href: '/birdseye' },
  ]

  return (
    <div className="relative min-h-screen">
      {/* Outer wrapper: switches from vertical stacking on mobile to side-by-side on desktop */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start max-w-6xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

        {/* Left Side: Sidebar Icon Container */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-3 mt-2 md:mt-10 self-start">
          <div className="p-2 sm:p-5 rounded-2xl">
            <Image
              src="/disk.svg"
              alt="Installation Design Icon"
              width={55}
              height={55}
              className="w-10 h-10 sm:w-[55px] sm:h-[55px] object-contain"
            />
          </div>
          <span className="text-white text-xl sm:text-2xl font-bold tracking-tight text-left">Project</span>
        </div>

        {/* Right Side: Main Content */}
        <div className="w-full flex-1 space-y-8 sm:space-y-12">

          {/* Main Editable Content Wrapper */}
          <EditableProjectSection
            initialData={initialProjectData}
            onImageClick={(index) => setActiveIndex(index)}
          />

          {/* Other Projects Bottom Navigation Tab */}
          <section className="opacity-0 [animation-delay:600ms] animate-[fadeInUp_0.8s_ease-out_forwards] pt-6 border-t border-white/10">
            <ProjectHeader title="Other Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {relatedProjects.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-white/20 to-white/5 border border-white/20 backdrop-blur-md shadow-lg hover:bg-white/30 hover:border-white/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-white font-bold text-base sm:text-lg tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                      {project.title}
                    </span>
                    <span className="text-white/70 group-hover:text-white transition-colors duration-300 text-lg">
                      &rarr;
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-100/80 mt-2">
                    {project.type}
                  </span>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Global Fullscreen Lightbox Overlay Component */}
      <Lightbox
        images={initialProjectData.images}
        currentIndex={activeIndex}
        onNavigate={(index) => setActiveIndex(index)}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  )
}