import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQPageContent from '@/components/FAQPageContent'

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen — MAUYI Huidverzorging',
  description:
    'Veelgestelde vragen over MAUYI Reset Serum, retinol, niacinamide, ingrediënten, levering en gebruik. Eerlijke antwoorden over huidverzorging op wetenschap.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wanneer zie ik resultaat van het Reset Serum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na 2–4 weken merk je verbetering in hydratatie en textuur. Fine lines en egale huidtint verbeteren na 4–8 weken consistent gebruik. Huid vernieuwt zich elke 28 dagen — geef het die tijd.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik MAUYI Reset Serum gebruiken als ik gevoelige huid heb?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. De formule is parfumvrij, alcoholvrij en zonder agressieve conserveringsmiddelen. Het Reset Serum gebruikt retinol 0.3% — de laagste effectieve concentratie — gebufferd door niacinamide 10% en bakuchiol, waardoor irritatie sterk vermindert. Begin met 2–3 avonden per week.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen retinol en bakuchiol?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Retinol (vitamine A-derivaat) stimuleert celvernieuwing en collageenproductie — klinisch goed bewezen, maar kan in de beginfase irritatie veroorzaken. Bakuchiol is een plantaardig alternatief dat vergelijkbare resultaten geeft zonder de bekende bijwerkingen. Geschikt voor gevoelige huid en tijdens de zwangerschap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is verzending gratis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gratis verzending in Nederland bij bestellingen boven €50. Bij bestellingen onder €50 rekenen we €3,95 verzendkosten. België en Duitsland: 2–4 werkdagen. Bestellingen geplaatst voor 15:00 worden dezelfde dag verstuurd.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe werkt de 30-dagen garantie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Niet tevreden na 30 dagen? Stuur het terug en je krijgt alles terug. Geen vragen, geen gedoe. We geloven in onze formules — het risico is voor ons.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is MAUYI vegan en cruelty-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100% vegan, gecertificeerd cruelty-free, zonder dierlijke ingrediënten. Verpakking is 92% recyclebaar. Alle INCI-ingrediënten staan op elke productpagina.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is het Reset Serum veilig tijdens zwangerschap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Retinol wordt afgeraden tijdens de zwangerschap. Overleg altijd met je arts. Voor zwangere klanten raden we een bakuchiol-formule aan als retinol-alternatief.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe gebruik ik het Reset Serum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Begin 2–3x per week \'s avonds: reinig eerst je huid, breng het serum aan op droge huid, daarna je moisturizer. Bouw in 4–6 weken op naar dagelijks gebruik. Gebruik overdag altijd SPF — retinol maakt de huid tijdelijk iets gevoeliger voor zon.',
      },
    },
  ],
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <FAQPageContent />
      <Footer />
    </>
  )
}
