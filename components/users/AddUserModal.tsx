"use client"

import { useState } from 'react'

interface AddUserModalProps {
    isOpen: boolean
    activeTab: 'user' | 'admin'
    onClose: () => void
    onAddUser: (username: string, firstname: string, lastname: string) => void
}

export default function AddUserModal({ isOpen, activeTab, onClose, onAddUser }: AddUserModalProps) {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username.trim() || !firstName.trim() || !lastName.trim()) return
        onAddUser(username.trim().toLowerCase(), firstName.trim(), lastName.trim())
        setUsername('')
        setFirstName('')
        setLastName('')
    }

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="bg-[#000752] border border-white/20 p-8 rounded-[2rem] w-full max-w-md shadow-2xl mx-4 animate-fade-in font-mono">
                <h2 className="text-2xl font-bold text-white mb-2">Create New {activeTab === 'admin' ? 'Admin' : 'User'}</h2>
                <p className="text-xs text-white/50 mb-6">Will be added directly into the <span className="text-white font-bold uppercase">{activeTab}</span> category list.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. alex_dev"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Alex"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Smith"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 py-2 rounded-xl text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-white text-[#000752] font-bold py-2 rounded-xl text-sm hover:bg-white/90 transition-colors"
                        >
                            Register Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}