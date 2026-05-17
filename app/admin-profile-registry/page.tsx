"use client"

import { useState } from 'react'
import ProjectHeader from '@/components/ui/ProjectHeader'

export default function UserLandingPage() {
    const [isEditing, setIsEditing] = useState(false)
    const [userData, setUserData] = useState({
        username: 'john_doe',
        firstname: 'John',
        lastname: 'Doe',
        socialmedia: [
            { platform: 'instagram', account: 'john_doe' },
            { platform: 'twitter', account: 'john_tweet' }
        ],
        gdprConsent: false,
        newsletter: { subscribed: false, email: '' }
    })
    const [errors, setErrors] = useState<{ username?: string; firstname?: string; lastname?: string; socialmedia?: string; gdprConsent?: string; newsletterEmail?: string }>({})
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const validateForm = () => {
        const newErrors: typeof errors = {}

        if (!userData.username.trim()) {
            newErrors.username = 'Username is required'
        } else if (userData.username.trim().length < 3) {
            newErrors.username = 'Username must be at least 3 characters'
        } else if (!/^[a-zA-Z0-9_]+$/.test(userData.username.trim())) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores'
        }

        if (!userData.firstname.trim()) {
            newErrors.firstname = 'First name is required'
        } else if (userData.firstname.trim().length < 2) {
            newErrors.firstname = 'First name must be at least 2 characters'
        }

        if (!userData.lastname.trim()) {
            newErrors.lastname = 'Last name is required'
        } else if (userData.lastname.trim().length < 2) {
            newErrors.lastname = 'Last name must be at least 2 characters'
        }

        if (userData.socialmedia.length === 0) {
            newErrors.socialmedia = 'At least one social media account is required'
        } else {
            for (const social of userData.socialmedia) {
                if (!social.account.trim() || social.account.trim().length < 2) {
                    newErrors.socialmedia = 'All social media accounts must have at least 2 characters'
                    break
                }
            }
        }

        if (!userData.gdprConsent) {
            newErrors.gdprConsent = 'You must accept GDPR terms'
        }

        if (userData.newsletter.subscribed) {
            const email = userData.newsletter.email.trim()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!email) {
                newErrors.newsletterEmail = 'Email is required when subscribing'
            } else if (!emailRegex.test(email)) {
                newErrors.newsletterEmail = 'Enter a valid email address'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement
        setUserData(prev => ({ ...prev, [name]: value }))
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handleSocialMediaChange = (index: number, field: 'platform' | 'account', value: string) => {
        setUserData(prev => ({
            ...prev,
            socialmedia: prev.socialmedia.map((social, i) =>
                i === index ? { ...social, [field]: value } : social
            )
        }))
        if (errors.socialmedia) {
            setErrors(prev => ({ ...prev, socialmedia: undefined }))
        }
    }

    const addSocialMedia = () => {
        setUserData(prev => ({
            ...prev,
            socialmedia: [...prev.socialmedia, { platform: 'instagram', account: '' }]
        }))
    }

    const removeSocialMedia = (index: number) => {
        setUserData(prev => ({
            ...prev,
            socialmedia: prev.socialmedia.filter((_, i) => i !== index)
        }))
    }

    const toggleGdpr = (value: boolean) => {
        setUserData(prev => ({ ...prev, gdprConsent: value }))
        if (errors.gdprConsent) setErrors(prev => ({ ...prev, gdprConsent: undefined }))
    }

    const toggleNewsletter = (value: boolean) => {
        setUserData(prev => ({ ...prev, newsletter: { ...prev.newsletter, subscribed: value } }))
        if (errors.newsletterEmail) setErrors(prev => ({ ...prev, newsletterEmail: undefined }))
    }

    const setNewsletterEmail = (value: string) => {
        setUserData(prev => ({ ...prev, newsletter: { ...prev.newsletter, email: value } }))
        if (errors.newsletterEmail) setErrors(prev => ({ ...prev, newsletterEmail: undefined }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setIsEditing(false)
            setFeedback({ message: 'User profile registry records synchronized successfully.', type: 'success' })
            console.log('User data updated:', userData)
            setTimeout(() => setFeedback(null), 4000)
        }
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 pb-20 fade-in-up">
            <div className="mb-10">
                <ProjectHeader title="User Profile Registry" />
            </div>

            <div className="flex flex-col gap-6">
                <div
                    style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
                    className="border border-white/20 rounded-[2rem] p-8 backdrop-blur-sm shadow-xl"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            Record Meta ID: <span className="text-white/60 font-mono font-light text-xl">#{userData.username}</span>
                        </h2>
                        <button
                            onClick={() => { setIsEditing(!isEditing); setErrors({}); }}
                            className="bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-bold py-2 px-5 rounded-full transition-all duration-300 text-xs uppercase tracking-wider backdrop-blur-sm"
                        >
                            {isEditing ? 'Cancel' : '✏️ Modify Profile'}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Left Side Form Column */}
                                <div className="flex-1 w-full space-y-5">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Username Reference</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={userData.username}
                                            onChange={handleChange}
                                            className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-all ${errors.username ? 'border-red-500/50' : 'border-white/10'}`}
                                        />
                                        {errors.username && <p className="text-red-400 text-xs mt-1 ml-1 font-sans">⚠️ {errors.username}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">First Name</label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                value={userData.firstname}
                                                onChange={handleChange}
                                                className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-all ${errors.firstname ? 'border-red-500/50' : 'border-white/10'}`}
                                            />
                                            {errors.firstname && <p className="text-red-400 text-xs mt-1 ml-1 font-sans">⚠️ {errors.firstname}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={userData.lastname}
                                                onChange={handleChange}
                                                className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/40 transition-all ${errors.lastname ? 'border-red-500/50' : 'border-white/10'}`}
                                            />
                                            {errors.lastname && <p className="text-red-400 text-xs mt-1 ml-1 font-sans">⚠️ {errors.lastname}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/60 font-bold mb-2 ml-1">Linked Social Nodes</label>
                                        <div className="space-y-3">
                                            {userData.socialmedia.map((social, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <select
                                                        value={social.platform}
                                                        onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                                        className="bg-black/40 border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-white/30 font-mono h-10"
                                                    >
                                                        <option value="instagram" className="bg-[#000752] text-white">Instagram</option>
                                                        <option value="twitter" className="bg-[#000752] text-white">Twitter</option>
                                                        <option value="linkedin" className="bg-[#000752] text-white">LinkedIn</option>
                                                        <option value="facebook" className="bg-[#000752] text-white">Facebook</option>
                                                        <option value="tiktok" className="bg-[#000752] text-white">TikTok</option>
                                                        <option value="youtube" className="bg-[#000752] text-white">YouTube</option>
                                                        <option value="github" className="bg-[#000752] text-white">GitHub</option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        value={social.account}
                                                        onChange={(e) => handleSocialMediaChange(index, 'account', e.target.value)}
                                                        placeholder="Handle reference"
                                                        className={`flex-1 bg-black/20 border text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-white/30 h-10 ${errors.socialmedia ? 'border-red-500/50' : 'border-white/10'}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSocialMedia(index)}
                                                        className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-300 hover:text-white font-bold h-10 px-4 rounded-xl text-xs transition-colors duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.socialmedia && <p className="text-red-400 text-xs mt-2 ml-1 font-sans">⚠️ {errors.socialmedia}</p>}
                                        <button
                                            type="button"
                                            onClick={addSocialMedia}
                                            className="mt-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-1.5 px-4 rounded-xl text-xs transition-all"
                                        >
                                            ➕ Connect Node
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side Checks Column */}
                                <div className="w-full md:w-80 space-y-4">
                                    <div style={{ background: 'rgba(0, 7, 82, 0.3)' }} className="border border-white/10 p-5 rounded-2xl space-y-4">
                                        <div>
                                            <label className="inline-flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={userData.gdprConsent}
                                                    onChange={(e) => toggleGdpr(e.target.checked)}
                                                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#000752] focus:ring-0 cursor-pointer"
                                                />
                                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">GDPR compliance mandatory</span>
                                            </label>
                                            {errors.gdprConsent && <p className="text-red-400 text-xs mt-1.5 ml-1 font-sans">⚠️ {errors.gdprConsent}</p>}
                                        </div>

                                        <div className="border-t border-white/5 pt-4">
                                            <label className="inline-flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={userData.newsletter.subscribed}
                                                    onChange={(e) => toggleNewsletter(e.target.checked)}
                                                    className="w-4 h-4 rounded border-white/20 bg-black/40 text-[#000752] focus:ring-0 cursor-pointer"
                                                />
                                                <span className="text-sm text-white/80 group-hover:text-white transition-colors">Dispatch transmission list</span>
                                            </label>

                                            {userData.newsletter.subscribed && (
                                                <div className="mt-3 animate-[fadeInUp_0.2s_ease-out_forwards]">
                                                    <input
                                                        type="email"
                                                        value={userData.newsletter.email}
                                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                                        placeholder="target@endpoint.com"
                                                        className={`w-full bg-black/20 border text-white rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-white/30 ${errors.newsletterEmail ? 'border-red-500/50' : 'border-white/10'}`}
                                                    />
                                                    {errors.newsletterEmail && <p className="text-red-400 text-xs mt-1.5 ml-1 font-sans">⚠️ {errors.newsletterEmail}</p>}
                                                </div>
                                            )}
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
                                        <p className="text-lg text-white font-medium">{userData.firstname}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Last Name</h4>
                                        <p className="text-lg text-white font-medium">{userData.lastname}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-2">Connected Social Handles</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.socialmedia.map((social, index) => (
                                            <span
                                                key={index}
                                                className="bg-white/10 border border-white/10 text-white/90 px-3 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-sm"
                                            >
                                                <span className="text-white/40 uppercase text-[10px] mr-1">{social.platform}:</span>
                                                @{social.account}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-80 border-l border-white/5 md:pl-8 space-y-5">
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">GDPR Agreement Status</h4>
                                    <p className={`text-sm font-semibold ${userData.gdprConsent ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {userData.gdprConsent ? '✓ Authorized & Compliant' : '𐄂 Pending Acceptance'}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Newsletter Subscription</h4>
                                    <p className="text-sm text-white font-medium">
                                        {userData.newsletter.subscribed ? `✓ Active — ${userData.newsletter.email}` : '𐄂 Not Registered'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
            </div>
        </div>
    )
}