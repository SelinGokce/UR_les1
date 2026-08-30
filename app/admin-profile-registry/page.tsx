"use client"

import { useState } from 'react'
import ProjectHeader from '@/components/ui/ProjectHeader'
import UserCard, { UserRecord } from '@/components/users/UserCard'
import UserTabNavigation from '@/components/users/UserTabNavigation'
import AddUserModal from '@/components/users/AddUserModal'
import FeedbackToast from '@/components/users/FeedbackToast'

export default function UserLandingPage() {
    const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user')
    const [selectedUserId, setSelectedUserId] = useState<string>('1')
    const [isEditing, setIsEditing] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const [users, setUsers] = useState<UserRecord[]>([
        {
            id: '1',
            username: 'john_doe',
            firstname: 'John',
            lastname: 'Doe',
            role: 'user',
            socialmedia: [{ platform: 'instagram', account: 'john_doe' }],
            gdprConsent: true,
            newsletter: { subscribed: true, email: 'john@example.com' }
        },
        {
            id: '2',
            username: 'admin_selin',
            firstname: 'Selin',
            lastname: 'Gokce',
            role: 'admin',
            socialmedia: [{ platform: 'github', account: 'selingokce' }],
            gdprConsent: true,
            newsletter: { subscribed: false, email: '' }
        }
    ])

    const filteredUsers = users.filter(u => u.role === activeTab)
    const activeUser = users.find(u => u.id === selectedUserId && u.role === activeTab) || filteredUsers[0]

    const showFeedback = (message: string, type: 'success' | 'error') => {
        setFeedback({ message, type })
        setTimeout(() => setFeedback(null), 4000)
    }

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

    const handleAddUser = (username: string, firstname: string, lastname: string) => {
        const newUser: UserRecord = {
            id: Date.now().toString(),
            username,
            firstname,
            lastname,
            role: activeTab,
            socialmedia: [{ platform: 'github', account: username }],
            gdprConsent: false,
            newsletter: { subscribed: false, email: '' }
        }
        setUsers([...users, newUser])
        setSelectedUserId(newUser.id)
        setIsAddModalOpen(false)
        showFeedback(`New ${activeTab.toUpperCase()} registered: @${newUser.username}`, 'success')
    }

    const handleSaveUser = (updatedUser: UserRecord) => {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))
        setIsEditing(false)
        showFeedback('User profile records synchronized successfully.', 'success')
    }

    return (
        <>
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

                <UserTabNavigation
                    activeTab={activeTab}
                    userCount={users.filter(u => u.role === 'user').length}
                    adminCount={users.filter(u => u.role === 'admin').length}
                    onSelectTab={(tab) => {
                        setActiveTab(tab)
                        setIsEditing(false)
                        const first = users.find(u => u.role === tab)
                        if (first) setSelectedUserId(first.id)
                    }}
                />

                {filteredUsers.length > 0 ? (
                    <div className="space-y-4">
                        {filteredUsers.map((userItem) => {
                            const isSelected = activeUser && userItem.id === activeUser.id
                            return (
                                <UserCard
                                    key={userItem.id}
                                    userItem={userItem}
                                    isSelected={isSelected}
                                    isEditing={isEditing}
                                    onSelect={() => {
                                        if (selectedUserId !== userItem.id) {
                                            setSelectedUserId(userItem.id)
                                            setIsEditing(false)
                                        }
                                    }}
                                    onToggleRole={toggleUserRole}
                                    onDelete={handleDeleteUser}
                                    onToggleEdit={() => {
                                        setSelectedUserId(userItem.id)
                                        setIsEditing(isSelected ? !isEditing : true)
                                    }}
                                    onSaveUser={handleSaveUser}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <div style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(217, 217, 217, 0) 100%)' }} className="border border-white/10 rounded-[2rem] p-12 text-center text-white/60 font-mono">
                        <p>No active accounts found under the <strong className="text-white uppercase">{activeTab}</strong> tab.</p>
                    </div>
                )}

                <FeedbackToast feedback={feedback} />
            </div>

            <AddUserModal
                isOpen={isAddModalOpen}
                activeTab={activeTab}
                onClose={() => setIsAddModalOpen(false)}
                onAddUser={handleAddUser}
            />
        </>
    )
}