export type Ingredient = {
  name: string
  pct?: string
  benefit: string
}

export type ProductReview = {
  quote: string
  author: string
  location: string
  skin: string
  weeks: string
  rating: number
  initials: string
  color: string
}

export type Benefit = {
  icon: string
  title: string
  desc: string
}

export type Product = {
  slug: string
  name: string
  tagline: string
  badge: string
  price: number
  originalPrice?: number
  size: string
  rating: number
  reviewCount: number
  heroImage: string
  description: string
  longDescription: string
  benefits: Benefit[]
  keyIngredients: Ingredient[]
  allIngredients: string
  howToUse: string[]
  reviews: ProductReview[]
  relatedSlugs: string[]
  seo: { title: string; description: string }
}

const PRODUCTS: Product[] = [
  {
    slug: 'radiance-serum',
    name: 'Radiance Serum',
    tagline: 'Vitamine C + Retinol voor een stralende, egale huid',
    badge: 'Bestseller',
    price: 58,
    size: '30ml',
    rating: 4.9,
    reviewCount: 12400,
    heroImage:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85&fit=crop',
    description:
      'Ons bestsellende serum combineert Vitamine C 15% met Retinol 0.3% en Niacinamide 5% voor zichtbaar stralende en egale huid in 28 dagen.',
    longDescription:
      'De Radiance Serum is geformuleerd voor iedereen die op zoek is naar een klinisch bewezen aanpak voor dofheid, ongelijkmatige huidtint en de eerste tekenen van veroudering. Vitamine C neutraliseert vrije radicalen, Retinol stimuleert huidvernieuwing en Niacinamide verkleint zichtbare poriën — drie krachtige actieve stoffen in één lichte, waterige textuur die direct intrekt.',
    benefits: [
      { icon: '✨', title: 'Zichtbaar stralend', desc: 'Dofheid verminderen vanaf dag 1' },
      { icon: '🎯', title: 'Egale huidtint', desc: 'Verkleurt pigmentvlekken & roodheid' },
      { icon: '⏱️', title: '28 dagen resultaat', desc: 'Klinisch bewezen verbetering' },
      { icon: '🌿', title: 'Geen parfum', desc: 'Geschikt voor gevoelige huid' },
    ],
    keyIngredients: [
      { name: 'Vitamine C (Ascorbylglucoside)', pct: '15%', benefit: 'Krachtige antioxidant die pigmentvlekken vermindert en collageen stimuleert' },
      { name: 'Retinol', pct: '0.3%', benefit: 'Versnelt huidvernieuwing, vermindert fijne lijntjes en poriën' },
      { name: 'Niacinamide', pct: '5%', benefit: 'Verkleint poriën, balanceert talgproductie en vermindert roodheid' },
      { name: 'Hyaluronzuurcomplex', pct: '2%', benefit: 'Drievoudige molecuulgrootte voor hydratatie op elke huidlaag' },
      { name: 'Bakuchiol', pct: '0.5%', benefit: 'Plantaardig retinol-alternatief voor extra tolerantie' },
    ],
    allIngredients:
      'Aqua, Ascorbyl Glucoside (15%), Glycerin, Niacinamide (5%), Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Retinol (0.3%), Bakuchiol (0.5%), Pentylene Glycol, Allantoin, Panthenol, Xanthan Gum, Sodium PCA, Caprylic/Capric Triglyceride, Citric Acid, Sodium Benzoate, Potassium Sorbate.',
    howToUse: [
      'Reinig je huid met de Gentle Foam Cleanser en dep droog.',
      'Breng 3–4 druppels aan op gezicht, hals en decolleté.',
      'Druk zachtjes aan met handpalmen — niet wrijven.',
      'Laat 60 seconden intrekken voor de volgende stap.',
      'Volg altijd op met een brede SPF-bescherming in de ochtend.',
      'Gebruik \'s ochtends. Beginners: start met om de dag gebruiken.',
    ],
    reviews: [
      {
        quote: 'Mijn huid is compleet getransformeerd. Na 4 weken zag ik al verschil in mijn textuur en glow.',
        author: 'Sophie van den Berg', location: 'Amsterdam',
        skin: 'Droge huid', weeks: '4 weken', rating: 5, initials: 'SV', color: 'bg-rose-400',
      },
      {
        quote: 'Eindelijk een vitamine C serum die niet prikt! Mijn pigmentvlekken zijn zoveel lichter geworden.',
        author: 'Noor Bakker', location: 'Rotterdam',
        skin: 'Gemengde huid', weeks: '6 weken', rating: 5, initials: 'NB', color: 'bg-amber-500',
      },
      {
        quote: 'Ik ben om. De textuur is zo licht, het trekt meteen in. Na 3 weken al zichtbaar minder vlekjes.',
        author: 'Lisa Müller', location: 'Berlijn',
        skin: 'Normale huid', weeks: '3 weken', rating: 5, initials: 'LM', color: 'bg-indigo-400',
      },
    ],
    relatedSlugs: ['the-glow-ritual', 'sensitive-skin-edit'],
    seo: {
      title: 'Radiance Serum — Vitamine C & Retinol Serum 30ml',
      description:
        'Klinisch bewezen Vitamine C 15% + Retinol 0.3% serum. Stralende, egale huid in 28 dagen. Dermatoloog getest, parfumvrij. €58 met gratis verzending.',
    },
  },
  {
    slug: 'the-glow-ritual',
    name: 'The Glow Ritual',
    tagline: 'De complete LUMÉ ochtend- en avondroutine',
    badge: 'Beste Waarde',
    price: 129,
    originalPrice: 174,
    size: 'Volledige routine · 3 producten',
    rating: 4.9,
    reviewCount: 8700,
    heroImage:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85&fit=crop',
    description:
      'De complete LUMÉ ochtend- en avondroutine in één bundel. Inclusief gratis Mini Oogcrème. Bespaar €45 ten opzichte van los kopen.',
    longDescription:
      "The Glow Ritual is onze meest populaire bundel voor een reden. Drie producten die naadloos samenwerken: de Radiance Serum voor overdag, de Deep Moisture Cream voor barrièreherstel en de Overnight Renewal Oil om 's nachts te regenereren. Dit is het systeem dat 94% van onze klanten in slechts 28 dagen zichtbare resultaten geeft. Als cadeau ontvang je er ook onze Mini Oogcrème bij.",
    benefits: [
      { icon: '🎁', title: 'Gratis Mini Oogcrème', desc: 'Ter waarde van €28 cadeau' },
      { icon: '💰', title: 'Bespaar €45', desc: 'Versus los kopen (€174)' },
      { icon: '🔄', title: '28-dagen systeem', desc: 'Ochtend & avond volledig gedekt' },
      { icon: '📦', title: 'Gratis verzending', desc: 'Inclusief luxe geschenkverpakking' },
    ],
    keyIngredients: [
      { name: 'Vitamine C 15% + Retinol 0.3%', benefit: 'In de Radiance Serum — stralend & anti-aging' },
      { name: 'Ceramiden + Squalaan', benefit: 'In de Deep Moisture Cream — barrièreherstel & langdurige hydratatie' },
      { name: 'Rozenbottelolie + Bakuchiol', benefit: "In de Overnight Oil — regeneratie en egalisering 's nachts" },
      { name: 'Hyaluronzuurcomplex', benefit: 'In alle 3 producten — hydratatie op elk niveau' },
    ],
    allIngredients:
      'Bevat: Radiance Serum 30ml, Deep Moisture Cream 50ml, Overnight Renewal Oil 20ml, Mini Oogcrème 10ml (cadeau). Zie individuele producten voor volledige ingrediëntenlijsten.',
    howToUse: [
      'OCHTEND: Reinig met Gentle Foam Cleanser.',
      'Breng Radiance Serum aan op gezicht en hals.',
      'Volg op met Deep Moisture Cream + SPF 30+.',
      'AVOND: Dubbel reinigen — begin met een balm of olie.',
      'Breng Retinol Serum aan (2–3x per week voor beginners).',
      'Sluit af met 2–3 druppels Overnight Renewal Oil.',
      'Breng Mini Oogcrème aan rondom het ooggebied.',
    ],
    reviews: [
      {
        quote: 'De beste skincare investering die ik ooit heb gedaan. Mijn huid ziet er jaren jonger uit na 6 weken.',
        author: 'Julia van der Berg', location: 'Utrecht',
        skin: 'Gemengde huid', weeks: '6 weken', rating: 5, initials: 'JB', color: 'bg-rose-400',
      },
      {
        quote: 'LUMÉ heeft me omgezet van een 10-stappen routine naar 3 producten. Mijn huid heeft er nooit beter uitgezien.',
        author: 'Emma Clarke', location: 'London',
        skin: 'Gevoelige huid', weeks: '8 weken', rating: 5, initials: 'EC', color: 'bg-amber-500',
      },
      {
        quote: 'Het cadeau verpakking is zo mooi, ik heb er ook eentje als cadeau gegeven. Iedereen is er gek op.',
        author: 'Fleur de Jong', location: 'Den Haag',
        skin: 'Droge huid', weeks: '5 weken', rating: 5, initials: 'FJ', color: 'bg-purple-400',
      },
    ],
    relatedSlugs: ['radiance-serum', 'sensitive-skin-edit'],
    seo: {
      title: 'The Glow Ritual — Complete Skincare Bundel 3 Producten',
      description:
        'De complete LUMÉ ochtend- en avondroutine. Radiance Serum + Deep Moisture Cream + Overnight Oil. Bespaar €45. Gratis Mini Oogcrème. €129.',
    },
  },
  {
    slug: 'sensitive-skin-edit',
    name: 'Sensitive Skin Edit',
    tagline: 'Bakuchiol + barrièreherstel voor gevoelige huid',
    badge: 'Zachte Formule',
    price: 89,
    size: '2 producten',
    rating: 4.8,
    reviewCount: 4200,
    heroImage:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=85&fit=crop',
    description:
      'Bakuchiol geeft je retinol-achtige resultaten zonder irritatie. Gecombineerd met onze Barrier Restore Cream voor een versterkte, rustige huid.',
    longDescription:
      'De Sensitive Skin Edit is speciaal ontwikkeld voor huid die reageert op traditioneel retinol, parfum of agressieve exfolianten. Bakuchiol is een plantaardig actief uit de babchi plant dat klinisch dezelfde voordelen biedt als retinol — het stimuleert collageen, vermindert fijne lijntjes en egalisert huidtint — maar zonder de irritatie, roodheid of purging die retinol kan veroorzaken. De Barrier Restore Cream vult ceramiden aan en versterkt de huidbarrière voor duurzame bescherming.',
    benefits: [
      { icon: '🌿', title: 'Geen irritatie', desc: 'Bakuchiol werkt als retinol maar zachter' },
      { icon: '🛡️', title: 'Barrièreherstel', desc: 'Ceramiden voor bescherming & sterkte' },
      { icon: '🔬', title: 'Klinisch bewezen', desc: '91% rapporteert geen irritatie' },
      { icon: '✓', title: 'Parfumvrij', desc: 'Zonder alcoholen & conserveringsmiddelen' },
    ],
    keyIngredients: [
      { name: 'Bakuchiol', pct: '1%', benefit: 'Plantaardig retinol-alternatief — stimuleert collageen zonder irritatie' },
      { name: 'Ceramide NP + AP + EOP', pct: '3%', benefit: 'Versterkt de huidbarrière en voorkomt vochtverlies' },
      { name: 'Bèta-glucaan', pct: '0.5%', benefit: 'Krachtige anti-roodheid en rustgevende werking' },
      { name: 'Pantenol (Vitamine B5)', pct: '2%', benefit: 'Kalmerend en helend, herstelt geïrriteerde huid' },
      { name: 'Squalaan', benefit: 'Plantaardige olïe die de huid week en soepel houdt' },
    ],
    allIngredients:
      'Aqua, Glycerin, Niacinamide (4%), Bakuchiol (1%), Sodium Hyaluronate, Ceramide NP, Ceramide AP, Ceramide EOP, Beta-Glucan (0.5%), Panthenol (2%), Squalane, Cholesterol, Phytosphingosine, Allantoin, Pentylene Glycol, Carbomer, Sodium PCA, Sodium Benzoate, Potassium Sorbate.',
    howToUse: [
      'Reinig je huid zachtjes — gebruik geen hete stoom of agressieve cleansers.',
      'Breng Bakuchiol Serum aan op schone, droge huid.',
      'Masseer zachtjes in opwaartse bewegingen.',
      'Volg op met Barrier Restore Cream voor afdichting en bescherming.',
      'Gebruik ochtend én avond voor beste resultaten.',
      'SPF is essentieel in de ochtend, ook voor gevoelige huid.',
    ],
    reviews: [
      {
        quote: 'Eindelijk een retinol die niet irriteert! Mijn gevoeligheidsproblemen zijn verdwenen en mijn huid ziet er jonger uit.',
        author: 'Hannah Park', location: 'Amsterdam',
        skin: 'Gevoelige huid', weeks: '6 weken', rating: 5, initials: 'HP', color: 'bg-teal-500',
      },
      {
        quote: 'Ik heb jarenlang rosacea gehad. Deze producten zijn het enige dat mijn huid echt kalmeert en toch resultaten geeft.',
        author: 'Marie Laurent', location: 'Brussel',
        skin: 'Rosacea', weeks: '8 weken', rating: 5, initials: 'ML', color: 'bg-rose-300',
      },
      {
        quote: 'De cleanser is de zachtste die ik ooit heb gebruikt. Mijn barrière is eindelijk hersteld na jaren van te veel exfoliëren.',
        author: 'Charlotte Webb', location: 'Manchester',
        skin: 'Droge/gevoelige huid', weeks: '10 weken', rating: 5, initials: 'CW', color: 'bg-orange-400',
      },
    ],
    relatedSlugs: ['radiance-serum', 'the-glow-ritual'],
    seo: {
      title: 'Sensitive Skin Edit — Bakuchiol Serum & Barrier Crème',
      description:
        'Zachte Bakuchiol + barrièreherstel voor gevoelige huid. Retinol-achtige resultaten zonder irritatie. Geen parfum. €89 met gratis verzending.',
    },
  },
]

export function getAllProducts(): Product[] {
  return PRODUCTS
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return PRODUCTS.filter((p) => slugs.includes(p.slug))
}
