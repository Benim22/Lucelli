"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const AnimatedModal = ({ isOpen, onClose, children, className }: AnimatedModalProps) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    }
  }, [isOpen])

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false)
    }
  }

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            onAnimationComplete={handleAnimationEnd}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={cn(
                "relative rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900",
                "max-h-[85vh] overflow-y-auto",
                className,
              )}
            >
              <motion.button
                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const AnimatedButton = ({ onClick, emoji, label }: { onClick: () => void; emoji: string; label: string }) => {
  return (
    <motion.button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white shadow-lg transition-colors hover:bg-primary/90"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xl">{emoji}</span>
      <span>{label}</span>
    </motion.button>
  )
}

