"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Clock from "./Clock"
import { useAuth } from "@/components/context/MockAuthContext"

export default function GlobalNavbar() {
  const pathname = usePathname()
  const { currentRole } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const isHome = pathname === '/'

  // Auto-close menu when changing routes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const standardLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  const adminLinks = [
    { name: 'Configuration core', href: '/admin-configuration' },
    { name: 'Profile Registry', href: '/admin-profile-registry' },
  ]

  const navLinks = currentRole === 'admin' ? [...standardLinks, ...adminLinks] : standardLinks
  const isAdminMode = currentRole === 'admin'

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 sm:top-6 sm:left-10 sm:right-10 z-50 flex items-center justify-between">

        {/* Left Side: Logo & Desktop Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logoblue.svg"
                alt="Selin Logo"
                width={45}
                height={45}
                className="w-10 h-10 sm:w-[45px] sm:h-[45px] rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          {!isHome && (
            <div className="hidden md:flex flex-row gap-3 text-slate-200">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-pill px-4 py-2 rounded-[16px] border transition-all duration-300 backdrop-blur-sm ${isActive
                      ? isAdminMode
                        ? "bg-white text-[#52002b] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : "bg-white text-[#354982] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      : isAdminMode
                        ? "bg-[#52002b]/80 border-white/30 text-slate-200"
                        : "bg-[#354982]/80 border-white/50 text-slate-200"
                      } ${isAdminMode ? 'is-admin' : ''}`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Clock Wrapper */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center">
          <Clock />
        </div>

        {/* Right Side: Hamburger Toggle Button */}
        <div className="flex items-center md:hidden">
          {!isHome && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full border text-white backdrop-blur-md shadow-lg focus:outline-none transition-colors duration-300 ${isAdminMode
                  ? 'bg-[#52002b]/80 border-white/40'
                  : 'bg-[#354982]/80 border-white/40'
                }`}
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                <span
                  className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 absolute ${isOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 absolute top-1.5 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}
                />
                <span
                  className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 absolute ${isOpen ? 'top-1.5 -rotate-45' : 'bottom-0'}`}
                />
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {!isHome && isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-md pt-20 px-4 pb-8 flex flex-col justify-start items-center animate-fade-in overflow-y-auto">

          {/* Main Mobile Card */}
          <div
            style={{
              background: isAdminMode
                ? 'linear-gradient(135deg, rgba(82, 0, 43, 0.75) 0%, rgba(35, 0, 18, 0.5) 100%)'
                : 'linear-gradient(135deg, rgba(53, 73, 130, 0.7) 0%, rgba(0, 7, 82, 0.4) 100%)'
            }}
            className={`w-full max-w-[340px] border rounded-[2rem] p-6 backdrop-blur-md transition-all duration-500 flex flex-col gap-6 mt-2 relative overflow-hidden ${isAdminMode
                ? 'border-pink-300/40 shadow-[0_0_30px_rgba(82,0,43,0.6)]'
                : 'border-cyan-200/40 shadow-[0_0_30px_rgba(53,73,130,0.5)]'
              }`}
          >
            {/* Soft Ambient Light Glow */}
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors duration-500 ${isAdminMode ? 'bg-pink-500/25' : 'bg-cyan-400/20'
              }`} />

            {/* Standard Menu Section */}
            <div className="flex flex-col gap-3 relative z-10">
              <div className={`text-xs font-mono tracking-widest border-b border-white/20 pb-1.5 mb-1 ${isAdminMode ? 'text-pink-100/90' : 'text-cyan-100/90'
                }`}>
                Menu
              </div>
              {standardLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-start w-full py-2.5 px-6 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${isActive
                        ? isAdminMode
                          ? "bg-white text-[#52002b] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                          : "bg-white text-[#354982] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : "bg-gradient-to-b from-white/25 to-white/10 border-white/35 text-white hover:bg-white/30 hover:border-white/50"
                      }`}
                  >
                    <span className="text-xs font-medium tracking-wide drop-shadow-sm">
                      {link.name}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Admin Section */}
            {currentRole === 'admin' && (
              <div className="flex flex-col gap-3 relative z-10">
                <div className="text-pink-200/90 text-xs font-mono tracking-widest border-b border-white/20 pb-1.5 mb-1">
                  Admin
                </div>
                {adminLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-start w-full py-2.5 px-6 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 ${isActive
                          ? "bg-white text-[#52002b] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                          : "bg-gradient-to-b from-white/25 to-white/10 border-white/35 text-white hover:bg-white/30 hover:border-white/50"
                        }`}
                    >
                      <span className="text-xs font-medium tracking-wide drop-shadow-sm">
                        {link.name}
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}