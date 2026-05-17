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
    title: 'Consequences',
    description: 'Consequences is an immersive live experience and physical thinkpiece designed to let users express and release deep inner emotions. Participants follow a structured sequence to intentionally shatter a physical plate inside a custom-engineered hexagonal mirror chamber, visualizing the sudden and raw impact of emotional release.',
    tools: 'Interactive Design, Experiential Installation, Hardware Prototyping, Spatial Layout, Team Collaboration',
    images: [
      { src: '/cqc/20250526_144731.jpg', alt: 'Physical interface setup with step-by-step instruction tokens' },
      { src: '/cqc/20250526_141329.jpg', alt: 'Hexagonal infinite reflection mirror chamber installation with ambient floor LED paths' },
    ]
  }

  return (
    <div className="relative min-h-screen">
      {/* Outer wrapper applies the global layout and fade-in animation */}
      <div className="flex gap-12 items-start max-w-6xl mx-auto pt-10 pb-20 fade-in-up">

        {/* Left Side: Sidebar Icon Container */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="p-5 rounded-2xl">
            <Image
              src="/disk.svg"
              alt="Installation Design Icon"
              width={55}
              height={55}
            />
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">Project</span>
        </div>

        {/* Right Side: Render our structural components */}
        <div className="flex-1 space-y-12">

          {/* 1. Details Section */}
          <section className="opacity-0 [animation-delay:200ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
            <ProjectHeader title="Project Details" />
            <ProjectInfoCard
              title={projectData.title}
              description={projectData.description}
              tools={projectData.tools}
            />
          </section>

          {/* 2. Visual Gallery Grid Section */}
          <section className="opacity-0 [animation-delay:400ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
            <ProjectHeader title="Visuals" />
            <ImageGallery
              images={projectData.images}
              onImageClick={(index) => setActiveIndex(index)}
            />
          </section>

        </div>
      </div>

      {/* 3. Global Fullscreen Lightbox Overlay Component */}
      <Lightbox
        images={projectData.images}
        currentIndex={activeIndex}
        onNavigate={(index) => setActiveIndex(index)}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  )
}