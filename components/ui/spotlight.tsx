"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface SpotlightProps {
  className?: string
  children: React.ReactNode
}

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSpotlight = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setPosition({ x, y })
      setOpacity(1)
    }

    const resetSpotlight = () => {
      setOpacity(0)
    }

    container.addEventListener("mousemove", updateSpotlight)
    container.addEventListener("mouseleave", resetSpotlight)

    return () => {
      container.removeEventListener("mousemove", updateSpotlight)
      container.removeEventListener("mouseleave", resetSpotlight)
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden", className)}>
      <div
        className="hidden dark:block pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}

