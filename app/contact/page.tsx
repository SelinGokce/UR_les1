"use client"

import { useState } from 'react'
import ProjectHeader from '@/components/ui/ProjectHeader'
import { useAuth } from '@/components/context/MockAuthContext'
import ContactSidebarBadge from '@/components/contact/ContactSidebarBadge'
import DirectMailSection, { EmailItem } from '@/components/contact/DirectMailSection'
import SocialPlatformsSection, { ContactLink } from '@/components/contact/SocialPlatformsSection'
import AddContactModal from '@/components/contact/AddContactModal'

export default function ContactPage() {
    const { currentRole } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [emailList, setEmailList] = useState<EmailItem[]>([
        { label: 'Primary Email', email: 'selin.gokce@example.com' }
    ])

    const [contactLinks, setContactLinks] = useState<ContactLink[]>([
        { platform: 'GitHub', href: 'https://github.com' },
        { platform: 'LinkedIn', href: 'https://linkedin.com' }
    ])

    const canModify = currentRole === 'user' || currentRole === 'admin'

    const handleUpdatePrimaryEmail = (newEmail: string) => {
        const updated = [...emailList]
        if (updated.length > 0) updated[0].email = newEmail
        setEmailList(updated)
    }

    return (
        <div className="relative min-h-screen">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start max-w-6xl mx-auto pt-4 sm:pt-10 pb-12 sm:pb-20 px-3 sm:px-4 fade-in-up">

                <ContactSidebarBadge />

                <div className="w-full flex-1 opacity-0 [animation-delay:300ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
                        <div className="flex-1 w-full">
                            <ProjectHeader title="Get in Touch" />
                        </div>

                        {canModify && (
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
                            Let's <span className="text-white drop-shadow-md">Connect!</span>
                        </h1>

                        <div className="space-y-6 sm:space-y-8">
                            <DirectMailSection
                                emailList={emailList}
                                canEdit={canModify}
                                onUpdatePrimaryEmail={handleUpdatePrimaryEmail}
                            />

                            <div>
                                <h3 className="text-xs sm:text-sm uppercase tracking-widest text-white/60 font-bold mb-1.5 sm:mb-2 ml-0.5">Current Status</h3>
                                <p className="text-sm sm:text-base text-white leading-relaxed font-light">
                                    Currently open to <span className="font-bold text-white">internships, freelance UI/UX projects, and design collaborations</span>.
                                </p>
                            </div>

                            <SocialPlatformsSection contactLinks={contactLinks} />
                        </div>
                    </div>
                </div>
            </div>

            <AddContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddLink={(platform, href) => setContactLinks([...contactLinks, { platform, href }])}
                onAddEmail={(label, email) => setEmailList([...emailList, { label, email }])}
            />
        </div>
    )
}