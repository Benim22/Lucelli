import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroParallax } from "@/components/ui/hero-parallax"

// Portfolio projects data for the parallax hero
const parallaxProjects = [
  {
    title: "E-handelsplattform",
    link: "#e-handel",
    thumbnail:
      "https://img.freepik.com/free-vector/desktop-smartphone-app-development_23-2148683810.jpg?t=st=1740844610~exp=1740848210~hmac=37c10c3a1da1a7530503b1787e77c683e408a411ea6919cfceb19b9dff22a4bb&w=740",
  },
  {
    title: "Varumärkesidentitet",
    link: "#varumarke",
    thumbnail:
      "https://img.freepik.com/free-photo/top-view-working-tools_1134-67.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "AI-driven Kundtjänstbot",
    link: "#ai-bot",
    thumbnail:
      "https://img.freepik.com/free-vector/chat-bot-concept-illustration_114360-30458.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "SEO-optimering",
    link: "#seo",
    thumbnail:
      "https://img.freepik.com/free-photo/magnifying-glass-with-seo-concepts_1134-81.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Företagswebbplats",
    link: "#webbplats",
    thumbnail:
      "https://img.freepik.com/free-vector/business-landing-page-template-with-photo_52683-20732.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Produktförpackning",
    link: "#forpackning",
    thumbnail:
      "https://img.freepik.com/free-vector/blue-packages-cosmetics-set_1284-12682.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Prediktiv Analysmodell",
    link: "#analys",
    thumbnail:
      "https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169860.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Lokal SEO-kampanj",
    link: "#lokal-seo",
    thumbnail:
      "https://img.freepik.com/free-vector/location-based-advertisement-geolocation-software-online-gps-app-navigation-system-geographic-restriction-man-searching-address-with-magnifier_335657-393.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Mobilapplikation",
    link: "#app",
    thumbnail:
      "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Digital Marknadsföring",
    link: "#marknadsforing",
    thumbnail:
      "https://img.freepik.com/free-photo/notebook-with-words-digital-marketing_1134-434.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "UX/UI Design",
    link: "#ux-ui",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Webbapplikation",
    link: "#webapp",
    thumbnail:
      "https://img.freepik.com/free-photo/3d-rendering-website-hosting-concept_23-2149484780.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Sociala Medier Kampanj",
    link: "#social",
    thumbnail:
      "https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063172.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Datavisualisering",
    link: "#data",
    thumbnail:
      "https://img.freepik.com/free-vector/top-view-dark-laptop-background-template_52683-6197.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
  {
    title: "Responsiv Design",
    link: "#responsive",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-responsive-website-design_52683-89071.jpg?uid=R79426159&ga=GA1.1.712530254.1732280513&semt=ais_hybrid",
  },
]

// Regular portfolio projects data
const categories = [
  { id: "all", name: "Alla" },
  { id: "web", name: "Webutveckling" },
  { id: "design", name: "Grafisk Design" },
  { id: "ai", name: "AI-lösningar" },
  { id: "seo", name: "SEO" },
]

const projects = [
  {
    id: 1,
    title: "E-handelsplattform",
    category: "web",
    image: "/placeholder.svg?height=400&width=600&text=E-handelsplattform",
    description: "Modern e-handelsplattform med integrerad betalningslösning och lagerhantering.",
  },
  {
    id: 2,
    title: "Varumärkesidentitet",
    category: "design",
    image: "/placeholder.svg?height=400&width=600&text=Varumärkesidentitet",
    description: "Komplett varumärkesidentitet inklusive logotyp, färgpalett och typografi.",
  },
  {
    id: 3,
    title: "AI-driven Kundtjänstbot",
    category: "ai",
    image: "/placeholder.svg?height=400&width=600&text=AI-bot",
    description: "Intelligent chatbot som hanterar kundförfrågningar och förbättrar kundupplevelsen.",
  },
  {
    id: 4,
    title: "SEO-optimering",
    category: "seo",
    image: "/placeholder.svg?height=400&width=600&text=SEO-optimering",
    description: "Omfattande SEO-strategi som resulterade i 200% ökning av organisk trafik.",
  },
  {
    id: 5,
    title: "Företagswebbplats",
    category: "web",
    image: "/placeholder.svg?height=400&width=600&text=Företagswebbplats",
    description: "Responsiv företagswebbplats med modern design och användarvänligt gränssnitt.",
  },
  {
    id: 6,
    title: "Produktförpackning",
    category: "design",
    image: "/placeholder.svg?height=400&width=600&text=Produktförpackning",
    description: "Kreativ förpackningsdesign för en ny produktlinje inom livsmedelsindustrin.",
  },
  {
    id: 7,
    title: "Prediktiv Analysmodell",
    category: "ai",
    image: "/placeholder.svg?height=400&width=600&text=Prediktiv+Analys",
    description: "Avancerad AI-modell för att förutsäga kundbeteenden och optimera försäljningsstrategier.",
  },
  {
    id: 8,
    title: "Lokal SEO-kampanj",
    category: "seo",
    image: "/placeholder.svg?height=400&width=600&text=Lokal+SEO",
    description: "Lokal SEO-strategi som ökade synligheten för en restaurangkedja i Stockholm.",
  },
  {
    id: 9,
    title: "Mobilapplikation",
    category: "web",
    image: "/placeholder.svg?height=400&width=600&text=Mobilapp",
    description: "Användarvänlig mobilapp för en tjänsteplattform med realtidsuppdateringar.",
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <HeroParallax products={parallaxProjects} />

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Utforska våra projekt</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upptäck vårt breda utbud av framgångsrika projekt inom webutveckling, grafisk design, AI-lösningar och SEO.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter((project) => project.category === category.id)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <Button size="lg">Ladda fler projekt</Button>
        </div>
      </div>
    </main>
  )
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg dark:bg-gray-800">
      <div className="relative aspect-video">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        <Button variant="outline" size="sm">
          Visa detaljer
        </Button>
      </CardContent>
    </Card>
  )
}

