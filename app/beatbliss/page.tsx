"use client"

import Image from 'next/image'
import { useState } from 'react'

export default function ProjectPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: 'Beat Bliss',
    description: 'Een vinyl album genaamd Beat Bliss door een fictief artiest Evely Evelynn. Ik kreeg niet alleen de kans om een vinylhoes helemaal zelf te ontwerpen, maar ook om te werken met 3D-modellen en AR die geactiveerd wordt wanneer de hoes gescand wordt.',
    tools: 'Adobe Dimensions, Adobe Photoshop, Adobe Illustrator, Phone Photography'
  })
  const [errors, setErrors] = useState<{ title?: string; description?: string; tools?: string }>({})
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const validateForm = () => {
    const newErrors: typeof errors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (!formData.tools.trim()) {
      newErrors.tools = 'Tools are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsEditing(false)
      setFeedback({ message: 'Project updated successfully!', type: 'success' })
      console.log('Form submitted:', formData)
      // Auto-hide feedback after 3 seconds
      setTimeout(() => setFeedback(null), 3000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-100">{formData.title}</h1>
        <div className="group relative">
          <a href="https://forms.gle/survey" target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-300 hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
              Take Survey
            </button>
          </a>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-slate-900 text-slate-100 text-sm font-normal py-2 px-3 rounded whitespace-nowrap border border-slate-700">
            Help us improve the Beat Bliss experience
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-white/40 p-6 rounded-lg">
          <p className="text-slate-200">
            {formData.description}
          </p>
        </div>
        <div className="bg-white/40 p-6 rounded-lg">
          <h1 className="text-xl font-bold mb-6 text-slate-100">Gebruikte Tools</h1>
          <ul className="list-disc pl-5 text-slate-200 space-y-2">
            {formData.tools.split(',').map((tool, index) => (
              <li key={index}>{tool.trim()}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/40 p-6 rounded-lg">
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <a href="/beatbliss/mockupbeatblisxs.png" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform inline-block">
                <Image
                  src="/beatbliss/mockupbeatbliss.png"
                  alt="Beat Bliss album mockup"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
            <div className="flex-1">
              <a href="/beatbliss/album.jpeg" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform inline-block">
                <Image
                  src="/beatbliss/album.jpeg"
                  alt="Beat Bliss album"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
            <div className="flex-1">
              <a href="/beatbliss/posterbb.png" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:scale-110 transition-transform inline-block">
                <Image
                  src="/beatbliss/posterbb.png"
                  alt="Beat Bliss album"
                  width={200}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white/40 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-100">Edit Project</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-300 hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-200 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-slate-600'
                    }`}
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-slate-600'
                    }`}
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-2">Tools (comma-separated)</label>
                <textarea
                  name="tools"
                  value={formData.tools}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.tools ? 'border-red-500' : 'border-slate-600'
                    }`}
                />
                {errors.tools && <p className="text-red-400 text-sm mt-1">{errors.tools}</p>}
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className={`p-4 rounded-lg font-semibold text-white animate-pulse ${feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}
