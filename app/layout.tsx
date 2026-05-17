"use client" // <-- CRITICAL: This must be the absolute first line of the file!

import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"
import Script from "next/script"
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"
import "@/app/globals.css"
import { MockAuthProvider, useAuth } from "@/components/context/MockAuthContext"
import AuthSimPanel from "@/components/ui/AuthSimPanel"

// This sub-component can now safely read useAuth() on the client side!
function LayoutThemeContent({ children }: { children: React.ReactNode }) {
  const { currentRole } = useAuth()

  return (
    <body
      className={`text-slate-100 font-mono min-h-screen flex flex-col ${currentRole === 'admin' ? 'is-admin' : ''
        }`}
    >
      <GoogleAnalyticsTracker />
      <GlobalNavbar />

      <main className="flex-grow p-20 mx-auto mt-10 w-full max-w-7xl">
        {children}
      </main>

      <Footer />
      <AppToaster />
      <AuthSimPanel />
    </body>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>

      <MockAuthProvider>
        <LayoutThemeContent>
          {children}
        </LayoutThemeContent>
      </MockAuthProvider>
    </html>
  )
}