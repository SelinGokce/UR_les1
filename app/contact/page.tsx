"use client"

import { useState } from 'react'
import Image from 'next/image'
import ProjectHeader from '@/components/ui/ProjectHeader'
import { useAuth } from '@/components/context/MockAuthContext'

export default function ContactPage() {
    const { currentRole } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTab, setModalTab] = useState<'link' | 'email'>('link')

    // Dynamic States for Direct Email
    const [primaryEmail, setPrimaryEmail] = useState('selin.gokce@example.com')
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [emailInput, setEmailInput] = useState(primaryEmail)

    // Form input states for new entries
    const [newPlatform, setNewPlatform] = useState('')
    const [newLink, setNewLink] = useState('')
    const [newEmailAddress, setNewEmailAddress] = useState('')
    const [newEmailLabel, setNewEmailLabel] = useState('')

    // Local state array for primary/additional emails
    const [emailList, setEmailList] = useState([
        { label: 'Primary Email', email: 'selin.gokce@example.com' }
    ])

    // Local state dataset for social links
    const [contactLinks, setContactLinks] = useState([
        { platform: 'GitHub', href: 'https://github.com' },
        { platform: 'LinkedIn', href: 'https://linkedin.com' }
    ])

    const handleSaveContact = (e: React.FormEvent) => {
        e.preventDefault()

        if (modalTab === 'link') {
            if (!newPlatform || !newLink) return
            setContactLinks([...contactLinks, { platform: newPlatform, href: newLink }])
            setNewPlatform('')
            setNewLink('')
        } else {
            if (!newEmailAddress) return
            setEmailList([
                ...emailList,
                { label: newEmailLabel || 'Secondary Email', email: newEmailAddress }
            ])
            setNewEmailAddress('')
            setNewEmailLabel('')
        }

        setIsModalOpen(false)
    }

    const handleUpdatePrimaryEmail = (e: React.FormEvent) => {
        e.preventDefault()
        if (!emailInput) return
        setPrimaryEmail(emailInput)
        // Update top email in list as well
        const updated = [...emailList]
        if (updated.length > 0) updated[0].email = emailInput
        setEmailList(updated)
        setIsEditingEmail(false)
    }

    return (
        <div className="relative min-h-screen">
            {/* Outer wrapper: Responsive layout direction & spacing */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start max-w-6xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

                {/* Left Side: Sidebar Icon (Aligned Left) */}
                <div className="flex flex-row md:flex-col items-center md:items-start gap-3 mt-2 md:mt-10 opacity-0 [animation-delay:100ms] animate-[fadeInUp_0.8s_ease-out_forwards] self-start">
                    <div className="p-2 sm:p-5 rounded-2xl">
                        <Image
                            src="/userbadge.svg"
                            alt="Contact badge Icon"
                            width={55}
                            height={55}
                            className="w-10 h-10 sm:w-[55px] sm:h-[55px] object-contain"
                        />
                    </div>
                    <span className="text-white text-xl sm:text-2xl font-bold tracking-tight text-left">Contact</span>
                </div>

                {/* Right Side: Content Card */}
                <div className="w-full flex-1 opacity-0 [animation-delay:300ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
                        <div className="flex-1 w-full">
                            <ProjectHeader title="Get in Touch" />
                        </div>

                        {/* CONDITIONAL ADD CONTACT BUTTON */}
                        {(currentRole === 'user' || currentRole === 'admin') && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto bg-white/10 hover:bg-white hover:text-[#000752] text-white border border-white/20 font-mono font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-full transition-all duration-300 backdrop-blur-md text-xs sm:text-sm shadow-lg whitespace-nowrap"
                            >
                                ➕ Add Contact / Email
                            </button>
                        )}
                    </div>

                    <div
                        style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0) 100%)' }}
                        className="border border-white/20 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden p-5 sm:p-10 backdrop-blur-sm shadow-xl"
                    >
                        <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                            Let's <span className="text-white drop-shadow-md">Connect</span>
                        </h1>

                        <div className="space-y-6 sm:space-y-8">
                            {/* Direct Mail Section */}
                            <div>
                                <div className="flex items-center justify-between mb-2 sm:mb-3 max-w-sm">
                                    <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold ml-0.5">Direct Mail</h3>
                                    {(currentRole === 'user' || currentRole === 'admin') && !isEditingEmail && (
                                        <button
                                            onClick={() => setIsEditingEmail(true)}
                                            className="text-xs font-mono text-white/70 hover:text-white underline"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {isEditingEmail ? (
                                    <form onSubmit={handleUpdatePrimaryEmail} className="flex flex-col sm:flex-row gap-2 max-w-md font-mono">
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
                                                className="flex items-center justify-start gap-3 sm:gap-4 w-full max-w-sm py-3 sm:py-3.5 px-5 sm:px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group"
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
                                                    <span className="text-white font-medium text-xs sm:text-sm md:text-base tracking-wide drop-shadow-sm truncate">
                                                        {item.email}
                                                    </span>
                                                    {item.label && (
                                                        <span className="text-[9px] sm:text-[10px] text-white/50 font-mono">{item.label}</span>
                                                    )}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Current Status */}
                            <div>
                                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2 ml-0.5">Current Status</h3>
                                <p className="text-sm sm:text-base text-white leading-relaxed font-light">
                                    Currently open to <span className="font-bold text-white">internships, freelance UI/UX projects, and design collaborations</span>.
                                </p>
                            </div>

                            {/* Social Media Buttons */}
                            <div>
                                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-3 sm:mb-4 ml-0.5">Platforms & Socials</h3>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full">
                                    {contactLinks.map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-start gap-3 sm:gap-4 py-3 sm:py-3.5 px-6 sm:px-8 rounded-full bg-gradient-to-b from-white/25 to-white/10 border border-white/35 shadow-lg backdrop-blur-md hover:bg-white/30 hover:border-white/50 transition-all duration-300 group sm:min-w-[200px]"
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
                                            <span className="text-white font-medium text-xs sm:text-sm md:text-base tracking-wide drop-shadow-sm">
                                                {item.platform}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Creation Modal Overlay (Mobile Responsive Padding) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-[#000752] border border-white/20 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-md shadow-2xl animate-fade-in">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 font-mono">Add Contact Entry</h2>

                        {/* Modal Tab Switcher */}
                        <div className="flex gap-2 mb-6 font-mono text-xs">
                            <button
                                type="button"
                                onClick={() => setModalTab('link')}
                                className={`flex-1 py-2 rounded-xl border transition-all ${modalTab === 'link' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/5 text-white/60 border-white/10'}`}
                            >
                                Social Link
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalTab('email')}
                                className={`flex-1 py-2 rounded-xl border transition-all ${modalTab === 'email' ? 'bg-white text-[#000752] font-bold border-white' : 'bg-white/5 text-white/60 border-white/10'}`}
                            >
                                Email Address
                            </button>
                        </div>

                        <form onSubmit={handleSaveContact} className="space-y-4 font-mono">
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
                                    onClick={() => setIsModalOpen(false)}
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
            )}
        </div>
    )
}