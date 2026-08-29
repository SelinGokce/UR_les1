"use client"

import { useState } from 'react'
import Image from 'next/image'
import ProjectHeader from '@/components/ui/ProjectHeader'
import ProjectInfoCard from '@/components/ui/ProjectInfoCard'
import ImageGallery from '@/components/ui/ImageGallery'
import Lightbox from '@/components/ui/Lightbox'

export default function ProjectPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const projectData = {
    title: 'Beat Bliss',
    description: 'A vinyl album titled "Beat Bliss" by the fictional artist Evely Evelynn. I was given the opportunity to not only design a vinyl cover from scratch, but also to work with 3D models and Augmented Reality (AR) that is triggered when the cover is scanned.',
    tools: 'Adobe Dimensions, Adobe Photoshop, Adobe Illustrator, Phone Photography',
    images: [
      { src: '/beatbliss/mockupbeatbliss.png', alt: 'Vinyl Mockup' },
      { src: '/beatbliss/album.jpeg', alt: 'Physical Album' },
      { src: '/beatbliss/posterbb.png', alt: 'Promo Poster' },
    ]
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start max-w-6xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

        {/* Left Side: Sidebar Icon & Label (Aligned Left) */}
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

        {/* Right Side: Main Content */}
        <div className="w-full flex-1 space-y-8 sm:space-y-12">

          {/* Project Details */}
          <section className="opacity-0 [animation-delay:200ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
            <ProjectHeader title="Project Details" />
            <ProjectInfoCard
              title={projectData.title}
              description={projectData.description}
              tools={projectData.tools}
            />
          </section>

          {/* Image Gallery */}
          <section className="opacity-0 [animation-delay:400ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
            <ProjectHeader title="Visuals" />
            <ImageGallery
              images={projectData.images}
              onImageClick={(index) => setActiveIndex(index)}
            />
          </section>

        </div>
      </div>

      <Lightbox
        images={projectData.images}
        currentIndex={activeIndex}
        onNavigate={(index) => setActiveIndex(index)}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  )
}