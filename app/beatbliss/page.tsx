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
      {/* 1. Added "fade-in-up" to the outer wrapper */}
      <div className="flex gap-12 items-start max-w-6xl mx-auto pt-10 pb-20 fade-in-up">

        {/* Left Side: Sidebar Icon */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="p-5 rounded-2xl">
            <Image src="/disk.svg" alt="Disk" width={55} height={55} />
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">Project</span>
        </div>

        <div className="flex-1 space-y-12">

          {/* 2. Added opacity-0 and 200ms delay to the details card */}
          <section className="opacity-0 [animation-delay:200ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
            <ProjectHeader title="Project Details" />
            <ProjectInfoCard
              title={projectData.title}
              description={projectData.description}
              tools={projectData.tools}
            />
          </section>

          {/* 3. Added opacity-0 and 400ms delay to the image gallery */}
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