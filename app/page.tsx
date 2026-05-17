"use client"

import LatestArticles from "../components/LatestArticles"

export default function Home() {
  return (
    /* 1. Added the core fade-in-up transition utility to the root layout wrapper */
    <div className="max-w-4xl space-y-6 mx-auto p-4 fade-in-up">
      <div className="flex items-center gap-2">
        <div className="text-4xl font-bold text-slate-100 w-40">
        </div>
      </div>

      {/* 2. Wrapped your component in an opacity-0 section with a 200ms staggered animation delay */}
      <div className="opacity-0 [animation-delay:200ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
        <LatestArticles />
      </div>
    </div>
  )
}