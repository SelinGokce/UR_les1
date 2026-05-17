"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Clock from "./Clock"
import { useAuth } from "@/components/context/MockAuthContext"

export default function GlobalNavbar() {
  const pathname = usePathname()
  const { currentRole } = useAuth()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
  ]

  if (currentRole === 'admin') {
    navLinks.push(
      { name: 'Configuration core', href: '/admin-configuration' },
      { name: 'Profile Registry', href: '/admin-profile-registry' }
    )
  }

  // Check if we need to apply the admin styling classes
  const isAdminMode = currentRole === 'admin'

  return (
    <nav className="fixed top-6 left-10 right-10 z-50 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <Image
            src="/logoblue.svg"
            alt="Selin Logo"
            width={45}
            height={45}
            className="rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
        </div>

        <div className="flex flex-row gap-3 text-slate-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                /* 1. Added a 'nav-pill' identity class 
                  2. Conditionally appended 'is-admin' to handle the color shifting transitions
                */
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
      </div>

      <Clock />
    </nav>
  )
}