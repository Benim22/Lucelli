"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import BookingModal from "@/components/booking-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Hem", href: "/" },
    { name: "Tjänster", href: "/tjanster" },
    { name: "Om Oss", href: "/om-oss" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blogg", href: "/blogg" },
    { name: "Kontakt", href: "/kontakt" },
  ]

  return (
    <>
      <div className="fixed top-8 left-0 right-0 h-24 z-50 flex items-center justify-center pointer-events-none px-4 mb-8">
        <nav
          className={cn(
            "transition-all duration-500 w-full flex items-center pointer-events-auto",
            scrolled
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg rounded-full mx-auto max-w-4xl px-4 py-2.5 mb-8"
              : "bg-transparent px-4 py-4",
          )}
        >
          <Link href="/" className="flex items-center">
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colorful%20Wolf%20Head%20Illustrative%20Logo%20%283%29-1BplC01tXBFO7JpFzMi7sAbImCsaGd.png"
                alt="Lucelli Logo"
                width={scrolled ? 52 : 80}
                height={scrolled ? 52 : 80}
                className="transition-all duration-500"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium relative group",
                  scrolled ? "text-gray-800 dark:text-gray-200" : "text-white",
                )}
              >
                {link.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
            <ThemeToggle />
            <Button
              onClick={() => setShowModal(true)}
              variant="hover-shimmer"
              className={cn("transition-all duration-500", scrolled ? "h-9 text-sm px-4" : "")}
            >
              Boka Möte
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden ml-auto transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X
                className={cn(
                  "transition-colors duration-200",
                  scrolled ? "text-gray-800 dark:text-gray-200" : "text-white",
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "transition-colors duration-200",
                  scrolled ? "text-gray-800 dark:text-gray-200" : "text-white",
                )}
              />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed transition-all duration-300 z-40",
          isOpen
            ? "opacity-100 pointer-events-auto left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
            : "opacity-0 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 w-[90vw] max-w-sm">
          <div className="flex flex-col space-y-4 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-800 dark:text-gray-200 text-sm font-medium py-2 relative group"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-primary/10 rounded-md transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <ThemeToggle />
              <Button
                onClick={() => {
                  setShowModal(true)
                  setIsOpen(false)
                }}
                variant="hover-shimmer"
                className="w-full"
              >
                Boka Möte
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BookingModal open={showModal} onOpenChange={setShowModal} />
    </>
  )
}

