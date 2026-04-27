"use client"

import LatestArticles from "../components/LatestArticles"


export default function Home() {


  return (
    <div className="max-w-4xl space-y-6 mx-auto p-4">
      <div className="flex items-center gap-2">

        <div className="text-4xl font-bold text-slate-100 w-40">
        </div>
      </div>

      {/* list of projects/articles */}
      <div>
        <LatestArticles />
      </div>
    </div>
  )
}