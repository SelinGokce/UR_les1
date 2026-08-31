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
    title: 'Beat Bliss',
    description: 'A vinyl album titled "Beat Bliss" by the fictional artist Evely Evelynn. I was given the opportunity to not only design a vinyl cover from scratch, but also to work with 3D models and Augmented Reality (AR) that is triggered when the cover is scanned.',
    tools: 'Adobe Dimensions, Adobe Photoshop, Adobe Illustrator, Phone Photography',
    images: [
      { src: '/beatbliss/mockupbeatbliss.png', alt: 'Vinyl Mockup' },
      { src: '/beatbliss/album.jpeg', alt: 'Physical Album' },
      { src: '/beatbliss/posterbb.png', alt: 'Promo Poster' },
    ]
  }

  const relatedProjects = [
    { title: 'Consequences', type: 'Thinkpiece Installation', href: '/consequences' },
    { title: 'Birds-Eye', type: 'UI/UX Application', href: '/birdseye' },
  ]

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start max-w-6xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

        {/* Sidebar Icon & Title */}
        <div className="flex flex-row md:flex-col items-center md:items-start gap-3 mt-2 md:mt-10 self-start">
          <div className="p-2 sm:p-5 rounded-2xl">
            <Image
              src="/disk.svg"
              alt="Disk"
              width={55}
              height={55}
              className="w-10 h-10 sm:w-[55px] sm:h-[55px] object-contain"
            />
          </div>
          <span className="text-white text-xl sm:text-2xl font-bold tracking-tight text-left">Project</span>
        </div>

        {/* Main Editable Content */}
        <div className="w-full flex-1 space-y-8 sm:space-y-12">

          <EditableProjectSection
            initialData={initialProjectData}
            onImageClick={(index) => setActiveIndex(index)}
          />

          {/* Related Projects Navigation */}
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

      <Lightbox
        images={initialProjectData.images}
        currentIndex={activeIndex}
        onNavigate={(index) => setActiveIndex(index)}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  )
}