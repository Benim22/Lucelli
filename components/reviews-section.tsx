"use client"

import { motion } from "framer-motion"
import { InfiniteMovingCards } from "./ui/infinite-moving-cards"
import { Spotlight } from "./ui/spotlight"

const testimonials = [
  {
    quote:
      "Lucelli har transformerat vår digitala närvaro. Deras team levererade en webbplats som överträffade alla våra förväntningar.",
    name: "Anna Andersson",
    title: "VD, TechStart AB",
  },
  {
    quote:
      "Professionellt team som verkligen förstår våra behov. Deras AI-lösningar har revolutionerat vårt sätt att arbeta.",
    name: "Erik Johansson",
    title: "Marknadschef, Innovation Co",
  },
  {
    quote: "Fantastiskt samarbete från början till slut. Resultaten från deras SEO-arbete har varit enastående.",
    name: "Maria Lindström",
    title: "Digital Strateg, Growth Solutions",
  },
  {
    quote: "Kreativa, effektiva och alltid tillgängliga. Lucelli är en partner vi verkligen kan lita på.",
    name: "Johan Bergström",
    title: "Grundare, E-commerce Plus",
  },
  {
    quote: "Deras expertis inom webutveckling och design har hjälpt oss att sticka ut på marknaden.",
    name: "Sofia Ekström",
    title: "Produktchef, Design & Co",
  },
  {
    quote: "Ett team som levererar högsta kvalitet och verkligen bryr sig om sina kunders framgång.",
    name: "Peter Nilsson",
    title: "CEO, Digital First AB",
  },
]

export default function ReviewsSection() {
  return (
    <Spotlight className="py-20 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Vad våra kunder säger</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upptäck hur vi har hjälpt företag att växa och lyckas i den digitala världen genom våra skräddarsydda
            lösningar.
          </p>
        </motion.div>

        <div className="relative">
          <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
        </div>
      </div>
    </Spotlight>
  )
}

