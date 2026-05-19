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
  rating?: number
  reviewCount?: number
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
  emotion?: string
  textureNote?: string
  textureImages?: string[]
  routineContext?: {
    time: string
    step: number
    note: string
    pairingNote: string
  }
  // 'available' | 'pre-launch' | 'sample' — defaults to 'pre-launch' if omitted
  availability?: 'available' | 'pre-launch' | 'sample'
}

const PRODUCTS: Product[] = [
  {
    slug: 'quiet-cleanser',
    name: 'Quiet Cleanser',
    tagline: 'Reinigt zonder te verstoren.',
    badge: 'Stap 01',
    price: 38,
    size: '150ml',
    availability: 'pre-launch',
    heroImage: '/quiet-cleanser.jpg',
    description: 'Zachte foamreiniger die SPF, make-up en vervuiling verwijdert zonder de huidbarrière te verstoren. Ceramiden en Provitamine B5 herstellen terwijl je reinigt.',
    longDescription: 'De Quiet Cleanser is ontworpen vanuit één principe: reiniging mag nooit ten koste gaan van de huidbarrière. Waar de meeste cleansers de beschermende lipiden wegspoelen, versterkt de Quiet Cleanser deze juist. Ceramiden vullen de barrière aan. Provitamine B5 kalmeert. Allantoin herstelt. Het resultaat is een huid die na het reinigen niet strak aanvoelt, maar soepel en klaar voor de volgende stap.',
    benefits: [
      { icon: '🛡️', title: 'Barrièrebeschermend', desc: 'Ceramiden versterken tijdens het reinigen' },
      { icon: '💧', title: 'Zonder uitdroging', desc: 'Huid voelt soepel na gebruik' },
      { icon: '🌿', title: 'Parfumvrij', desc: 'Geschikt voor gevoelige huid' },
      { icon: '✓', title: 'Alle huidtypes', desc: 'Ook voor droge en reactieve huid' },
    ],
    keyIngredients: [
      { name: 'Ceramiden Complex', pct: '2%', benefit: 'Versterkt de huidbarrière tijdens het reinigen' },
      { name: 'Provitamine B5 (Panthenol)', pct: '2%', benefit: 'Kalmeert en bevordert herstel van geïrriteerde huid' },
      { name: 'Allantoin', benefit: 'Verzachtend en kalmerend' },
      { name: 'Glycerin', pct: '3%', benefit: 'Hygroskopisch humectant voor soepele huid' },
    ],
    allIngredients: 'Aqua, Glycerin (3%), Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Panthenol (2%), Ceramide NP, Ceramide AP, Allantoin, Sodium PCA, Pentylene Glycol, Carbomer, Sodium Hydroxide, Sodium Benzoate, Potassium Sorbate.',
    howToUse: [
      'Bevochtig je gezicht met lauwwarm water — nooit heet.',
      'Breng een kleine hoeveelheid aan op vochtige huid.',
      'Masseer zachtjes in cirkelbewegingen gedurende 60 seconden.',
      'Spoel grondig af met lauwwarm water.',
      'Dep droog met een zachte handdoek — niet wrijven.',
    ],
    reviews: [
      { quote: 'Eindelijk een cleanser die mijn huid niet uitdroogt. Na het wassen voelt het zacht aan.', author: 'Sophie van den Berg', location: 'Amsterdam', skin: 'Droge huid', weeks: '8 weken', rating: 5, initials: 'SV', color: 'bg-rose-400' },
      { quote: 'Ik heb rosacea en dit is de enige cleanser die ik zonder problemen gebruik.', author: 'Marie Laurent', location: 'Brussel', skin: 'Gevoelige huid', weeks: '6 weken', rating: 5, initials: 'ML', color: 'bg-teal-400' },
      { quote: 'Simpel. Effectief. Mijn huid is er beter van geworden.', author: 'Noor Bakker', location: 'Rotterdam', skin: 'Gemengde huid', weeks: '4 weken', rating: 5, initials: 'NB', color: 'bg-amber-400' },
    ],
    relatedSlugs: ['reset-serum', 'soft-barrier-cream'],
    seo: { title: 'Quiet Cleanser — Zachte Ceramide Reiniger 150ml | LUMÉ', description: 'Parfumvrije foamreiniger met Ceramiden & Provitamine B5. Reinigt zonder barrièreverstoring. Geschikt voor gevoelige huid. €38.' },
    emotion: 'Een cleanser die niks opeist. Wast schoon. Laat met rust.',
    textureNote: 'Rijke foam die direct aanspoelt. Geen trekkerig gevoel achteraf — alleen schoon.',
    textureImages: [
      '/quiet-cleanser.jpg',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=85&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=85&fit=crop',
    ],
    routineContext: {
      time: 'Ochtend & avond',
      step: 1,
      note: 'Altijd eerste stap. Lauwe huid — nooit heet. 60 seconden masseren. Grondig afspoelen. Dep droog, niet wrijven.',
      pairingNote: 'Avond: volg op met Reset Serum. Ochtend: direct naar Soft Barrier Cream + SPF. Nooit overslaan, ook niet na een lange dag.',
    },
  },
  {
    slug: 'reset-serum',
    name: 'Reset Serum',
    tagline: 'Eén serum. Doet het werk van drie.',
    badge: 'Bestseller',
    price: 58,
    size: '30ml',
    availability: 'pre-launch',
    heroImage: '/reset-serum.jpg',
    description: 'Retinol 0.3%, Niacinamide 10% en Hyaluronzuur in één stabiele formule. Effectief voor celvernieuwing, poriënverfijning en hydratatie — zonder irritatie.',
    longDescription: 'Het Reset Serum is ons antwoord op onnodige complexiteit. In plaats van drie afzonderlijke serums voor retinol, niacinamide en hydratie, combineert het Reset Serum deze drie klinisch bewezen ingrediënten in één lichte, waterige textuur. Retinol stimuleert celvernieuwing. Niacinamide verfijnt poriën en egalisert de huidtint. Hyaluronzuur op drie molecuulgewichten hydrateert op elk niveau. Het resultaat: minder stappen, meer effect.',
    benefits: [
      { icon: '🔬', title: 'Retinol 0.3%', desc: 'Klinisch effectieve dosis' },
      { icon: '✨', title: 'Niacinamide 10%', desc: 'Poriënverfijning & verheldering' },
      { icon: '💧', title: 'Triple HA', desc: '72u hydratatie op alle huidlagen' },
      { icon: '🌿', title: 'Parfumvrij', desc: 'Geschikt voor gevoelige huid' },
    ],
    keyIngredients: [
      { name: 'Retinol', pct: '0.3%', benefit: 'Versnelt celvernieuwing, vermindert fijne lijntjes en verbetert huidtextuur' },
      { name: 'Niacinamide', pct: '10%', benefit: 'Verfijnt poriën, egalisert huidtint en heeft anti-inflammatoire werking' },
      { name: 'Hyaluronzuurcomplex (3×)', pct: '2%', benefit: 'Drie molecuulgewichten voor hydratatie op elk huidniveau' },
      { name: 'Bakuchiol', pct: '0.5%', benefit: 'Versterkt de retinol-werking, verhoogt tolerantie' },
    ],
    allIngredients: 'Aqua, Glycerin, Niacinamide (10%), Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Hyaluronate Crosspolymer, Retinol (0.3%), Bakuchiol (0.5%), Pentylene Glycol, Allantoin, Panthenol, Xanthan Gum, Sodium PCA, Citric Acid, Sodium Benzoate, Potassium Sorbate.',
    howToUse: [
      'Reinig je huid met de Quiet Cleanser en dep droog.',
      'Breng 3–4 druppels aan op gezicht, hals en decolleté.',
      'Druk zachtjes aan met handpalmen — niet wrijven.',
      'Laat 60–90 seconden intrekken voor de volgende stap.',
      'Beginners: start 2–3x per week en bouw op naar dagelijks gebruik.',
      'Gebruik altijd SPF in de ochtend na retinolgebruik.',
    ],
    reviews: [
      { quote: 'Na 4 weken echt zichtbaar verschil in textuur. Ik had het niet verwacht maar het werkt gewoon.', author: 'Sophie van den Berg', location: 'Amsterdam', skin: 'Droge huid', weeks: '4 weken', rating: 5, initials: 'SV', color: 'bg-rose-400' },
      { quote: 'Gevoelige huid, altijd bang voor retinol. Dit is de eerste formule die ik dagelijks gebruik zonder problemen.', author: 'Emma Clarke', location: 'London', skin: 'Gevoelige huid', weeks: '6 weken', rating: 5, initials: 'EC', color: 'bg-amber-500' },
      { quote: 'Poriën veel minder zichtbaar na 5 weken. Dit is mijn nieuwe vaste serum.', author: 'Noor Bakker', location: 'Rotterdam', skin: 'Gemengde huid', weeks: '5 weken', rating: 5, initials: 'NB', color: 'bg-indigo-400' },
    ],
    relatedSlugs: ['quiet-cleanser', 'soft-barrier-cream'],
    seo: { title: 'Reset Serum — Retinol 0.3% + Niacinamide 10% | LUMÉ', description: 'Parfumvrij Retinol 0.3% + Niacinamide 10% serum. Geformuleerd voor barrièreherstel, poriënverfijning en hydratatie. Pre-launch. €58.' },
    emotion: 'Gebouwd voor huid die te veel heeft meegemaakt.',
    textureNote: 'Waterig en bijna doorzichtig. Trekt in binnen 45 seconden. Geen restlaag. Geen kleverig gevoel. Werkt terwijl je slaapt.',
    textureImages: [
      '/reset-serum-2.jpg',
      '/reset-serum-3.jpg',
      '/reset-serum-4.jpg',
    ],
    routineContext: {
      time: 'Avond',
      step: 2,
      note: 'Na de Quiet Cleanser, voor de Soft Barrier Cream. 3–4 druppels. Druk zachtjes aan — niet wrijven. Beginners: start 2–3× per week en bouw langzaam op naar dagelijks gebruik.',
      pairingNote: 'Gebruik altijd SPF 30+ de volgende ochtend. Retinol verhoogt UV-gevoeligheid. Dit is niet optioneel.',
    },
  },
  {
    slug: 'soft-barrier-cream',
    name: 'Soft Barrier Cream',
    tagline: 'Hydratatie zonder het vettige gevoel.',
    badge: 'Stap 03',
    price: 48,
    size: '50ml',
    availability: 'pre-launch',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=85&fit=crop',
    description: 'Lichte dagcrème die de huidbarrière herstelt en langdurig vocht vasthoudt. Met Bakuchiol en Ceramiden. Werkt als afsluiting van de ochtend- én avondroutine.',
    longDescription: 'De Soft Barrier Cream is de laatste stap in je routine — en een van de belangrijkste. Een beschadigde huidbarrière laat vocht ontsnappen en externe irritanten toe. Ceramiden vullen de lipidenmantels aan. Bakuchiol voegt milde celvernieuwing toe. Squalaan sluit alles in zonder te verstoppen. Het resultaat is een huid die de rest van de dag beschermd en gehydrateerd blijft — zonder de vettige glans van zwaardere crèmes.',
    benefits: [
      { icon: '🛡️', title: 'Barrièreherstel', desc: 'Ceramiden voor sterke bescherming' },
      { icon: '🌿', title: 'Bakuchiol', desc: 'Zachte anti-aging zonder irritatie' },
      { icon: '💧', title: 'Non-comedogeen', desc: 'Verstopt geen poriën' },
      { icon: '✓', title: 'Lichte textuur', desc: 'Geen vettig gevoel, dag én nacht' },
    ],
    keyIngredients: [
      { name: 'Ceramiden Complex', pct: '3%', benefit: 'Versterkt en herstelt de huidbarrière' },
      { name: 'Bakuchiol', pct: '0.5%', benefit: 'Plantaardig retinol-alternatief voor milde anti-aging' },
      { name: 'Squalaan', benefit: 'Lichte, niet-comedogene plantaardige olie' },
      { name: 'Beta-Glucan', pct: '0.5%', benefit: 'Anti-roodheid en diep kalmerend' },
    ],
    allIngredients: 'Aqua, Glycerin, Squalane, Niacinamide (4%), Ceramide NP, Ceramide AP, Ceramide EOP, Bakuchiol (0.5%), Beta-Glucan (0.5%), Panthenol (2%), Cholesterol, Phytosphingosine, Allantoin, Carbomer, Sodium PCA, Sodium Benzoate, Potassium Sorbate.',
    howToUse: [
      'Breng aan als laatste stap na je serum.',
      'Gebruik een kleine hoeveelheid — een kleine hoeveelheid gaat ver.',
      'Verspreid in opwaartse bewegingen over gezicht en hals.',
      'Volg in de ochtend altijd op met SPF 30+.',
      'Kan ook gebruikt worden als nachcrème voor extra herstel.',
    ],
    reviews: [
      { quote: 'Mijn barrière was kapot van te veel scrubben. Na 8 weken LUMÉ voelt mijn huid eindelijk normaal.', author: 'Hannah Park', location: 'Seoul', skin: 'Gevoelige huid', weeks: '8 weken', rating: 5, initials: 'HP', color: 'bg-teal-500' },
      { quote: 'Licht maar hydraterend. Nooit meer het gevoel dat mijn gezicht droog wordt halverwege de dag.', author: 'Lisa Müller', location: 'Berlijn', skin: 'Droge huid', weeks: '6 weken', rating: 5, initials: 'LM', color: 'bg-indigo-400' },
      { quote: 'Ik gebruik het ochtend én avond. Geen enkele andere crème werkt voor mij zo goed.', author: 'Fleur de Jong', location: 'Utrecht', skin: 'Gemengde huid', weeks: '10 weken', rating: 5, initials: 'FJ', color: 'bg-purple-400' },
    ],
    relatedSlugs: ['quiet-cleanser', 'reset-serum'],
    seo: { title: 'Soft Barrier Cream — Ceramiden & Bakuchiol Dagcrème 50ml | LUMÉ', description: 'Lichte dagcrème met Ceramiden 3%, Bakuchiol & Squalaan. Barrièreherstel & langdurige hydratatie. Non-comedogeen. €48.' },
    emotion: 'Hydratatie die beschermt in plaats van verstopt.',
    textureNote: 'Lichte gel-crème die smelt op lichaamstemperatuur. Snel intrekkend. Geen witte restlaag, geen vet gevoel — ook niet na een uur.',
    textureImages: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=85&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=85&fit=crop',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=700&q=85&fit=crop',
    ],
    routineContext: {
      time: 'Ochtend & avond',
      step: 3,
      note: 'Laatste stap. Een kleine hoeveelheid gaat ver — minder dan je denkt. Verspreid in opwaartse bewegingen over gezicht en hals. Wacht 60 seconden voor SPF.',
      pairingNote: 'Ochtend: altijd afsluiten met SPF 30+. Avond: kan worden gebruikt ná de Overnight Renewal Oil voor extra rijkdom. Of gebruik alleen — ook prima als nachtcrème.',
    },
  },
  {
    slug: 'overnight-renewal-oil',
    name: 'Overnight Renewal Oil',
    tagline: 'Herstellend terwijl je slaapt.',
    badge: 'Nacht',
    price: 52,
    size: '30ml',
    availability: 'pre-launch',
    heroImage: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85&fit=crop',
    description: 'Lichte droge olie met Rozenbottelolie, Bakuchiol en Squalaan. Werkt nachtelijk aan celvernieuwing en barrièreherstel zonder zware textuur.',
    longDescription: 'De nacht is het meest actieve herstelmoment voor je huid. De Overnight Renewal Oil maakt gebruik van dit raam: Rozenbottelolie levert vitamine A en essentielle vetzuren voor celvernieuwing. Bakuchiol versterkt dit effect en verbetert huidtoon. Squalaan sluit alles in — licht, non-comedogeen en volledig plantaardig. Geen kunstmatig parfum. Geen overbodige vullers. Alleen wat werkt.',
    benefits: [
      { icon: '🌙', title: 'Nachtelijk herstel', desc: 'Werkt tijdens je slaap aan vernieuwing' },
      { icon: '🌹', title: 'Rozenbottelolie', desc: 'Rijk aan vitamine A en omega-vetzuren' },
      { icon: '💧', title: 'Droge olie textuur', desc: 'Trekt snel in, geen vettig gevoel' },
      { icon: '🌿', title: 'Non-comedogeen', desc: 'Verstopt geen poriën' },
    ],
    keyIngredients: [
      { name: 'Rozenbottelolie', pct: '20%', benefit: 'Rijk aan vitamine A (retinol precursor) en omega-3/6 voor celvernieuwing' },
      { name: 'Bakuchiol', pct: '0.5%', benefit: 'Plantaardig retinol-alternatief voor milde anti-aging zonder irritatie' },
      { name: 'Squalaan', benefit: 'Lichte, non-comedogene plantaardige olie die de huid verzacht en beschermt' },
      { name: 'Vitamine E (Tocoferol)', benefit: 'Krachtige antioxidant die vrije radicalen neutraliseert' },
    ],
    allIngredients: 'Rosa Canina Fruit Oil (20%), Squalane, Caprylic/Capric Triglyceride, Bakuchiol (0.5%), Tocopherol (Vitamin E), Helianthus Annuus Seed Oil, Bisabolol, Lavandula Angustifolia Extract.',
    howToUse: [
      'Breng aan als laatste stap van je avondroutine.',
      'Gebruik 3–5 druppels voor gezicht en hals.',
      'Druk zachtjes aan — niet wrijven.',
      'Kan worden gemengd met je avondcrème voor extra rijkdom.',
      'Gebruik dagelijks voor beste resultaten.',
    ],
    reviews: [
      { quote: 'Ik word wakker met een huid die er gewoon beter uitziet. Na 3 weken al echt zichtbaar verschil.', author: 'Fleur de Jong', location: 'Utrecht', skin: 'Droge huid', weeks: '3 weken', rating: 5, initials: 'FJ', color: 'bg-purple-400' },
      { quote: 'Super licht voor een olie. Geen plakkend gevoel, trekt gewoon in. Mijn huid voelt de volgende ochtend geweldig.', author: 'Charlotte Webb', location: 'Manchester', skin: 'Gemengde huid', weeks: '5 weken', rating: 5, initials: 'CW', color: 'bg-orange-400' },
      { quote: 'Perfect als laatste stap na mijn serum. Mijn huid droogt nu niet meer uit in de nacht.', author: 'Julia van der Berg', location: 'Utrecht', skin: 'Normale huid', weeks: '6 weken', rating: 5, initials: 'JB', color: 'bg-rose-400' },
    ],
    relatedSlugs: ['reset-serum', 'soft-barrier-cream'],
    seo: { title: 'Overnight Renewal Oil — Rozenbottelolie & Bakuchiol Nachtserum 30ml | LUMÉ', description: 'Herstellende droge olie met Rozenbottelolie 20% & Bakuchiol. Nachtelijk barrièreherstel en celvernieuwing. Non-comedogeen, parfumvrij. €52.' },
    emotion: 'De nacht is herseltijd. Dit zorgt dat je huid dat ook weet.',
    textureNote: 'Droge olie die absorbeert als water. Geen glans na aanbrengen, geen kleverig gevoel. Huid voelt de volgende ochtend zachter — zonder residue.',
    textureImages: [
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=85&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=85&fit=crop',
      '/quiet-cleanser.jpg',
    ],
    routineContext: {
      time: 'Avond',
      step: 3,
      note: 'Allerlaatste stap. 3–5 druppels voor gezicht en hals. Druk zachtjes aan — niet wrijven. Kan worden gemengd met Soft Barrier Cream voor extra rijkdom.',
      pairingNote: 'Werkt synergetisch met het Reset Serum. Serum behandelt actief — deze olie beschermt en herstelt. Samen het complete nachtprotocol.',
    },
  },
  {
    slug: 'radiance-serum',
    name: 'Radiance Serum',
    tagline: 'Vitamine C + Retinol voor een stralende, egale huid',
    badge: 'Bestseller',
    price: 58,
    size: '30ml',
    availability: 'pre-launch',
    heroImage:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=85&fit=crop',
    description:
      'Ons serum combineert Vitamine C 15% met Retinol 0.3% en Niacinamide 5% voor een stralende en egale huid. Geformuleerd voor zichtbaar effect.',
    longDescription:
      'De Radiance Serum is geformuleerd voor iedereen die op zoek is naar een klinisch bewezen aanpak voor dofheid, ongelijkmatige huidtint en de eerste tekenen van veroudering. Vitamine C neutraliseert vrije radicalen, Retinol stimuleert huidvernieuwing en Niacinamide verkleint zichtbare poriën — drie krachtige actieve stoffen in één lichte, waterige textuur die direct intrekt.',
    benefits: [
      { icon: '✨', title: 'Zichtbaar stralend', desc: 'Dofheid verminderen vanaf dag 1' },
      { icon: '🎯', title: 'Egale huidtint', desc: 'Verkleurt pigmentvlekken & roodheid' },
      { icon: '⏱️', title: 'Geformuleerd voor effect', desc: 'Gericht op zichtbaar verschil in huidtint' },
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
        'Vitamine C 15% + Retinol 0.3% serum voor stralende, egale huid. Parfumvrij, pre-launch. €58.',
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
    availability: 'pre-launch',
    heroImage:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85&fit=crop',
    description:
      'De complete LUMÉ ochtend- en avondroutine in één bundel. Inclusief gratis Mini Oogcrème. Bespaar €45 ten opzichte van los kopen.',
    longDescription:
      "The Glow Ritual is onze complete dagelijks bundel. Drie producten die naadloos samenwerken: de Radiance Serum voor overdag, de Deep Moisture Cream voor barrièreherstel en de Overnight Renewal Oil voor nachtelijk herstel. Als cadeau ontvang je er ook onze Mini Oogcrème bij.",
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
    availability: 'pre-launch',
    heroImage:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=85&fit=crop',
    description:
      'Bakuchiol geeft je retinol-achtige resultaten zonder irritatie. Gecombineerd met onze Barrier Restore Cream voor een versterkte, rustige huid.',
    longDescription:
      'De Sensitive Skin Edit is speciaal ontwikkeld voor huid die reageert op traditioneel retinol, parfum of agressieve exfolianten. Bakuchiol is een plantaardig actief uit de babchi plant dat klinisch dezelfde voordelen biedt als retinol — het stimuleert collageen, vermindert fijne lijntjes en egalisert huidtint — maar zonder de irritatie, roodheid of purging die retinol kan veroorzaken. De Barrier Restore Cream vult ceramiden aan en versterkt de huidbarrière voor duurzame bescherming.',
    benefits: [
      { icon: '🌿', title: 'Geen irritatie', desc: 'Bakuchiol werkt als retinol maar zachter' },
      { icon: '🛡️', title: 'Barrièreherstel', desc: 'Ceramiden voor bescherming & sterkte' },
      { icon: '🛡️', title: 'Geschikt voor gevoelige huid', desc: 'Geformuleerd zonder irriterende stoffen' },
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
  {
    slug: 'test-sample',
    name: 'Test Sample',
    tagline: 'Intern testproduct.',
    badge: 'Test',
    price: 0.02,
    size: '1ml',
    availability: 'available',
    heroImage: '/reset-serum.jpg',
    description: 'Intern testproduct.',
    longDescription: 'Intern testproduct.',
    benefits: [],
    keyIngredients: [{ name: 'Test', benefit: 'Test' }],
    allIngredients: '',
    howToUse: [],
    reviews: [],
    relatedSlugs: [],
    seo: { title: 'Test | LUMÉ', description: 'Testproduct.' },
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
