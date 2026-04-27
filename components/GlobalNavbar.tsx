"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Clock from "./Clock" // Import your new component

export default function GlobalNavbar() {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Project Beat Bliss', href: '/beatbliss' },
    { name: 'Project Birds Eye', href: '/birdseye' },
    { name: 'Project Redux Lantis', href: '/lantisapp' },
  ]

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
                className={`px-4 py-2 rounded-[16px] border transition-all duration-300 backdrop-blur-sm ${isActive
                    ? "bg-white text-[#354982] border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-[#354982]/80 border-white/50 hover:bg-[#4a5f9e] hover:border-white"
                  }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* The separate Clock component */}
      <Clock />
    </nav>
  )
}