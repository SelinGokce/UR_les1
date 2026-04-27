"use client"

import Image from 'next/image'
import ProjectHeader from '@/components/ui/ProjectHeader'

export default function AboutPage() {
  const tools = "Adobe Creative Suite, Retro Hardware UI, Modern Web Frameworks, UI/UX Research"

  return (
    <div className="flex gap-12 items-start max-w-6xl mx-auto pt-10 pb-20">
      {/* Left Side: Sidebar Icon */}
      <div className="flex flex-col items-center gap-3 mt-10">
        <div className="p-5 rounded-2xl">
          <Image
            src="/userbadge.svg"
            alt="User badge Icon"
            width={55}
            height={55}
          />
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">About</span>
      </div>

      {/* Right Side: Content Card */}
      <div className="flex-1">
        <ProjectHeader title="Personal Profile" />

        <div
          style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
          className="border border-white/20 rounded-[2rem] overflow-hidden p-10 backdrop-blur-sm shadow-xl"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Hello, Im <span className="text-white drop-shadow-md">Selin</span>
          </h1>

          <div className="space-y-8">
            {/* Academic Background */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Education & Focus</h3>
              <p className="text-xl text-white leading-relaxed font-light">
                I am currently a <span className="font-bold text-white">Graphic Design student</span> at <span className="font-bold text-white">AP (Artesis Plantijn University of Applied Sciences and Arts) in Antwerp</span>. My work focuses on bridging the gap between historical design and contemporary digital needs.
              </p>
            </div>

            {/* Combined UI Interests */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Design Philosophy</h3>
              <p className="text-xl text-white leading-relaxed font-light">
                My passion lies in <span className="font-bold text-white">combining retro UI aesthetics with modern user experiences</span>. I love exploring how the tactile, high-contrast charm of legacy hardware and software can be integrated into <span className="font-bold text-white">clean, high-performance modern interfaces</span> to create something truly unique.
              </p>
            </div>

            {/* Expertise Tags */}
            <div>
              <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {tools.split(',').map((tool, index) => (
                  <span
                    key={index}
                    className="bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-sm text-white font-medium backdrop-blur-sm"
                  >
                    {tool.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}