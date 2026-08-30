"use client"

import { useState } from 'react'

interface AddContactModalProps {
    isOpen: boolean
    onClose: () => void
    onAddLink: (platform: string, href: string) => void
    onAddEmail: (label: string, email: string) => void
}

export default function AddContactModal({ isOpen, onClose, onAddLink, onAddEmail }: AddContactModalProps) {
    const [modalTab, setModalTab] = useState<'link' | 'email'>('link')
    const [newPlatform, setNewPlatform] = useState('')
    const [newLink, setNewLink] = useState('')
    const [newEmailAddress, setNewEmailAddress] = useState('')
    const [newEmailLabel, setNewEmailLabel] = useState('')

    if (!isOpen) return null

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        if (modalTab === 'link') {
            if (!newPlatform || !newLink) return
            onAddLink(newPlatform, newLink)
            setNewPlatform('')
            setNewLink('')
        } else {
            if (!newEmailAddress) return
            onAddEmail(newEmailLabel || 'Secondary Email', newEmailAddress)
            setNewEmailAddress('')
            setNewEmailLabel('')
        }

        onClose()
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="bg-[#000752] border border-white/20 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-md shadow-2xl animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 font-mono">Add Contact Entry</h2>

                <div className="flex gap-2 mb-6 font-mono text-xs">
                    <button
                        type="button"
                        onClick={() => setModalTab('link')}
                        className={`flex-1 py-2 rounded-xl border transition-all ${modalTab === 'link' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/5 text-white/60 border-white/10'
                            }`}
                    >
                        Social Link
                    </button>
                    <button
                        type="button"
                        onClick={() => setModalTab('email')}
                        className={`flex-1 py-2 rounded-xl border transition-all ${modalTab === 'email' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/5 text-white/60 border-white/10'
                            }`}
                    >
                        Email Address
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4 font-mono">
                    {modalTab === 'link' ? (
                        <>
                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Platform Name</label>
                                <input
                                    type="text"
                                    value={newPlatform}
                                    onChange={(e) => setNewPlatform(e.target.value)}
                                    placeholder="e.g., Behance / Dribbble"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">URL / Link</label>
                                <input
                                    type="text"
                                    value={newLink}
                                    onChange={(e) => setNewLink(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Email Label</label>
                                <input
                                    type="text"
                                    value={newEmailLabel}
                                    onChange={(e) => setNewEmailLabel(e.target.value)}
                                    placeholder="e.g., Work / Alternative Email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mb-1.5 sm:mb-2 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={newEmailAddress}
                                    onChange={(e) => setNewEmailAddress(e.target.value)}
                                    placeholder="name@domain.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-white focus:outline-none focus:border-white/40 text-xs sm:text-sm"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 py-2 rounded-xl text-xs sm:text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-white text-[#000752] font-bold py-2 rounded-xl text-xs sm:text-sm hover:bg-white/90 transition-colors"
                        >
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}