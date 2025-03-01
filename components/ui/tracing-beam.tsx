"use client"
import { motion, useScroll, useSpring } from "framer-motion"

export function TracingBeam() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 w-[2px] z-50"
      style={{
        background: "linear-gradient(to bottom, rgb(37, 99, 235), rgb(6, 182, 212))",
        boxShadow: "0 0 8px rgba(37, 99, 235, 0.3), 0 0 16px rgba(6, 182, 212, 0.3)",
        transformOrigin: "top",
        scaleY,
      }}
    />
  )
}

