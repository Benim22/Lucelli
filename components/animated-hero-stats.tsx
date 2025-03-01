"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Code2, Users, Trophy, Zap, TrendingUp, Clock, SmartphoneIcon as Mobile, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    icon: Code2,
    value: 500,
    suffix: "+",
    label: "Projekt Levererade",
    description: "Framgångsrika webbprojekt",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Nöjda Kunder",
    description: "Företag som växer med oss",
  },
  {
    icon: Trophy,
    value: 98,
    suffix: "%",
    label: "Kundnöjdhet",
    description: "Rekommenderar våra tjänster",
  },
  {
    icon: Zap,
    value: 100,
    suffix: "%",
    label: "Prestanda",
    description: "Google Lighthouse Score",
  },
]

const facts = [
  {
    text: "75% av användare bedömer ett företags trovärdighet baserat på webbdesign",
    icon: TrendingUp,
    color: "text-green-500",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `Månad ${i + 1}`,
      value: 45 + Math.random() * 30,
    })),
  },
  {
    text: "En sekunds fördröjning kan minska konverteringar med 7%",
    icon: Clock,
    color: "text-orange-500",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `Månad ${i + 1}`,
      value: 60 + Math.sin(i / 2) * 20,
    })),
  },
  {
    text: "Mobile-first design är avgörande - 60% surfar på mobilen",
    icon: Mobile,
    color: "text-blue-500",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `Månad ${i + 1}`,
      value: 40 + Math.pow(i / 2, 2),
    })),
  },
  {
    text: "SEO-optimering kan öka trafiken med över 200%",
    icon: Search,
    color: "text-purple-500",
    data: Array.from({ length: 12 }, (_, i) => ({
      name: `Månad ${i + 1}`,
      value: 20 + Math.exp(i / 4),
    })),
  },
]

export default function AnimatedHeroStats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [currentFact, setCurrentFact] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const CurrentIcon = facts[currentFact].icon

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute inset-0 bg-grid-gray-900/[0.1] dark:bg-grid-white/[0.1]" />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Framtidssäkra Din Digitala Närvaro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Vi kombinerar kreativitet med teknisk expertis för att skapa webbupplevelser som överträffar förväntningar
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary"
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
                <CountingNumber
                  value={stat.value}
                  isInView={isInView}
                  className="text-3xl font-bold mb-2"
                  suffix={stat.suffix}
                />
                <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rotating Facts with Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-500 to-primary animate-gradient" />

          <h3 className="text-lg font-semibold mb-8 text-center">Visste du att...</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Facts Column */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      "flex-shrink-0 p-3 rounded-full",
                      "bg-gray-100 dark:bg-gray-700",
                      facts[currentFact].color,
                    )}
                  >
                    <CurrentIcon className="w-6 h-6" />
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-400">{facts[currentFact].text}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {facts.map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      currentFact === index ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
                    )}
                    animate={{
                      scale: currentFact === index ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: currentFact === index ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Graph Column */}
            <div className="h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={facts[currentFact].data}>
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" tick={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function CountingNumber({
  value,
  isInView,
  className,
  suffix = "",
}: {
  value: number
  isInView: boolean
  className?: string
  suffix?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easedProgress = easeOutQuart(progress)
      setDisplayValue(Math.floor(easedProgress * value))

      if (currentStep >= steps) {
        clearInterval(timer)
        setDisplayValue(value)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, isInView])

  return (
    <span className={className}>
      {displayValue}
      {suffix}
    </span>
  )
}

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4)
}

