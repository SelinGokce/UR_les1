"use client"

import { useState } from 'react'
import Image from 'next/image'
import ProjectHeader from '@/components/ui/ProjectHeader'
import { useAuth } from '@/components/context/MockAuthContext'

export default function AboutPage() {
  const { currentRole } = useAuth()

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false)

  // Profile data states
  const [name, setName] = useState('Selin')
  const [education, setEducation] = useState('I am currently a Graphic Design student at AP (Artesis Plantijn University of Applied Sciences and Arts) in Antwerp. My work focuses on bridging the gap between historical design and contemporary digital needs.')
  const [philosophy, setPhilosophy] = useState('My passion lies in combining retro UI aesthetics with modern user experiences. I love exploring how the tactile, high-contrast charm of legacy hardware and software can be integrated into clean, high-performance modern interfaces to create something truly unique.')
  const [toolsInput, setToolsInput] = useState('Adobe Creative Suite, Retro Hardware UI, Modern Web Frameworks, UI/UX Research')

  // Computed array for rendering expertise tags
  const tools = toolsInput.split(',').filter((t) => t.trim().length > 0)

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start w-full max-w-6xl mx-auto pt-2 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

      {/* Left Side: Sidebar Icon & Label (Aligned Left) */}
      <div className="flex flex-row md:flex-col items-center md:items-start gap-2 sm:gap-3 mt-1 md:mt-10 opacity-0 [animation-delay:100ms] animate-[fadeInUp_0.8s_ease-out_forwards] self-start">
        <div className="p-1.5 sm:p-5 rounded-2xl">
          <Image
            src="/userbadge.svg"
            alt="User badge Icon"
            width={55}
            height={55}
            className="w-8 h-8 sm:w-[55px] sm:h-[55px] object-contain"
          />
        </div>
        <span className="text-white text-lg sm:text-2xl font-bold tracking-tight text-left">About</span>
      </div>

      {/* Right Side: Content Card */}
      <div className="w-full flex-1 opacity-0 [animation-delay:300ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 w-full">
          <div className="flex-1 w-full">
            <ProjectHeader title="Personal Profile" />
          </div>

          {/* CONDITIONAL EDIT MODE BUTTON */}
          {(currentRole === 'user' || currentRole === 'admin') && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-mono font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full transition-all duration-300 backdrop-blur-md text-xs sm:text-sm shadow-lg whitespace-nowrap"
            >
              {isEditing ? '✓ Done Editing' : '✏️ Edit Profile'}
            </button>
          )}
        </div>

        <div
          style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
          className="w-full border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden px-4 py-6 sm:p-10 backdrop-blur-sm shadow-xl"
        >
          {isEditing ? (
            /* EDIT FORM VIEW */
            <div className="space-y-4 sm:space-y-6 font-mono w-full">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white font-sans text-lg sm:text-xl font-bold focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Education & Focus</label>
                <textarea
                  rows={4}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-white/50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Design Philosophy</label>
                <textarea
                  rows={4}
                  value={philosophy}
                  onChange={(e) => setPhilosophy(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-white/50 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">
                  Expertise Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-white/50"
                />
              </div>
            </div>
          ) : (
            /* DISPLAY VIEW */
            <div className="w-full">
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Hello, I'm <span className="text-white drop-shadow-md">{name}</span>
              </h1>

              <div className="space-y-6 sm:space-y-8 w-full">
                {/* Academic Background */}
                <div>
                  <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2 ml-0.5">Education & Focus</h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed font-light">
                    {education}
                  </p>
                </div>

                {/* Combined UI Interests */}
                <div>
                  <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2 ml-0.5">Design Philosophy</h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed font-light">
                    {philosophy}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div>
                  <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2 ml-0.5">Expertise</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    {tools.map((tool, index) => (
                      <span
                        key={index}
                        className="bg-white/10 border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-white font-medium backdrop-blur-sm"
                      >
                        {tool.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}