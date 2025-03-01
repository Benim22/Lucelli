"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Add extra offset to account for the floating navbar
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavLinks = [
    { name: "Webutveckling", href: "/tjanster#webutveckling" },
    { name: "Grafisk Design", href: "/tjanster#design" },
    { name: "AI-lösningar", href: "/tjanster#ai" },
    { name: "SEO", href: "/tjanster#seo" },
    { name: "Digital Marknadsföring", href: "/tjanster#marknadsforing" },
    { name: "E-handel", href: "/tjanster#ehandel" },
  ]

  return (
    <div
      className={cn(
        "w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40",
        "transition-all duration-300 border-b",
        isScrolled ? "fixed top-0 shadow-sm" : "relative",
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn("text-sm font-medium transition-colors hover:text-primary", "relative group")}
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Ring oss: 08-123 45 67
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}

