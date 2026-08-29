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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  if (currentRole === 'admin') {
    navLinks.push(
      { name: 'Configuration core', href: '/admin-configuration' },
      { name: 'Profile Registry', href: '/admin-profile-registry' }
    )
  }

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

        {/* Center: Clock Module */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Clock />
        </div>

        {/* Right Side: Symmetrical Hamburger / Close Button */}
        <div className="flex items-center">
          {!isHome && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-[#354982]/80 border border-white/40 text-white backdrop-blur-md shadow-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                {/* Top line */}
                <span
                  className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 absolute ${isOpen ? 'top-1.5 rotate-45' : 'top-0'
                    }`}
                />
                {/* Middle line */}
                <span
                  className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 absolute top-1.5 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'
                    }`}
                />
                {/* Bottom line */}
                <span
                  className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 absolute ${isOpen ? 'top-1.5 -rotate-45' : 'bottom-0'
                    }`}
                />
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Vertical Drawer Overlay */}
      {!isHome && isOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-md pt-24 px-6 pb-10 flex flex-col justify-start animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center py-3.5 px-6 rounded-2xl border text-sm font-medium transition-all duration-300 ${isActive
                    ? isAdminMode
                      ? "bg-white text-[#52002b] border-white font-bold shadow-lg"
                      : "bg-white text-[#354982] border-white font-bold shadow-lg"
                    : isAdminMode
                      ? "bg-[#52002b]/90 border-white/30 text-slate-100"
                      : "bg-[#354982]/90 border-white/40 text-slate-100"
                    }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}