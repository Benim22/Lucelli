"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Tilt } from "react-tilt"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  index?: number
}

const defaultOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

export function AnimatedCard({ children, className, index = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 1.11, 0.81, 0.99], // Custom ease curve for smooth animation
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Tilt options={defaultOptions}>
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all duration-300",
            "hover:shadow-xl dark:shadow-cyan-500/5 dark:hover:shadow-cyan-500/10",
            "before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-cyan-50 before:to-white before:opacity-0 dark:before:from-cyan-950 dark:before:to-gray-800 before:transition-opacity before:duration-300",
            "hover:before:opacity-100",
            className,
          )}
        >
          <div className="relative z-10">{children}</div>
        </div>
      </Tilt>
    </motion.div>
  )
}

