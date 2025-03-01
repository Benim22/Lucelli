"use client"

import type React from "react"
import { motion } from "framer-motion"

export const MacbookScroll = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="relative [perspective:1000px] w-full max-w-xl">
      <div className="max-w-xl mx-auto w-full relative">
        <div className="absolute inset-x-0 top-0 bg-gray-900 h-3 rounded-t-2xl z-20" />
        <div className="absolute inset-x-4 top-0 bg-black h-2 rounded-t-xl z-20" />
        <div
          className="relative bg-gray-900 rounded-2xl overflow-hidden"
          style={{
            transformOrigin: "bottom",
            transform: "rotateX(0deg)",
          }}
        >
          <div className="h-3 w-full bg-gray-900 absolute top-0 z-20" />
          <div className="relative z-10 pt-3">
            <div className="overflow-hidden rounded-lg">{children}</div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{
          transform: "rotateX(0deg)",
        }}
        animate={{
          transform: "rotateX(0deg)",
        }}
        className="absolute inset-x-0 bottom-0 h-3 bg-gray-900 rounded-b-2xl"
      />
      <motion.div
        initial={{
          transform: "rotateX(0deg)",
        }}
        animate={{
          transform: "rotateX(0deg)",
        }}
        className="absolute inset-x-4 bottom-0 h-2 bg-black rounded-b-xl"
      />
    </div>
  )
}

