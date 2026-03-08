"use client"

import { useState } from 'react'

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

        // GDPR must be accepted
        if (!userData.gdprConsent) {
            newErrors.gdprConsent = 'You must accept GDPR terms'
        }

        // If subscribed to newsletter, require valid email
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
        const { name, value, type } = e.target as HTMLInputElement
        // handle simple inputs
        setUserData(prev => ({ ...prev, [name]: value }))
        // Clear error for this field when user starts typing
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
            setFeedback({ message: 'Profile updated successfully!', type: 'success' })
            console.log('User data updated:', userData)
            // Auto-hide feedback after 3 seconds
            setTimeout(() => setFeedback(null), 3000)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-100">User Profile</h1>
            <div className="flex flex-col gap-6">
                {/* User Information Display */}
                <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-slate-100">Profile Information</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-blue-300 hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="md:flex md:items-start md:gap-6">
                                {/* Left column: personal fields */}
                                <div className="flex-1 md:w-2/3">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-slate-200 font-semibold mb-2">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={userData.username}
                                                onChange={handleChange}
                                                className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.username ? 'border-red-500' : 'border-slate-600'
                                                    }`}
                                            />
                                            {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                                        </div>

                                        <div className="md:flex md:gap-4">
                                            <div className="flex-1">
                                                <label className="block text-slate-200 font-semibold mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    value={userData.firstname}
                                                    onChange={handleChange}
                                                    className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.firstname ? 'border-red-500' : 'border-slate-600'
                                                        }`}
                                                />
                                                {errors.firstname && <p className="text-red-400 text-sm mt-1">{errors.firstname}</p>}
                                            </div>

                                            <div className="flex-1 mt-4 md:mt-0">
                                                <label className="block text-slate-200 font-semibold mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    value={userData.lastname}
                                                    onChange={handleChange}
                                                    className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.lastname ? 'border-red-500' : 'border-slate-600'
                                                        }`}
                                                />
                                                {errors.lastname && <p className="text-red-400 text-sm mt-1">{errors.lastname}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-slate-200 font-semibold mb-2">Social Media Accounts</label>
                                            <div className="space-y-3">
                                                {userData.socialmedia.map((social, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <select
                                                            value={social.platform}
                                                            onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                                                            className="flex-1 bg-slate-700 text-slate-100 rounded px-3 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                                                        >
                                                            <option value="instagram">Instagram</option>
                                                            <option value="twitter">Twitter</option>
                                                            <option value="linkedin">LinkedIn</option>
                                                            <option value="facebook">Facebook</option>
                                                            <option value="tiktok">TikTok</option>
                                                            <option value="youtube">YouTube</option>
                                                            <option value="github">GitHub</option>
                                                        </select>
                                                        <input
                                                            type="text"
                                                            value={social.account}
                                                            onChange={(e) => handleSocialMediaChange(index, 'account', e.target.value)}
                                                            placeholder="Account name"
                                                            className={`flex-1 bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.socialmedia ? 'border-red-500' : 'border-slate-600'}`}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSocialMedia(index)}
                                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded transition-colors duration-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            {errors.socialmedia && <p className="text-red-400 text-sm mt-1">{errors.socialmedia}</p>}
                                            <button
                                                type="button"
                                                onClick={addSocialMedia}
                                                className="mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                                            >
                                                Add Social Media
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right column: GDPR & Newsletter */}
                                <div className="md:w-1/3 flex-1 mt-4 md:mt-0">
                                    <div className="bg-slate-900 p-4 rounded">
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={userData.gdprConsent}
                                                onChange={(e) => toggleGdpr(e.target.checked)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-slate-200">I accept GDPR terms</span>
                                        </label>
                                        {errors.gdprConsent && <p className="text-red-400 text-sm mt-1">{errors.gdprConsent}</p>}

                                        <div className="mt-4">
                                            <label className="inline-flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={userData.newsletter.subscribed}
                                                    onChange={(e) => toggleNewsletter(e.target.checked)}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-slate-200">Subscribe to newsletter</span>
                                            </label>
                                            {userData.newsletter.subscribed && (
                                                <div className="mt-2">
                                                    <input
                                                        type="email"
                                                        value={userData.newsletter.email}
                                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        className={`w-full bg-slate-700 text-slate-100 rounded px-3 py-2 border focus:outline-none focus:border-blue-500 ${errors.newsletterEmail ? 'border-red-500' : 'border-slate-600'}`}
                                                    />
                                                    {errors.newsletterEmail && <p className="text-red-400 text-sm mt-1">{errors.newsletterEmail}</p>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="md:flex md:gap-6">
                            <div className="md:w-2/3">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-slate-400 text-sm">Username</p>
                                        <p className="text-slate-100 font-semibold">{userData.username}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm">First Name</p>
                                        <p className="text-slate-100 font-semibold">{userData.firstname}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm">Last Name</p>
                                        <p className="text-slate-100 font-semibold">{userData.lastname}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm">Social Media</p>
                                        <div className="space-y-1">
                                            {userData.socialmedia.map((social, index) => (
                                                <p key={index} className="text-slate-100 font-semibold">
                                                    {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)} - {social.account}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 md:w-1/3">
                                <div>
                                    <p className="text-slate-400 text-sm">GDPR Consent</p>
                                    <p className="text-slate-100 font-semibold">{userData.gdprConsent ? 'Accepted' : 'Not accepted'}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-slate-400 text-sm">Newsletter</p>
                                    <p className="text-slate-100 font-semibold">{userData.newsletter.subscribed ? `Subscribed - ${userData.newsletter.email}` : 'Not subscribed'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
