"use client"

import { useState } from 'react'
import ProjectHeader from '@/components/ui/ProjectHeader'

interface UserRecord {
    id: string
    username: string
    firstname: string
    lastname: string
    role: 'user' | 'admin'
    socialmedia: { platform: string; account: string }[]
    gdprConsent: boolean
    newsletter: { subscribed: boolean; email: string }
}

export default function UserLandingPage() {
    // Main Tab State (User vs Admin view category)
    const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')

    // List of registered users
    const [users, setUsers] = useState<UserRecord[]>([
        {
            id: '1',
            username: 'john_doe',
            firstname: 'John',
            lastname: 'Doe',
            role: 'user',
            socialmedia: [
                { platform: 'instagram', account: 'john_doe' },
                { platform: 'twitter', account: 'john_tweet' }
            ],
            gdprConsent: true,
            newsletter: { subscribed: true, email: 'john@example.com' }
        },
        {
            id: '2',
            username: 'admin_selin',
            firstname: 'Selin',
            lastname: 'Gokce',
            role: 'admin',
            socialmedia: [
                { platform: 'github', account: 'selingokce' },
                { platform: 'linkedin', account: 'selin-gokce' }
            ],
            gdprConsent: true,
            newsletter: { subscribed: false, email: '' }
        }
    ])

    const [selectedUserId, setSelectedUserId] = useState<string>('1')
    const [isEditing, setIsEditing] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    // Form states for creating a new user
    const [newUsername, setNewUsername] = useState('')
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')

    // Filter users list based on current active tab selection
    const filteredUsers = users.filter(u => u.role === activeTab)

    // Determine active profile or fallback to first available in current tab
    const activeUser = users.find(u => u.id === selectedUserId && u.role === activeTab) || filteredUsers[0]

    const [errors, setErrors] = useState<{ username?: string; firstname?: string; lastname?: string; newsletterEmail?: string }>({})
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    // Role Switching Function
    const toggleUserRole = (userId: string) => {
        setUsers(prev => prev.map(user => {
            if (user.id === userId) {
                const updatedRole = user.role === 'admin' ? 'user' : 'admin'
                showFeedback(`User role changed to ${updatedRole.toUpperCase()}`, 'success')
                return { ...user, role: updatedRole }
            }
            return user
        }))
    }

    // Delete User Function
    const handleDeleteUser = (userId: string) => {
        if (users.length <= 1) {
            showFeedback('Cannot delete the last remaining user account.', 'error')
            return
        }
        const userToDelete = users.find(u => u.id === userId)
        const updatedUsers = users.filter(u => u.id !== userId)
        setUsers(updatedUsers)

        const remainingInTab = updatedUsers.filter(u => u.role === activeTab)
        if (remainingInTab.length > 0) {
            setSelectedUserId(remainingInTab[0].id)
        }
        showFeedback(`User @${userToDelete?.username} removed successfully.`, 'success')
    }

    // Add New User Handler
    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newUsername.trim() || !newFirstName.trim() || !newLastName.trim()) return

        const newUser: UserRecord = {
            id: Date.now().toString(),
            username: newUsername.trim().toLowerCase(),
            firstname: newFirstName.trim(),
            lastname: newLastName.trim(),
            role: activeTab, // Automatically assigns to the active tab view
            socialmedia: [{ platform: 'github', account: newUsername.trim() }],
            gdprConsent: false,
            newsletter: { subscribed: false, email: '' }
        }

        setUsers([...users, newUser])
        setSelectedUserId(newUser.id)
        setNewUsername('')
        setNewFirstName('')
        setNewLastName('')
        setIsAddModalOpen(false)
        showFeedback(`New ${activeTab.toUpperCase()} registered: @${newUser.username}`, 'success')
    }

    const showFeedback = (message: string, type: 'success' | 'error') => {
        setFeedback({ message, type })
        setTimeout(() => setFeedback(null), 4000)
    }

    const validateForm = () => {
        if (!activeUser) return false
        const newErrors: typeof errors = {}

        if (!activeUser.username.trim()) {
            newErrors.username = 'Username is required'
        } else if (activeUser.username.trim().length < 3) {
            newErrors.username = 'Username must be at least 3 characters'
        }

        if (!activeUser.firstname.trim()) newErrors.firstname = 'First name is required'
        if (!activeUser.lastname.trim()) newErrors.lastname = 'Last name is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const updateActiveUser = (updater: (prev: UserRecord) => UserRecord) => {
        if (!activeUser) return
        setUsers(prev => prev.map(u => u.id === activeUser.id ? updater(u) : u))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setIsEditing(false)
            showFeedback('User profile records synchronized successfully.', 'success')
        }
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 pb-20 fade-in-up">
            <div className="flex justify-between items-center mb-10">
                <ProjectHeader title="User Profile Registry" />
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-white hover:bg-white/90 text-[#000752] font-mono font-bold py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg text-xs uppercase tracking-wider"
                >
                    ➕ Add {activeTab === 'admin' ? 'Admin' : 'User'}
                </button>
            </div>

            {/* TAB NAVIGATION HEADER (User vs Admin) */}
            <div className="flex border-b border-white/10 mb-6 font-mono text-sm">
                <button
                    onClick={() => {
                        setActiveTab('user')
                        setIsEditing(false)
                        const firstUser = users.find(u => u.role === 'user')
                        if (firstUser) setSelectedUserId(firstUser.id)
                    }}
                    className={`pb-3 px-6 font-bold tracking-wider transition-all border-b-2 ${activeTab === 'user'
                            ? 'border-white text-white'
                            : 'border-transparent text-white/40 hover:text-white/70'
                        }`}
                >
                    👥 USER ACCOUNTS ({users.filter(u => u.role === 'user').length})
                </button>
                <button
                    onClick={() => {
                        setActiveTab('admin')
                        setIsEditing(false)
                        const firstAdmin = users.find(u => u.role === 'admin')
                        if (firstAdmin) setSelectedUserId(firstAdmin.id)
                    }}
                    className={`pb-3 px-6 font-bold tracking-wider transition-all border-b-2 ${activeTab === 'admin'
                            ? 'border-white text-white'
                            : 'border-transparent text-white/40 hover:text-white/70'
                        }`}
                >
                    🛡️ ADMIN ACCOUNTS ({users.filter(u => u.role === 'admin').length})
                </button>
            </div>

            {/* Filtered Users Selection Chips */}
            {filteredUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {filteredUsers.map((u) => (
                        <button
                            key={u.id}
                            onClick={() => { setSelectedUserId(u.id); setIsEditing(false); }}
                            className={`px-4 py-1.5 rounded-full border text-xs font-mono transition-all ${activeUser && u.id === activeUser.id
                                    ? 'bg-white text-[#000752] border-white font-bold shadow-md'
                                    : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            @{u.username}
                        </button>
                    ))}
                </div>
            )}

            {/* MAIN CONTENT CONTAINER */}
            {activeUser ? (
                <div className="flex flex-col gap-6">
                    <div
                        style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
                        className="border border-white/20 rounded-[2rem] p-8 backdrop-blur-sm shadow-xl"
                    >
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">
                                    Meta ID: <span className="text-white/60 font-mono font-light text-xl">#{activeUser.username}</span>
                                </h2>
                                <span className="text-xs font-mono text-white/40">Current Access Privilege: <strong className="text-white uppercase">{activeUser.role}</strong></span>
                            </div>

                            {/* User Action Controls */}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => toggleUserRole(activeUser.id)}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono font-bold py-2 px-4 rounded-full transition-all text-xs"
                                >
                                    🔄 Move to {activeUser.role === 'admin' ? 'Users' : 'Admins'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteUser(activeUser.id)}
                                    className="bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white border border-red-500/30 font-mono font-bold py-2 px-4 rounded-full transition-all text-xs"
                                >
                                    🗑️ Remove
                                </button>

                                <button
                                    onClick={() => { setIsEditing(!isEditing); setErrors({}); }}
                                    className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-bold py-2 px-5 rounded-full transition-all duration-300 text-xs uppercase tracking-wider backdrop-blur-sm"
                                >
                                    {isEditing ? 'Cancel' : '✏️ Modify'}
                                </button>
                            </div>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-1 w-full space-y-5">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Username Reference</label>
                                            <input
                                                type="text"
                                                value={activeUser.username}
                                                onChange={(e) => updateActiveUser(prev => ({ ...prev, username: e.target.value }))}
                                                className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 ${errors.username ? 'border-red-500/50' : 'border-white/10'}`}
                                            />
                                            {errors.username && <p className="text-red-400 text-xs mt-1 ml-1">⚠️ {errors.username}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">First Name</label>
                                                <input
                                                    type="text"
                                                    value={activeUser.firstname}
                                                    onChange={(e) => updateActiveUser(prev => ({ ...prev, firstname: e.target.value }))}
                                                    className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={activeUser.lastname}
                                                    onChange={(e) => updateActiveUser(prev => ({ ...prev, lastname: e.target.value }))}
                                                    className="w-full bg-black/20 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side Role & Checks Column */}
                                    <div className="w-full md:w-80 space-y-4">
                                        <div style={{ background: 'rgba(0, 7, 82, 0.3)' }} className="border border-white/10 p-5 rounded-2xl space-y-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Assigned Role Category</label>
                                                <select
                                                    value={activeUser.role}
                                                    onChange={(e) => updateActiveUser(prev => ({ ...prev, role: e.target.value as 'user' | 'admin' }))}
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
                                                        checked={activeUser.gdprConsent}
                                                        onChange={(e) => updateActiveUser(prev => ({ ...prev, gdprConsent: e.target.checked }))}
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
                            // View Profile State
                            <div className="flex flex-col md:flex-row gap-8 font-light">
                                <div className="flex-1 space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">First Name</h4>
                                            <p className="text-lg text-white font-medium">{activeUser.firstname}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Last Name</h4>
                                            <p className="text-lg text-white font-medium">{activeUser.lastname}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-80 border-l border-white/5 md:pl-8 space-y-5">
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Access Privilege</h4>
                                        <p className="text-sm font-semibold font-mono text-white uppercase">
                                            🛡️ {activeUser.role} Category
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">GDPR Agreement Status</h4>
                                        <p className={`text-sm font-semibold ${activeUser.gdprConsent ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {activeUser.gdprConsent ? '✓ Authorized' : '𐄂 Pending Acceptance'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(217, 217, 217, 0) 100%)' }} className="border border-white/10 rounded-[2rem] p-12 text-center text-white/60 font-mono">
                    <p>No active accounts found under the <strong className="text-white uppercase">{activeTab}</strong> tab.</p>
                </div>
            )}

            {/* Floating Notification Alerts */}
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

            {/* ADD USER MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="bg-[#000752] border border-white/20 p-8 rounded-[2rem] w-full max-w-md shadow-2xl mx-4 animate-fade-in font-mono">
                        <h2 className="text-2xl font-bold text-white mb-2">Create New {activeTab === 'admin' ? 'Admin' : 'User'}</h2>
                        <p className="text-xs text-white/50 mb-6">Will be added directly into the <span className="text-white font-bold uppercase">{activeTab}</span> category.</p>

                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
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
                                        value={newFirstName}
                                        onChange={(e) => setNewFirstName(e.target.value)}
                                        placeholder="Alex"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        value={newLastName}
                                        onChange={(e) => setNewLastName(e.target.value)}
                                        placeholder="Smith"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
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
            )}
        </div>
    )
}