import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colorful%20Wolf%20Head%20Illustrative%20Logo%20%283%29-1BplC01tXBFO7JpFzMi7sAbImCsaGd.png"
                alt="Lucelli Logo"
                width={100}
                height={100}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Vi hjälper företag att växa och lyckas i den digitala världen genom innovativa lösningar och expertis.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tjänster</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tjanster" className="text-gray-400 hover:text-white transition-colors">
                  Webutveckling
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-gray-400 hover:text-white transition-colors">
                  Grafisk Design
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-gray-400 hover:text-white transition-colors">
                  AI-lösningar
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-gray-400 hover:text-white transition-colors">
                  SEO-optimering
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-gray-400 hover:text-white transition-colors">
                  Digital Marknadsföring
                </Link>
              </li>
              <li>
                <Link href="/tjanster" className="text-gray-400 hover:text-white transition-colors">
                  E-handel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Företaget</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/om-oss" className="text-gray-400 hover:text-white transition-colors">
                  Om Oss
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/karriar" className="text-gray-400 hover:text-white transition-colors">
                  Karriär
                </Link>
              </li>
              <li>
                <Link href="/blogg" className="text-gray-400 hover:text-white transition-colors">
                  Blogg
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Storgatan 123, 123 45 Stockholm</li>
              <li>
                <Link href="tel:+4681234567" className="text-gray-400 hover:text-white transition-colors">
                  08-123 45 67
                </Link>
              </li>
              <li>
                <Link href="mailto:info@lucelli.se" className="text-gray-400 hover:text-white transition-colors">
                  info@lucelli.se
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Lucelli. Alla rättigheter förbehållna.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/integritetspolicy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Integritetspolicy
            </Link>
            <Link href="/villkor" className="text-gray-400 hover:text-white text-sm transition-colors">
              Användarvillkor
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

