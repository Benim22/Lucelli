import Hero from "@/components/hero"
import AnimatedHeroStats from "@/components/animated-hero-stats"
import Services from "@/components/services"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import FaqSection from "@/components/faq-section"
import ReviewsSection from "@/components/reviews-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AnimatedHeroStats />
      <Services />
      <AboutSection />
      <FaqSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  )
}

