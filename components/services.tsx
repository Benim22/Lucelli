"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import ServiceModal from "@/components/service-modal"
import { AnimatedCard } from "@/components/animated-card"

// Service data
const services = [
  {
    id: 1,
    title: "Webutveckling",
    description: "Moderna, responsiva webbplatser och applikationer",
    icon: "🌐",
    content: `
      <h3>Professionell Webutveckling</h3>
      <p>Vi skapar skräddarsydda webbplatser och applikationer med fokus på användarupplevelse, prestanda och design.</p>
      <ul>
        <li><strong>Responsiv design</strong> för alla enheter</li>
        <li><strong>Moderna ramverk</strong> som React och Next.js</li>
        <li><strong>E-handelslösningar</strong> med full funktionalitet</li>
        <li><strong>Innehållshanteringssystem</strong> för enkel uppdatering</li>
        <li><strong>API-integrationer</strong> för sömlösa kopplingar</li>
      </ul>
      <p>Vårt team av erfarna utvecklare säkerställer att din webbplats inte bara ser bra ut, utan också presterar optimalt.</p>
    `,
  },
  {
    id: 2,
    title: "Grafisk Design",
    description: "Visuell identitet och grafiskt material för ditt varumärke",
    icon: "🎨",
    content: `
      <h3>Kreativ Grafisk Design</h3>
      <p>Vi hjälper dig att skapa en stark visuell identitet som kommunicerar ditt varumärkes värderingar och vision.</p>
      <ul>
        <li><strong>Logotypdesign</strong> som sticker ut</li>
        <li><strong>Varumärkesidentitet</strong> som speglar dina värderingar</li>
        <li><strong>Trycksaker</strong> och marknadsföringsmaterial</li>
        <li><strong>Sociala medier-grafik</strong> som engagerar</li>
        <li><strong>Illustrationer</strong> och infografik</li>
      </ul>
      <p>Våra designers kombinerar kreativitet med strategiskt tänkande för att skapa design som sticker ut och ger resultat.</p>
    `,
  },
  {
    id: 3,
    title: "AI-lösningar",
    description: "Intelligenta system och automatisering för ditt företag",
    icon: "🤖",
    content: `
      <h3>Innovativa AI-lösningar</h3>
      <p>Vi utvecklar skräddarsydda AI-lösningar som hjälper ditt företag att automatisera processer och få värdefulla insikter.</p>
      <ul>
        <li>Chatbots och virtuella assistenter</li>
        <li>Dataanalys och prediktiva modeller</li>
        <li>Automatisering av arbetsflöden</li>
        <li>Bildanalys och igenkänning</li>
        <li>Naturlig språkbehandling</li>
      </ul>
      <p>Med vår expertis inom AI kan vi hjälpa dig att implementera lösningar som ger konkurrensfördelar och effektiviserar verksamheten.</p>
    `,
  },
  {
    id: 4,
    title: "SEO-optimering",
    description: "Förbättra din synlighet i sökmotorer",
    icon: "🔍",
    content: `
      <h3>Effektiv SEO-optimering</h3>
      <p>Vi hjälper dig att förbättra din synlighet i sökmotorer och driva mer organisk trafik till din webbplats.</p>
      <ul>
        <li>Sökordsanalys och strategi</li>
        <li>On-page optimering</li>
        <li>Teknisk SEO</li>
        <li>Innehållsstrategi</li>
        <li>Länkbyggande</li>
      </ul>
      <p>Vårt SEO-team håller sig uppdaterat med de senaste algoritmerna och trenderna för att säkerställa att din webbplats rankas högt i sökresultaten.</p>
    `,
  },
  {
    id: 5,
    title: "Digital Marknadsföring",
    description: "Strategier för att nå din målgrupp online",
    icon: "📱",
    content: `
      <h3>Strategisk Digital Marknadsföring</h3>
      <p>Vi utvecklar och implementerar digitala marknadsföringsstrategier som hjälper dig att nå din målgrupp och uppnå dina affärsmål.</p>
      <ul>
        <li>Sökmotorannonsering (SEM)</li>
        <li>Sociala medier-marknadsföring</li>
        <li>E-postmarknadsföring</li>
        <li>Innehållsmarknadsföring</li>
        <li>Konverteringsoptimering</li>
      </ul>
      <p>Med vår datadrivna approach säkerställer vi att dina marknadsföringsinsatser ger maximal avkastning på investeringen.</p>
    `,
  },
  {
    id: 6,
    title: "E-handel",
    description: "Kompletta lösningar för online-försäljning",
    icon: "🛒",
    content: `
      <h3>Kompletta E-handelslösningar</h3>
      <p>Vi utvecklar skräddarsydda e-handelsplattformar som ger dina kunder en sömlös köpupplevelse.</p>
      <ul>
        <li>Användarvänliga butiker</li>
        <li>Säkra betalningslösningar</li>
        <li>Produkthantering</li>
        <li>Integrationer med affärssystem</li>
        <li>Optimering för konvertering</li>
      </ul>
      <p>Våra e-handelslösningar är byggda för att skala med ditt företag och ge dina kunder en förstklassig shoppingupplevelse.</p>
    `,
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="services">
      <div className="container mx-auto px-4 content-wrapper">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
              Våra Tjänster
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Vi erbjuder ett brett utbud av digitala tjänster för att hjälpa ditt företag att växa och lyckas online.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedCard key={service.id} index={index}>
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedService(service)}
                  className="mt-auto w-fit hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Läs mer
                </Button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      <ServiceModal service={selectedService} open={!!selectedService} onOpenChange={() => setSelectedService(null)} />
    </section>
  )
}

