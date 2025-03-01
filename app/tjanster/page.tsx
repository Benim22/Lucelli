"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ServiceModal from "@/components/service-modal"
import { AnimatedCard } from "@/components/animated-card"
import { motion } from "framer-motion"
import { Shield, Scale, FileCheck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showLegalModal, setShowLegalModal] = useState(false)

  const services = [
    {
      id: 1,
      title: "Webutveckling",
      description: "Moderna, responsiva webbplatser och applikationer",
      icon: "🌐",
      features: [
        "Responsiv design för alla enheter",
        "Moderna ramverk som React och Next.js",
        "E-handelslösningar",
        "Innehållshanteringssystem",
        "API-integrationer",
      ],
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
      features: [
        "Logotypdesign",
        "Varumärkesidentitet",
        "Trycksaker och marknadsföringsmaterial",
        "Sociala medier-grafik",
        "Illustrationer och infografik",
      ],
      content: `
        <h3>Kreativ Grafisk Design</h3>
        <p>Vi hjälper dig att skapa en stark visuell identitet som speglar ditt varumärke och attraherar din målgrupp.</p>
        <ul>
          <li><strong>Logotypdesign</strong> som fångar essensen av ditt företag</li>
          <li><strong>Varumärkesidentitet</strong> för en enhetlig visuell profil</li>
          <li><strong>Trycksaker och marknadsföringsmaterial</strong> av hög kvalitet</li>
          <li><strong>Sociala medier-grafik</strong> för engagerande innehåll</li>
          <li><strong>Illustrationer och infografik</strong> för att visualisera komplex information</li>
        </ul>
        <p>Vårt team av designers arbetar nära dig för att skapa en unik och minnesvärd visuell upplevelse.</p>
      `,
    },
    {
      id: 3,
      title: "AI-lösningar",
      description: "Intelligenta system och automatisering för ditt företag",
      icon: "🤖",
      features: [
        "Chatbots och virtuella assistenter",
        "Dataanalys och prediktiva modeller",
        "Automatisering av arbetsflöden",
        "Bildanalys och igenkänning",
        "Naturlig språkbehandling",
      ],
      content: `
        <h3>Innovativa AI-lösningar</h3>
        <p>Vi implementerar intelligenta system och automatisering för att effektivisera dina processer och skapa nya möjligheter.</p>
        <ul>
          <li><strong>Chatbots och virtuella assistenter</strong> för kundservice och support</li>
          <li><strong>Dataanalys och prediktiva modeller</strong> för bättre beslutsfattande</li>
          <li><strong>Automatisering av arbetsflöden</strong> för ökad produktivitet</li>
          <li><strong>Bildanalys och igenkänning</strong> för säkerhet och effektivitet</li>
          <li><strong>Naturlig språkbehandling</strong> för att förstå och interagera med människor</li>
        </ul>
        <p>Våra AI-experter hjälper dig att utnyttja kraften i artificiell intelligens för att skapa en konkurrensfördel.</p>
      `,
    },
    {
      id: 4,
      title: "SEO-optimering",
      description: "Förbättra din synlighet i sökmotorer",
      icon: "🔍",
      features: [
        "Sökordsanalys och strategi",
        "On-page optimering",
        "Teknisk SEO",
        "Innehållsstrategi",
        "Länkbyggande",
      ],
      content: `
        <h3>Effektiv SEO-optimering</h3>
        <p>Vi hjälper dig att förbättra din synlighet i sökmotorer och attrahera mer organisk trafik till din webbplats.</p>
        <ul>
          <li><strong>Sökordsanalys och strategi</strong> för att identifiera relevanta söktermer</li>
          <li><strong>On-page optimering</strong> för att förbättra din webbplats struktur och innehåll</li>
          <li><strong>Teknisk SEO</strong> för att säkerställa att din webbplats är sökmotorvänlig</li>
          <li><strong>Innehållsstrategi</strong> för att skapa engagerande och värdefullt innehåll</li>
          <li><strong>Länkbyggande</strong> för att öka din webbplats auktoritet</li>
        </ul>
        <p>Våra SEO-specialister använder beprövade metoder för att hjälpa dig att klättra i sökresultaten.</p>
      `,
    },
    {
      id: 5,
      title: "Digital Marknadsföring",
      description: "Strategier för att nå din målgrupp online",
      icon: "📱",
      features: [
        "Sökmotorannonsering (SEM)",
        "Sociala medier-marknadsföring",
        "E-postmarknadsföring",
        "Innehållsmarknadsföring",
        "Konverteringsoptimering",
      ],
      content: `
        <h3>Målinriktad Digital Marknadsföring</h3>
        <p>Vi utvecklar och implementerar strategier för att nå din målgrupp online och öka din försäljning.</p>
        <ul>
          <li><strong>Sökmotorannonsering (SEM)</strong> för att synas i sökresultaten</li>
          <li><strong>Sociala medier-marknadsföring</strong> för att engagera din publik</li>
          <li><strong>E-postmarknadsföring</strong> för att bygga relationer med dina kunder</li>
          <li><strong>Innehållsmarknadsföring</strong> för att skapa värdefullt innehåll</li>
          <li><strong>Konverteringsoptimering</strong> för att maximera din avkastning</li>
        </ul>
        <p>Vårt team av marknadsföringsexperter hjälper dig att skapa en effektiv och lönsam digital marknadsföringsstrategi.</p>
      `,
    },
    {
      id: 6,
      title: "E-handel",
      description: "Kompletta lösningar för online-försäljning",
      icon: "🛒",
      features: [
        "Användarvänliga butiker",
        "Säkra betalningslösningar",
        "Produkthantering",
        "Integrationer med affärssystem",
        "Optimering för konvertering",
      ],
      content: `
        <h3>Kompletta E-handelslösningar</h3>
        <p>Vi erbjuder kompletta lösningar för att starta och driva en framgångsrik online-butik.</p>
        <ul>
          <li><strong>Användarvänliga butiker</strong> med intuitiv navigering</li>
          <li><strong>Säkra betalningslösningar</strong> för trygga transaktioner</li>
          <li><strong>Produkthantering</strong> för enkel administration</li>
          <li><strong>Integrationer med affärssystem</strong> för sömlös hantering</li>
          <li><strong>Optimering för konvertering</strong> för att öka din försäljning</li>
        </ul>
        <p>Våra e-handelsexperter hjälper dig att skapa en lönsam och växande online-verksamhet.</p>
      `,
    },
  ]

  const legalInfo = [
    {
      icon: Shield,
      title: "Dataskydd och Sekretess",
      description:
        "Vi följer GDPR och andra dataskyddslagar strikt. All kundinformation hanteras med högsta säkerhet och konfidentialitet.",
    },
    {
      icon: Scale,
      title: "Avtalsvillkor",
      description:
        "Våra tjänster levereras under tydliga och transparenta avtalsvillkor. Vi säkerställer att alla parter är införstådda med villkoren innan projektstart.",
    },
    {
      icon: FileCheck,
      title: "Kvalitetsgaranti",
      description:
        "Vi erbjuder garantier på vårt arbete och säkerställer att alla leveranser möter överenskomna kvalitetskrav och specifikationer.",
    },
  ]

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Våra Tjänster</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Vi erbjuder ett brett utbud av digitala tjänster för att hjälpa ditt företag att växa och lyckas online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <AnimatedCard key={service.id} index={index}>
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="shimmer" onClick={() => setSelectedService(service)} className="mt-auto w-fit">
                  Läs mer
                </Button>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Legal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 pt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Legal Information</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Vi värnar om transparens och följer alla relevanta lagar och regler för att säkerställa trygga
              affärsrelationer.
            </p>
            <Button variant="outline" onClick={() => setShowLegalModal(true)} className="mb-12">
              Läs mer om våra legala åtaganden
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {legalInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ServiceModal service={selectedService} open={!!selectedService} onOpenChange={() => setSelectedService(null)} />
      <Dialog open={showLegalModal} onOpenChange={setShowLegalModal}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Våra Legala Åtaganden</DialogTitle>
            <DialogDescription>
              Detaljerad information om hur vi hanterar juridiska aspekter av våra tjänster.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Dataskydd och GDPR</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vi följer strikt alla dataskyddslagar och GDPR-regler. Detta innebär att:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>All personlig data behandlas konfidentiellt och säkert</li>
                <li>Vi samlar endast in nödvändig information för att leverera våra tjänster</li>
                <li>Du har rätt att begära ut, ändra eller radera din data</li>
                <li>Vi har tydliga processer för datahantering och säkerhetsincidenter</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Avtalsvillkor och Garantier</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Våra avtal är utformade för att skydda både dig som kund och oss som leverantör:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Tydliga leveransvillkor och tidsramar</li>
                <li>Specificerade kvalitetskrav och garantier</li>
                <li>Transparenta betalningsvillkor</li>
                <li>Definierade processer för ändringar och tillägg</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Kvalitetssäkring</h3>
              <p className="text-gray-600 dark:text-gray-400">Vårt kvalitetsarbete omfattar:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Regelbundna kvalitetskontroller</li>
                <li>Dokumenterade processer och rutiner</li>
                <li>Kontinuerlig kompetensutveckling</li>
                <li>Uppföljning och utvärdering av varje projekt</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => setShowLegalModal(false)}>
              Stäng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

