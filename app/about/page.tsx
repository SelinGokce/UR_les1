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
    <div className="flex gap-12 items-start max-w-6xl mx-auto pt-10 pb-20 fade-in-up">

      {/* Left Side: Sidebar Icon */}
      <div className="flex flex-col items-center gap-3 mt-10 opacity-0 [animation-delay:100ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
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
      <div className="flex-1 opacity-0 [animation-delay:300ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <ProjectHeader title="Personal Profile" />
          </div>

          {/* CONDITIONAL EDIT MODE BUTTON */}
          {(currentRole === 'user' || currentRole === 'admin') && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="ml-4 bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-mono font-bold py-2.5 px-6 rounded-full transition-all duration-300 backdrop-blur-md text-sm shadow-lg whitespace-nowrap"
            >
              {isEditing ? '✓ Done Editing' : '✏️ Edit Profile'}
            </button>
          )}
        </div>

        <div
          style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
          className="border border-white/20 rounded-[2rem] overflow-hidden p-10 backdrop-blur-sm shadow-xl"
        >
          {isEditing ? (
            /* EDIT FORM VIEW */
            <div className="space-y-6 font-mono">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white font-sans text-xl font-bold focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Education & Focus</label>
                <textarea
                  rows={3}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white font-sans text-sm focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Design Philosophy</label>
                <textarea
                  rows={3}
                  value={philosophy}
                  onChange={(e) => setPhilosophy(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white font-sans text-sm focus:outline-none focus:border-white/50"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Expertise Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={toolsInput}
                  onChange={(e) => setToolsInput(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-white/50"
                />
              </div>
            </div>
          ) : (
            /* DISPLAY VIEW */
            <>
              <h1 className="text-2xl font-bold text-white mb-6">
                Hello, I'm <span className="text-white drop-shadow-md">{name}</span>
              </h1>

              <div className="space-y-8">
                {/* Academic Background */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Education & Focus</h3>
                  <p className="text-l text-white leading-relaxed font-light">
                    {education}
                  </p>
                </div>

                {/* Combined UI Interests */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Design Philosophy</h3>
                  <p className="text-l text-white leading-relaxed font-light">
                    {philosophy}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-white/60 font-bold mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tools.map((tool, index) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}