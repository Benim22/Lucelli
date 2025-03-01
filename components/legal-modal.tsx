"use client"

import { AnimatedModal } from "@/components/ui/animated-modal"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <h2 className="text-2xl font-bold mb-4">Våra Legala Åtaganden</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Detaljerad information om hur vi hanterar juridiska aspekter av våra tjänster.
        </p>

        <div className="space-y-6">
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
      </div>
    </AnimatedModal>
  )
}

