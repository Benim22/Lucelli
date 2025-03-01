import type { BlogPost } from "@/types/blog"

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Framtidens Webutveckling: Trender att Hålla Koll På",
    slug: "framtidens-webutveckling-trender",
    excerpt:
      "Utforska de senaste trenderna inom webutveckling och hur de formar framtidens digitala landskap. Från AI-driven utveckling till WebAssembly.",
    content: `
      # Framtidens Webutveckling: Trender att Hålla Koll På

      I en värld där digital närvaro blir allt viktigare, utvecklas webutvecklingen i en rasande takt. Här är några av de viktigaste trenderna att hålla koll på under kommande år.

      ## 1. AI-Driven Utveckling
      Artificiell intelligens revolutionerar hur vi bygger och underhåller webbplatser. Från automatiserad kodgenerering till intelligenta användarupplevelser, AI är här för att stanna.

      ## 2. WebAssembly
      WebAssembly möjliggör högpresterande applikationer direkt i webbläsaren. Detta öppnar upp för helt nya möjligheter inom webbapplikationer.

      ## 3. Jamstack och Headless CMS
      Moderna arkitekturer som Jamstack fortsätter att växa i popularitet, med fokus på prestanda och säkerhet.

      ## Slutsats
      Framtidens webutveckling handlar om att kombinera dessa teknologier för att skapa snabbare, säkrare och mer användarvänliga webbplatser.
    `,
    coverImage: "/placeholder.svg?height=600&width=1200&text=Webutveckling",
    publishedAt: "2024-02-15",
    author: {
      name: "Erik Andersson",
      avatar: "/placeholder.svg?height=100&width=100&text=EA",
    },
    tags: ["Webutveckling", "AI", "Teknologi"],
  },
  {
    id: "2",
    title: "Optimera Din SEO-Strategi för 2024",
    slug: "optimera-seo-strategi-2024",
    excerpt:
      "Lär dig de senaste SEO-teknikerna och strategierna för att förbättra din webbplats synlighet i sökmotorer under 2024.",
    content: `
      # Optimera Din SEO-Strategi för 2024

      Search Engine Optimization (SEO) fortsätter att vara en kritisk del av digital marknadsföring. Här är de viktigaste aspekterna att fokusera på under 2024.

      ## 1. Core Web Vitals
      Googles fokus på användarupplevelse gör Core Web Vitals viktigare än någonsin. Vi går igenom hur du optimerar din webbplats för bästa resultat.

      ## 2. AI-Genererat Innehåll
      Med framväxten av AI-verktyg behöver vi hitta en balans mellan automatiserat och mänskligt innehåll.

      ## 3. Mobile-First Indexering
      Mobilanpassning är inte längre valfritt. Vi visar hur du säkerställer att din webbplats presterar optimalt på alla enheter.

      ## Sammanfattning
      En framgångsrik SEO-strategi 2024 kräver en kombination av teknisk optimering och kvalitetsinnehåll.
    `,
    coverImage: "/placeholder.svg?height=600&width=1200&text=SEO",
    publishedAt: "2024-02-10",
    author: {
      name: "Maria Lindström",
      avatar: "/placeholder.svg?height=100&width=100&text=ML",
    },
    tags: ["SEO", "Digital Marknadsföring", "Innehållsstrategi"],
  },
  {
    id: "3",
    title: "AI i Modern Webbutveckling",
    slug: "ai-modern-webbutveckling",
    excerpt:
      "Upptäck hur artificiell intelligens transformerar webbutveckling och skapar nya möjligheter för företag och utvecklare.",
    content: `
      # AI i Modern Webbutveckling

      Artificiell intelligens förändrar hur vi bygger och interagerar med webben. Låt oss utforska de mest spännande tillämpningarna.

      ## 1. Automatiserad Kodgenerering
      AI-verktyg kan nu generera kod baserat på naturligt språk, vilket revolutionerar utvecklingsprocessen.

      ## 2. Personalisering
      AI möjliggör djupgående personalisering av användarupplevelser i realtid.

      ## 3. Prediktiv Analys
      Genom AI kan vi förutse användarbeteenden och optimera webbplatser därefter.

      ## Framtidsutsikter
      AI kommer fortsätta att förändra webbutveckling på fundamentala sätt, och det är viktigt att hålla sig uppdaterad.
    `,
    coverImage: "/placeholder.svg?height=600&width=1200&text=AI",
    publishedAt: "2024-02-05",
    author: {
      name: "Johan Berg",
      avatar: "/placeholder.svg?height=100&width=100&text=JB",
    },
    tags: ["AI", "Teknologi", "Innovation"],
  },
]

