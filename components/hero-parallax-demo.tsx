"use client"

import { HeroParallax } from "@/components/ui/hero-parallax"

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />
}

export const products = [
  {
    title: "E-handelsplattform",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=E-handel",
  },
  {
    title: "Företagswebbplats",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Webbplats",
  },
  {
    title: "AI-driven Kundtjänst",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=AI",
  },
  {
    title: "Digital Marknadsföring",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Marketing",
  },
  {
    title: "SEO-optimering",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=SEO",
  },
  {
    title: "Mobilapplikation",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=App",
  },
  {
    title: "Grafisk Design",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Design",
  },
  {
    title: "Varumärkesidentitet",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Brand",
  },
  {
    title: "Innehållsstrategi",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Content",
  },
  {
    title: "Sociala Medier",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Social",
  },
  {
    title: "Dataanalys",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Analytics",
  },
  {
    title: "UX/UI Design",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=UX/UI",
  },
  {
    title: "Hosting & Underhåll",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Hosting",
  },
  {
    title: "Säkerhetslösningar",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Security",
  },
  {
    title: "Prestanda-optimering",
    link: "/portfolio",
    thumbnail: "/placeholder.svg?height=600&width=600&text=Performance",
  },
]

