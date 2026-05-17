import { AppToaster } from "@/components/ui/toast"
import GlobalNavbar from "@/components/GlobalNavbar"
import Footer from "@/components/Footer"
import Script from "next/script"
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker"
import "@/app/globals.css"

export const metadata = {
  title: "Selindot",
  description: "portfolio website van selin",
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

      <body
        style={{
          background: 'linear-gradient(to bottom right, #000752, #15B6DF)',
          backgroundAttachment: 'fixed'
        }}
        className="text-slate-100 font-mono min-h-screen flex flex-col"
      >
        <GoogleAnalyticsTracker />

        {/* The Navbar stays fixed at the top */}
        <GlobalNavbar />

        {/* Main content wrapper - flex-grow pushes everything below it (the footer) down */}
        <main className="flex-grow p-20 mx-auto mt-10 w-full max-w-7xl">
          {children}
        </main>

        {/* Footer is now part of the natural page flow, pushed to the bottom by flex-grow */}
        <Footer />

        <AppToaster />
      </body>
    </html>
  )
}