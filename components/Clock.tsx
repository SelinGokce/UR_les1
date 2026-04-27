"use client"

import { useState, useEffect } from "react"

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    // Small delay to push the update to the next execution tick 
    // to avoid the synchronous setState error.
    const timeout = setTimeout(() => {
      setTime(new Date())
    }, 0)

    // Update every second to ensure minute flips are accurate
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearTimeout(timeout)
      clearInterval(timer)
    }
  }, [])

  // Formatting logic stays tucked away inside this component
  const formattedDate = time?.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
  })

  const formattedTime = time?.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return (
    <div className="flex gap-6 text-white text-xl font-bold tracking-wide mr-4 min-w-[140px] justify-end">
      {time ? (
        <>
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </>
      ) : (
        // Invisible placeholder to prevent the navbar from jumping when the time loads
        <span className="opacity-0">00/00 00:00</span>
      )}
    </div>
  )
}