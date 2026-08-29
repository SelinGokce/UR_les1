"use client"

import { useState } from 'react'
import ProjectHeader from '@/components/ui/ProjectHeader'

interface ProjectData {
    title: string
    description: string
    tools: string
}

interface ProjectSectionProps {
    projectKey: 'beatbliss' | 'birdseye' | 'consequences'
    projectName: string
    data: ProjectData
    isEditing: boolean
    errors: { title?: string; description?: string; tools?: string }
    onEdit: (key: 'beatbliss' | 'birdseye' | 'consequences' | null) => void
    onFieldChange: (project: 'beatbliss' | 'birdseye' | 'consequences', field: string, value: string) => void
    onSave: (project: 'beatbliss' | 'birdseye' | 'consequences') => void
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
    projectKey,
    projectName,
    data,
    isEditing,
    errors,
    onEdit,
    onFieldChange,
    onSave
}) => {
    return (
        <div
            style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
            className="border border-white/20 rounded-[2rem] p-8 backdrop-blur-sm shadow-xl transition-all duration-300"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{projectName}</h2>
                <button
                    onClick={() => onEdit(isEditing ? null : projectKey)}
                    className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-bold py-2 px-5 rounded-full transition-all duration-300 text-xs uppercase tracking-wider backdrop-blur-sm"
                >
                    {isEditing ? 'Cancel' : '✏️ Modify Fields'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); onSave(projectKey) }} className="space-y-5">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => onFieldChange(projectKey, 'title', e.target.value)}
                            className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-all ${errors.title ? 'border-red-500/50 focus:border-red-500' : 'border-white/10'
                                }`}
                        />
                        {errors.title && <p className="text-red-400 text-xs mt-1 ml-1 font-sans">⚠️ {errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Description Case Study</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => onFieldChange(projectKey, 'description', e.target.value)}
                            rows={4}
                            className={`w-full bg-black/20 border text-white rounded-[1.25rem] px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-all ${errors.description ? 'border-red-500/50 focus:border-red-500' : 'border-white/10'
                                }`}
                        />
                        {errors.description && <p className="text-red-400 text-xs mt-1 ml-1 font-sans">⚠️ {errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">System Architecture Tools</label>
                        <textarea
                            value={data.tools}
                            onChange={(e) => onFieldChange(projectKey, 'tools', e.target.value)}
                            rows={2}
                            className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-all ${errors.tools ? 'border-red-500/50 focus:border-red-500' : 'border-white/10'
                                }`}
                        />
                        {errors.tools && <p className="text-red-400 text-xs mt-1 ml-1 font-sans">⚠️ {errors.tools}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white hover:bg-white/95 text-[#000752] font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-lg"
                    >
                        Commit Changes
                    </button>
                </form>
            ) : (
                <div className="space-y-4 font-light">
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Title</h4>
                        <p className="text-xl text-white font-medium">{data.title}</p>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Description</h4>
                        <p className="text-base text-white/90 leading-relaxed">{data.description}</p>
                    </div>
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Tools</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {data.tools.split(',').map((tool, idx) => (
                                <span
                                    key={idx}
                                    className="bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                                >
                                    {tool.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AdminPage() {
    const [projects, setProjects] = useState({
        beatbliss: {
            title: 'Beat Bliss',
            description: 'A vinyl album titled "Beat Bliss" by the fictional artist Evely Evelynn. I was given the opportunity to not only design a vinyl cover from scratch, but also to work with 3D models and Augmented Reality (AR) that is triggered when the cover is scanned.',
            tools: 'Adobe Dimensions, Adobe Photoshop, Adobe Illustrator, Phone Photography'
        },
        birdseye: {
            title: 'Birds-Eye',
            description: 'Birds-Eye is a nature journaling and photography application designed to help outdoor enthusiasts log their wildlife discoveries while guiding them to find diverse fauna and flora flourishing right in their local surroundings. This enables individuals to discover an immersive hobby and better connect with local ecosystems.',
            tools: 'UI Design, Mockups, Prototyping'
        },
        // SWAPPED: Redux Lantis completely rewritten into Consequences
        consequences: {
            title: 'Consequences',
            description: 'Consequences is an immersive live experience and physical thinkpiece designed to let users express and release deep inner emotions. Participants follow a structured sequence to intentionally shatter a physical plate inside a custom-engineered hexagonal mirror chamber, visualizing the sudden and raw impact of emotional release.',
            tools: 'Interactive Design, Experiential Installation, Hardware Prototyping, Spatial Layout, Team Collaboration'
        }
    })
    const [editingProject, setEditingProject] = useState<'beatbliss' | 'birdseye' | 'consequences' | null>(null)
    const [errors, setErrors] = useState<{ title?: string; description?: string; tools?: string }>({})
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const validateForm = (data: ProjectData) => {
        const newErrors: typeof errors = {}

        if (!data.title.trim()) {
            newErrors.title = 'Title field must not be blank'
        } else if (data.title.trim().length < 3) {
            newErrors.title = 'Title length must equal or exceed 3 characters'
        }

        if (!data.description.trim()) {
            newErrors.description = 'Description profile must not be blank'
        } else if (data.description.trim().length < 10) {
            newErrors.description = 'Description length must equal or exceed 10 characters'
        }

        if (!data.tools.trim()) {
            newErrors.tools = 'System tools mapping is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleFieldChange = (project: 'beatbliss' | 'birdseye' | 'consequences', field: string, value: string) => {
        setProjects(prev => ({
            ...prev,
            [project]: { ...prev[project], [field]: value }
        }))
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSave = (project: 'beatbliss' | 'birdseye' | 'consequences') => {
        if (validateForm(projects[project])) {
            setEditingProject(null)
            const projectNames: { [key: string]: string } = { beatbliss: 'Beat Bliss', birdseye: 'Birds-Eye', consequences: 'Consequences' }
            setFeedback({ message: `System update complete: ${projectNames[project]} configuration pushed successfully.`, type: 'success' })
            console.log(`${project} updated:`, projects[project])
            setTimeout(() => setFeedback(null), 4000)
        }
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 pb-20 fade-in-up">
            <div className="mb-10">
                <ProjectHeader title="Project Configuration Core" />
            </div>

            <div className="flex flex-col gap-8">
                <ProjectSection
                    projectKey="beatbliss"
                    projectName="Beat Bliss"
                    data={projects.beatbliss}
                    isEditing={editingProject === 'beatbliss'}
                    errors={errors}
                    onEdit={setEditingProject}
                    onFieldChange={handleFieldChange}
                    onSave={handleSave}
                />
                <ProjectSection
                    projectKey="birdseye"
                    projectName="Birds-Eye"
                    data={projects.birdseye}
                    isEditing={editingProject === 'birdseye'}
                    errors={errors}
                    onEdit={setEditingProject}
                    onFieldChange={handleFieldChange}
                    onSave={handleSave}
                />
                {/* Renders your pristine structural installation configuration block */}
                <ProjectSection
                    projectKey="consequences"
                    projectName="Consequences"
                    data={projects.consequences}
                    isEditing={editingProject === 'consequences'}
                    errors={errors}
                    onEdit={setEditingProject}
                    onFieldChange={handleFieldChange}
                    onSave={handleSave}
                />

                {/* Floating Feedback Toasts */}
                {feedback && (
                    <div className={`fixed bottom-24 left-10 z-[250] p-4 rounded-2xl border backdrop-blur-md shadow-2xl font-mono text-sm max-w-sm transition-all animate-[fadeInUp_0.3s_ease-out_forwards] ${feedback.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                        }`}>
                        <div className="flex items-center gap-2.5">
                            <span>{feedback.type === 'success' ? '✅' : '🚨'}</span>
                            <p>{feedback.message}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}