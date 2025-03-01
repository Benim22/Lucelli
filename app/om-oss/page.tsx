import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Om Oss</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lär känna Lucelli och vårt team av passionerade experter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Vår Historia</h2>
            <p className="text-lg text-gray-700 mb-6">
              Lucelli grundades 2015 med en vision om att hjälpa företag att navigera i den digitala världen. Vad som
              började som ett litet team av passionerade utvecklare har vuxit till ett fullservice digitalt
              tjänsteföretag med expertis inom webutveckling, grafisk design, AI-lösningar och SEO.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Under åren har vi haft förmånen att arbeta med hundratals kunder, från små startups till stora etablerade
              företag, och hjälpt dem att uppnå sina digitala mål. Vår framgång bygger på vår förmåga att förstå våra
              kunders behov och leverera lösningar som överträffar förväntningarna.
            </p>
            <p className="text-lg text-gray-700">
              Idag fortsätter vi att växa och utvecklas, alltid med fokus på att leverera högkvalitativa digitala
              lösningar som hjälper våra kunder att lyckas i en ständigt föränderlig digital värld.
            </p>
          </div>
          <div>
            <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video bg-gray-100 dark:bg-gray-800">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="https://cdn.pixabay.com/video/2017/12/05/13232-246463976_tiny.mp4" type="video/mp4" />
                Din webbläsare stödjer inte videotaggen.
              </video>
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6 text-center">Våra Värderingar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Vi strävar alltid efter att ligga i framkant av teknologisk utveckling och hitta innovativa lösningar på
                komplexa problem.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Samarbete</h3>
              <p className="text-gray-600">
                Vi tror på kraften i samarbete, både inom vårt team och med våra kunder, för att uppnå de bästa
                resultaten.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-2">Kvalitet</h3>
              <p className="text-gray-600">
                Vi kompromissar aldrig med kvaliteten på vårt arbete och strävar alltid efter att överträffa
                förväntningarna.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-2">Tillväxt</h3>
              <p className="text-gray-600">
                Vi är dedikerade till kontinuerlig tillväxt och utveckling, både för vårt företag och för våra kunder.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Vårt Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Möt de passionerade experterna som gör Lucelli till vad det är idag.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=Team+Member+${i}`}
                  alt={`Team Member ${i}`}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">Namn Efternamn</h3>
                  <p className="text-gray-600">Position</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

