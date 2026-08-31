"use client"

import { useState } from 'react'
import Image from 'next/image'

export interface EmailItem {
    label: string
    email: string
}

interface DirectMailSectionProps {
    emailList: EmailItem[]
    canEdit: boolean
    onUpdatePrimaryEmail: (newEmail: string) => void
}

export default function DirectMailSection({ emailList, canEdit, onUpdatePrimaryEmail }: DirectMailSectionProps) {
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [emailInput, setEmailInput] = useState(emailList[0]?.email || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!emailInput) return
        onUpdatePrimaryEmail(emailInput)
        setIsEditingEmail(false)
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3 max-w-sm">
                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold ml-0.5">Direct Mail</h3>
                {canEdit && !isEditingEmail && (
                    <button
                        onClick={() => setIsEditingEmail(true)}
                        className="text-xs font-mono text-white/70 hover:text-white underline cursor-pointer"
                    >
                        Edit
                    </button>
                )}
            </div>

            {isEditingEmail ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md font-mono">
                    <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-xs sm:text-sm focus:outline-none flex-1"
                        required
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 sm:flex-none bg-white text-[#000752] font-bold px-4 py-2 rounded-full text-xs hover:bg-white/90"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditingEmail(false)}
                            className="flex-1 sm:flex-none bg-white/10 text-white px-3 py-2 rounded-full text-xs hover:bg-white/20"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-3">
                    {emailList.map((item, idx) => (
                        <a
                            key={idx}
                            href={`mailto:${item.email}`}
                            className="flex items-center justify-start gap-3 sm:gap-4 w-full py-3 sm:py-3.5 px-5 sm:px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group"
                        >
                            <div className="relative w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] shrink-0">
                                <Image
                                    src="/star-button.svg"
                                    alt="Star icon outlined"
                                    width={20}
                                    height={20}
                                    className="block group-hover:hidden transition-all duration-200 object-contain w-full h-full"
                                />
                                <Image
                                    src="/star.svg"
                                    alt="Star icon filled"
                                    width={20}
                                    height={20}
                                    className="hidden group-hover:block group-hover:scale-110 transition-all duration-200 object-contain w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col text-left overflow-hidden">
                                <span className="text-white font-medium text-xs sm:text-sm md:text-base tracking-wide drop-shadow-md truncate">
                                    {item.email}
                                </span>
                                {item.label && (
                                    <span className="text-[10px] sm:text-[11px] text-white/80 font-mono drop-shadow-sm">{item.label}</span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}