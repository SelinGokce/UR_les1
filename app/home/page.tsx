"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const words = ["Design", "HTML", "CSS", "JS", "3D"]

export default function HomePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }, 3000) // Change word every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold text-slate-100">Selindot</h1>
        <div className="text-4xl font-bold text-slate-100 w-40">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              {words[currentWordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}
