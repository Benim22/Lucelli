"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Spotlight } from "./ui/spotlight"

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay failed:", error)
        setVideoError(true)
      })
    }
  }, [])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  const handleVideoError = () => {
    console.error("Video failed to load")
    setVideoError(true)
  }

  return (
    <Spotlight className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden shadow-xl aspect-video bg-gray-100 dark:bg-gray-800"
          >
            {!videoError ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                className={`w-full h-full object-cover ${isVideoLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
              >
                <source src="https://cdn.pixabay.com/video/2019/03/21/22192-326722755_tiny.mp4" type="video/mp4" />
                Din webbläsare stödjer inte videotaggen.
              </video>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Video kunde inte laddas</p>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Om Lucelli</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Lucelli är ett digitalt tjänsteföretag som fokuserar på att leverera högkvalitativa digitala lösningar för
              företag i alla storlekar. Med vår expertis inom webutveckling, grafisk design, AI-lösningar och SEO
              hjälper vi våra kunder att stärka sin digitala närvaro.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Vårt team består av passionerade experter som brinner för att skapa innovativa och effektiva lösningar som
              hjälper våra kunder att nå sina mål. Vi tror på långsiktiga partnerskap och arbetar nära våra kunder för
              att förstå deras behov och leverera resultat som överträffar förväntningarna.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-gray-600 dark:text-gray-400">Nöjda kunder</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">250+</div>
                <p className="text-gray-600 dark:text-gray-400">Genomförda projekt</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-gray-600 dark:text-gray-400">Års erfarenhet</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-gray-600 dark:text-gray-400">Experter i teamet</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Spotlight>
  )
}

