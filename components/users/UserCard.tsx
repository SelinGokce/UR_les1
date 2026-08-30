"use client"

import { useState } from 'react'

export interface UserRecord {
    id: string
    username: string
    firstname: string
    lastname: string
    role: 'user' | 'admin'
    socialmedia: { platform: string; account: string }[]
    gdprConsent: boolean
    newsletter: { subscribed: boolean; email: string }
}

interface UserCardProps {
    userItem: UserRecord
    isSelected: boolean
    isEditing: boolean
    onSelect: () => void
    onToggleRole: (id: string) => void
    onDelete: (id: string) => void
    onToggleEdit: () => void
    onSaveUser: (updatedUser: UserRecord) => void
}

export default function UserCard({
    userItem,
    isSelected,
    isEditing,
    onSelect,
    onToggleRole,
    onDelete,
    onToggleEdit,
    onSaveUser
}: UserCardProps) {
    const [formData, setFormData] = useState<UserRecord>(userItem)
    const [errors, setErrors] = useState<{ username?: string }>({})

    const validate = () => {
        const errs: { username?: string } = {}
        if (!formData.username.trim()) {
            errs.username = 'Username is required'
        } else if (formData.username.trim().length < 3) {
            errs.username = 'Username must be at least 3 characters'
        }
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
            onSaveUser(formData)
        }
    }

    return (
        <div
            style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
            className={`border rounded-[2rem] p-6 backdrop-blur-sm shadow-xl transition-all ${isSelected ? 'border-white bg-white/10' : 'border-white/20 opacity-80 hover:opacity-100'
                }`}
        >
            <div
                className="flex flex-wrap justify-between items-center gap-4 cursor-pointer"
                onClick={onSelect}
            >
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        {userItem.firstname} {userItem.lastname}
                        <span className="text-sm font-mono font-normal text-white/60">(@{userItem.username})</span>
                    </h3>
                    <span className="text-xs font-mono text-white/40">Role: <strong className="text-white uppercase">{userItem.role}</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onToggleRole(userItem.id); }}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold py-1.5 px-3 rounded-full transition-all text-xs"
                    >
                        🔄 Move to {userItem.role === 'admin' ? 'Users' : 'Admins'}
                    </button>

                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onDelete(userItem.id); }}
                        className="bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white border border-red-500/30 font-mono font-bold py-1.5 px-3 rounded-full transition-all text-xs"
                    >
                        🗑️ Remove
                    </button>

                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); onToggleEdit(); }}
                        className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-bold py-1.5 px-4 rounded-full transition-all duration-300 text-xs uppercase tracking-wider backdrop-blur-sm"
                    >
                        {isSelected && isEditing ? 'Cancel' : '✏️ Modify'}
                    </button>
                </div>
            </div>

            {isSelected && (
                <div className="mt-6 pt-6 border-t border-white/10">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1 w-full space-y-5">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Username Reference</label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 ${errors.username ? 'border-red-500/50' : 'border-white/10'}`}
                                        />
                                        {errors.username && <p className="text-red-400 text-xs mt-1 ml-1">⚠️ {errors.username}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">First Name</label>
                                            <input
                                                type="text"
                                                value={formData.firstname}
                                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Last Name</label>
                                            <input
                                                type="text"
                                                value={formData.lastname}
                                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-80 space-y-4">
                                    <div style={{ background: 'rgba(0, 7, 82, 0.3)' }} className="border border-white/10 p-5 rounded-2xl space-y-4">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Assigned Role Category</label>
                                            <select
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                                                className="w-full bg-black/40 border border-white/10 text-white rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
                                            >
                                                <option value="user" className="bg-[#000752]">User</option>
                                                <option value="admin" className="bg-[#000752]">Admin</option>
                                            </select>
                                        </div>

                                        <div className="border-t border-white/5 pt-4">
                                            <label className="inline-flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.gdprConsent}
                                                    onChange={(e) => setFormData({ ...formData, gdprConsent: e.target.checked })}
                                                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#000752]"
                                                />
                                                <span className="text-sm text-white/80">GDPR compliance mandatory</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white hover:bg-white/95 text-[#000752] font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-lg mt-4"
                            >
                                Commit Records
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-8 font-light">
                            <div className="flex-1 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">First Name</h4>
                                        <p className="text-lg text-white font-medium">{userItem.firstname}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Last Name</h4>
                                        <p className="text-lg text-white font-medium">{userItem.lastname}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-80 border-l border-white/5 md:pl-8 space-y-5">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Access Privilege</h4>
                                    <p className="text-sm font-semibold font-mono text-white uppercase">
                                        🛡️ {userItem.role} Category
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">GDPR Agreement Status</h4>
                                    <p className={`text-sm font-semibold ${userItem.gdprConsent ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {userItem.gdprConsent ? '✓ Authorized' : '𐄂 Pending Acceptance'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}