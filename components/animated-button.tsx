"use client"

import { motion } from "framer-motion"

interface AnimatedButtonProps {
  onClick: () => void
  emoji: string
  label: string
}

export const AnimatedButton = ({ onClick, emoji, label }: AnimatedButtonProps) => {
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

