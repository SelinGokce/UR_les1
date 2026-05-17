"use client"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    /* Removed bg-slate-800 and changed text to pure white. 
       Removed fixed height and opacity constraints for a cleaner look. */
    <footer className="w-full py-10 text-center text-sm text-white mt-auto">
      <div className="mb-4 opacity-60">
        &copy; {currentYear} <span className="font-bold">Selin Gokce</span>. All rights reserved.
      </div>
      <div className="flex justify-center space-x-6 text-white/80">
        <Link href="/terms-of-agreement" className="hover:text-white hover:underline transition-colors">
          Terms of Agreement
        </Link>
        <Link href="/copyright-regulations" className="hover:text-white hover:underline transition-colors">
          Copyright Regulations
        </Link>
        <Link href="/cookie-settings" className="hover:text-white hover:underline transition-colors">
          Cookie Settings
        </Link>
      </div>
    </footer>
  )
}