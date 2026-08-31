"use client"

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import ProjectHeader from '@/components/ui/ProjectHeader'
import ProjectInfoCard from '@/components/ui/ProjectInfoCard'
import ImageGallery from '@/components/ui/ImageGallery'
import { useAuth } from '@/components/context/MockAuthContext'

export interface ProjectImageData {
    src: string
    alt: string
}

export interface ProjectDetailsData {
    title: string
    description: string
    tools: string
    images: ProjectImageData[]
}

interface EditableProjectSectionProps {
    initialData: ProjectDetailsData
    onImageClick: (index: number) => void
}

export default function EditableProjectSection({ initialData, onImageClick }: EditableProjectSectionProps) {
    const { currentRole } = useAuth()
    const canEdit = currentRole === 'user' || currentRole === 'admin'

    const [mounted, setMounted] = useState(false)
    const [projectData, setProjectData] = useState<ProjectDetailsData>(initialData)

    // Details Edit Mode
    const [isEditingDetails, setIsEditingDetails] = useState(false)
    const [editTitle, setEditTitle] = useState(projectData.title)
    const [editDescription, setEditDescription] = useState(projectData.description)
    const [editTools, setEditTools] = useState(projectData.tools)

    // Images Edit Mode
    const [isEditingImages, setIsEditingImages] = useState(false)
    const [tempImages, setTempImages] = useState<ProjectImageData[]>(projectData.images)

    // Hydration check for Portal
    useEffect(() => {
        setMounted(true)
    }, [])

    // Save / Cancel Details
    const handleSaveDetails = (e: React.FormEvent) => {
        e.preventDefault()
        setProjectData((prev) => ({
            ...prev,
            title: editTitle,
            description: editDescription,
            tools: editTools,
        }))
        setIsEditingDetails(false)
    }

    const handleCancelDetails = () => {
        setEditTitle(projectData.title)
        setEditDescription(projectData.description)
        setEditTools(projectData.tools)
        setIsEditingDetails(false)
    }

    // Gallery Editor Actions
    const handleSaveImages = () => {
        setProjectData((prev) => ({ ...prev, images: tempImages }))
        setIsEditingImages(false)
    }

    const handleImageChange = (index: number, field: keyof ProjectImageData, value: string) => {
        const updated = [...tempImages]
        updated[index][field] = value
        setTempImages(updated)
    }

    const handleAddImage = () => {
        setTempImages([...tempImages, { src: '/placeholder.png', alt: 'New Visual' }])
    }

    const handleRemoveImage = (index: number) => {
        setTempImages(tempImages.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-8 sm:space-y-12">
            {/* SECTION 1: PROJECT DETAILS */}
            <section className="opacity-0 [animation-delay:200ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
                <div className="flex justify-between items-center mb-4">
                    <ProjectHeader title="Project Details" />
                    {canEdit && !isEditingDetails && (
                        <button
                            onClick={() => setIsEditingDetails(true)}
                            className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-mono text-xs py-1.5 px-4 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer"
                        >
                            ✏️ Edit Details
                        </button>
                    )}
                </div>

                {isEditingDetails ? (
                    <form onSubmit={handleSaveDetails} className="border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] p-6 backdrop-blur-sm bg-gradient-to-b from-white/20 to-white/5 space-y-4 font-mono">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Project Title</label>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-white/50"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Description</label>
                            <textarea
                                rows={4}
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-white/50 resize-y"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Tools / Technologies</label>
                            <input
                                type="text"
                                value={editTools}
                                onChange={(e) => setEditTools(e.target.value)}
                                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-white/50"
                                required
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="bg-white text-[#000752] font-bold px-5 py-2 rounded-full text-xs hover:bg-white/90 cursor-pointer"
                            >
                                Save Details
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelDetails}
                                className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-xs hover:bg-white/20 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <ProjectInfoCard
                        title={projectData.title}
                        description={projectData.description}
                        tools={projectData.tools}
                    />
                )}
            </section>

            {/* SECTION 2: VISUALS GALLERY */}
            <section className="opacity-0 [animation-delay:400ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
                <div className="flex justify-between items-center mb-4">
                    <ProjectHeader title="Visuals" />
                    {canEdit && !isEditingImages && (
                        <button
                            onClick={() => {
                                setTempImages(projectData.images)
                                setIsEditingImages(true)
                            }}
                            className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-mono text-xs py-1.5 px-4 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer"
                        >
                            🖼️ Edit Images
                        </button>
                    )}
                </div>

                <ImageGallery
                    images={projectData.images}
                    onImageClick={onImageClick}
                />
            </section>

            {/* PORTALED FULLSCREEN MOCK IMAGE EDITOR MODAL */}
            {mounted && isEditingImages && createPortal(
                <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-[#000752]/90 border border-white/20 rounded-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto space-y-6 font-mono">
                        <div className="flex justify-between items-center border-b border-white/20 pb-3">
                            <h3 className="text-white font-bold text-base">Mock Image Gallery Editor</h3>
                            <button
                                onClick={() => setIsEditingImages(false)}
                                className="text-white/60 hover:text-white text-sm cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            {tempImages.map((img, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-3 items-center bg-white/5 p-3 rounded-xl border border-white/10">
                                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/20 bg-black/30">
                                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 w-full space-y-2">
                                        <input
                                            type="text"
                                            value={img.src}
                                            onChange={(e) => handleImageChange(idx, 'src', e.target.value)}
                                            placeholder="Image Path / URL"
                                            className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            value={img.alt}
                                            onChange={(e) => handleImageChange(idx, 'alt', e.target.value)}
                                            placeholder="Alt Text / Caption"
                                            className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleRemoveImage(idx)}
                                        className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 self-end sm:self-center cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleAddImage}
                            className="w-full py-2 border border-dashed border-white/30 rounded-xl text-xs text-white/80 hover:text-white hover:border-white/60 transition-all cursor-pointer"
                        >
                            + Add New Image Slot
                        </button>

                        <div className="flex justify-end gap-3 pt-3 border-t border-white/20">
                            <button
                                onClick={() => setIsEditingImages(false)}
                                className="bg-white/10 text-white px-4 py-2 rounded-full text-xs hover:bg-white/20 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveImages}
                                className="bg-white text-[#000752] font-bold px-5 py-2 rounded-full text-xs hover:bg-white/90 cursor-pointer"
                            >
                                Save Gallery
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}