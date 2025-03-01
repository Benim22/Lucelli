"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "Hur lång tid tar det att utveckla en webbplats?",
    answer:
      "Utvecklingstiden varierar beroende på projektets omfattning och komplexitet. En enkel webbplats kan ta 4-6 veckor, medan mer omfattande projekt kan ta 3-6 månader. Vi ger alltid en detaljerad tidsplan i början av varje projekt.",
  },
  {
    question: "Vilka betalningsvillkor erbjuder ni?",
    answer:
      "Vi erbjuder flexibla betalningsplaner som vanligtvis delas upp i tre delar: 30% vid projektstart, 40% vid första granskning, och 30% vid projektleverans. För långsiktiga projekt kan vi skräddarsy betalningsplanen efter dina behov.",
  },
  {
    question: "Erbjuder ni support efter lansering?",
    answer:
      "Ja, vi erbjuder olika supportpaket efter lansering. Detta inkluderar teknisk support, innehållsuppdateringar, säkerhetsuppdateringar och prestandaoptimering. Vi rekommenderar alltid ett supportavtal för att säkerställa att din webbplats förblir säker och uppdaterad.",
  },
  {
    question: "Hur arbetar ni med SEO?",
    answer:
      "Vi integrerar SEO-bästa praxis genom hela utvecklingsprocessen. Detta inkluderar teknisk SEO, innehållsoptimering, mobilvänlighet och prestanda. Vi erbjuder också kontinuerlig SEO-optimering som en separat tjänst för att förbättra och bibehålla din synlighet i sökmotorer.",
  },
  {
    question: "Kan ni hjälpa till med innehållsproduktion?",
    answer:
      "Ja, vi erbjuder professionell innehållsproduktion som inkluderar copywriting, fotografering, videoproduktion och grafisk design. Vårt team av innehållsskapare arbetar nära tillsammans med dig för att säkerställa att innehållet speglar ditt varumärke och når din målgrupp.",
  },
  {
    question: "Hur säkerställer ni att projektet håller budget?",
    answer:
      "Vi börjar varje projekt med en grundlig analys och detaljerad offert. Under projektets gång använder vi agila metoder och har regelbundna avstämningar för att säkerställa att vi håller både tidsplan och budget. Eventuella tilläggsarbeten diskuteras och godkänns alltid i förväg.",
  },
]

export default function FaqSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Vanliga frågor</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Här hittar du svar på några av de vanligaste frågorna vi får. Hittar du inte svaret du söker? Kontakta oss
            gärna direkt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-base font-medium transition-colors hover:text-cyan-500 data-[state=open]:text-cyan-500">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

