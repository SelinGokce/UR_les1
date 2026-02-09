"use client"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-slate-800 text-center py-4 text-sm text-slate-200">
      <div className="mb-2">
        &copy; {currentYear} Your Company. All rights reserved.
      </div>
      <div className="flex justify-center space-x-4">
        <Link href="/terms-of-agreement" className="underline hover:text-slate-100">
          Terms of Agreement
        </Link>
        <Link href="/copyright-regulations" className="underline hover:text-slate-100">
          Copyright Regulations
        </Link>
        <Link href="/cookie-settings" className="underline hover:text-slate-100">
          Cookie Settings
        </Link>
      </div>
    </footer>
  )
}
