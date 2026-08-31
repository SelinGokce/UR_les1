"use client"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6 sm:py-10 text-center text-white mt-auto z-20 px-4">
      <div className="mb-2 sm:mb-4 text-white/70 text-xs sm:text-sm font-mono">
        &copy; {currentYear} <span className="font-bold text-white">Selin Gokce</span>. All rights reserved.
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[11px] sm:text-sm text-white/80 font-mono">
        <Link href="/terms-of-agreement" className="hover:text-white hover:underline transition-colors whitespace-nowrap">
          Terms of Agreement
        </Link>
        <span className="text-white/30 hidden xs:inline">•</span>
        <Link href="/copyright-regulations" className="hover:text-white hover:underline transition-colors whitespace-nowrap">
          Copyright Regulations
        </Link>
        <span className="text-white/30 hidden xs:inline">•</span>
        <Link href="/cookie-settings" className="hover:text-white hover:underline transition-colors whitespace-nowrap">
          Cookie Settings
        </Link>
      </div>
    </footer>
  )
}