"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source
            src="https://videos.pexels.com/video-files/5289120/5289120-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          Din webbläsare stödjer inte videotaggen.
        </video>
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Digitala lösningar för framtidens företag</h1>
          <p className="text-xl text-white/90 mb-8">
            Webutveckling, grafisk design, AI-lösningar och SEO-optimering för att stärka ditt företags digitala
            närvaro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjanster">
              <Button variant="shimmer" size="lg" className="text-lg">
                Våra Tjänster
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="text-lg bg-transparent hover:bg-white/20 text-white border-2 border-white/50 backdrop-blur-sm"
              >
                Logga In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

