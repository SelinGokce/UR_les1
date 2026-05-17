"use client"

import LatestArticles from "../components/LatestArticles"

export default function HomeClient() {
    return (
        /* All your styling, animations, and elements stay right here! */
        <div className="max-w-4xl space-y-6 mx-auto p-4 fade-in-up">
            <div className="flex items-center gap-2">
                <div className="text-4xl font-bold text-slate-100 w-40"></div>
            </div>

            <div className="opacity-0 [animation-delay:200ms] animate-[fadeInUp_0.8s_ease-out_forwards]">
                <LatestArticles />
            </div>
        </div>
    )
}