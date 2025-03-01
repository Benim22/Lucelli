"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export const HeroHighlight = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-20 w-full text-center">
        <h1 className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent text-4xl md:text-7xl font-bold max-w-5xl mx-auto">
          Digitala Lösningar för Framtidens <span className="text-primary">Företag</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-base md:text-xl text-neutral-300">
          Vi hjälper företag att växa och lyckas i den digitala världen genom innovativa lösningar och expertis.
        </p>
      </div>

      {/* Gradient blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-cyan-500/40 blur-3xl" />
        </div>
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
    </div>
  )
}

