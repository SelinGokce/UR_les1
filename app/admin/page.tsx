"use client"

import { useState } from 'react'

interface ProjectData {
    title: string
    description: string
    tools: string
}

interface ProjectSectionProps {
    projectKey: 'beatbliss' | 'birdseye' | 'lantisapp'
    projectName: string
    data: ProjectData
    isEditing: boolean
    errors: { title?: string; description?: string; tools?: string }
    onEdit: (key: 'beatbliss' | 'birdseye' | 'lantisapp' | null) => void
    onFieldChange: (project: 'beatbliss' | 'birdseye' | 'lantisapp', field: string, value: string) => void
    onSave: (project: 'beatbliss' | 'birdseye' | 'lantisapp') => void
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
        <div className="bg-slate-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-100">{projectName}</h2>
                <button
                    onClick={() => onEdit(isEditing ? null : projectKey)}
                    className="bg-blue-300 hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); onSave(projectKey) }} className="space-y-4">
                    <div>
                        <label className="block text-slate-200 font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => onFieldChange(projectKey, 'title', e.target.value)}
                            className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-slate-600'
                                }`}
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-200 font-semibold mb-2">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => onFieldChange(projectKey, 'description', e.target.value)}
                            rows={4}
                            className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-slate-600'
                                }`}
                        />
                        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-slate-200 font-semibold mb-2">Tools (comma-separated)</label>
                        <textarea
                            value={data.tools}
                            onChange={(e) => onFieldChange(projectKey, 'tools', e.target.value)}
                            rows={2}
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
            ) : (
                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm">Title</p>
                        <p className="text-slate-100 font-semibold">{data.title}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Description</p>
                        <p className="text-slate-100">{data.description}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Tools</p>
                        <p className="text-slate-100">{data.tools}</p>
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
            description: 'Een vinyl album genaamd Beat Bliss door een fictief artiest Evely Evelynn. Ik kreeg niet alleen de kans om een vinylhoes helemaal zelf te ontwerpen, maar ook om te werken met 3D-modellen en AR die geactiveerd wordt wanneer de hoes gescand wordt.',
            tools: 'Adobe Dimensions, Adobe Photoshop, Adobe Illustrator, Phone Photography'
        },
        birdseye: {
            title: 'Birds Eye',
            description: 'Birds-Eye is een app voor natuurdagboeken en fotografie die je ook helpt bij het vinden van verschillende soorten fauna en flora in jouw omgeving. Zo kunnen mensen een nieuwe hobby ontdekken en hun omgeving beter leren kennen.',
            tools: 'UI Design, Mockups'
        },
        lantisapp: {
            title: 'Redux Lantis',
            description: 'Redux-Lantis is een locatiegebaseerd spel dat op een leuke en boeiende manier het belang van de Oosterweelverbinding in Antwerpen laat zien. Dit was een groepsproject waaraan ik het geluk had mee te mogen werken en waarvoor we een werkend spel hebben gemaakt met HTML, CSS en JS.',
            tools: 'HTML, CSS, JS, Server Deploy, Groepswerk'
        }
    })
    const [editingProject, setEditingProject] = useState<'beatbliss' | 'birdseye' | 'lantisapp' | null>(null)
    const [errors, setErrors] = useState<{ title?: string; description?: string; tools?: string }>({})
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const validateForm = (data: ProjectData) => {
        const newErrors: typeof errors = {}

        if (!data.title.trim()) {
            newErrors.title = 'Title is required'
        } else if (data.title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters'
        }

        if (!data.description.trim()) {
            newErrors.description = 'Description is required'
        } else if (data.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters'
        }

        if (!data.tools.trim()) {
            newErrors.tools = 'Tools are required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleFieldChange = (project: 'beatbliss' | 'birdseye' | 'lantisapp', field: string, value: string) => {
        setProjects(prev => ({
            ...prev,
            [project]: { ...prev[project], [field]: value }
        }))
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSave = (project: 'beatbliss' | 'birdseye' | 'lantisapp') => {
        if (validateForm(projects[project])) {
            setEditingProject(null)
            const projectNames: { [key: string]: string } = { beatbliss: 'Beat Bliss', birdseye: 'Birds Eye', lantisapp: 'Redux Lantis' }
            setFeedback({ message: `${projectNames[project]} updated successfully!`, type: 'success' })
            console.log(`${project} updated:`, projects[project])
            setTimeout(() => setFeedback(null), 3000)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-100">Admin Panel</h1>
            <div className="flex flex-col gap-6">
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
                    projectName="Birds Eye"
                    data={projects.birdseye}
                    isEditing={editingProject === 'birdseye'}
                    errors={errors}
                    onEdit={setEditingProject}
                    onFieldChange={handleFieldChange}
                    onSave={handleSave}
                />
                <ProjectSection
                    projectKey="lantisapp"
                    projectName="Redux Lantis"
                    data={projects.lantisapp}
                    isEditing={editingProject === 'lantisapp'}
                    errors={errors}
                    onEdit={setEditingProject}
                    onFieldChange={handleFieldChange}
                    onSave={handleSave}
                />

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
