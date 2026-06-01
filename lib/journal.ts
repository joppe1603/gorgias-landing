export type JournalPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  dateISO: string
  image: string
  body: Section[]
  seo: { title: string; description: string }
  featured?: boolean
}

export type Section = {
  type: 'h2' | 'h3' | 'p' | 'ul' | 'callout' | 'cta'
  content: string | string[]
}

const POSTS: JournalPost[] = [
  {
    slug: 'bakuchiol-vs-retinol',
    title: 'Bakuchiol vs retinol: wat is het verschil en wat werkt beter?',
    excerpt: 'Bakuchiol wordt vaak gepresenteerd als het "natuurlijke retinol-alternatief". Maar klopt dat? En wanneer kies je voor wat?',
    category: 'Ingrediënten',
    readTime: '6 min',
    date: 'Juni 2026',
    dateISO: '2026-06-01',
    image: '/reset-serum-new.jpg',
    featured: true,
    seo: {
      title: 'Bakuchiol vs Retinol: wat is het verschil? | MAUYI Journal',
      description: 'Bakuchiol of retinol — wat werkt beter voor jouw huid? We vergelijken werkzaamheid, irritatierisico en geschiktheid voor gevoelige huid. Met wetenschap.',
    },
    body: [
      {
        type: 'p',
        content: 'Bakuchiol duikt overal op. Serums, crèmes, toners — met de belofte dat het "hetzelfde doet als retinol, maar zonder de irritatie". Maar is dat echt zo? En als ze allebei werken, wanneer kies je dan voor wat?',
      },
      {
        type: 'h2',
        content: 'Wat doet retinol precies?',
      },
      {
        type: 'p',
        content: 'Retinol is een vitamine A-derivaat dat al decennia het meest onderzochte anti-aging ingrediënt in huidverzorging is. Het werkt via retinoïde-receptoren in de huid en versnelt celvernieuwing, stimuleert collageenproductie en vermindert de zichtbaarheid van fijne lijntjes, poriën en ongelijkmatige huidtoon.',
      },
      {
        type: 'p',
        content: 'Het nadeel: retinol kan in de beginperiode irritatie, roodheid en droogheid veroorzaken — zeker bij hogere concentraties of een onvoorbereide huid. Daardoor is het voor veel mensen, met name met een gevoelige huid, lastig om consistent te gebruiken.',
      },
      {
        type: 'h2',
        content: 'En bakuchiol?',
      },
      {
        type: 'p',
        content: 'Bakuchiol is een plantaardige verbinding uit het zaad van de Psoralea corylifolia-plant. Het heeft in klinische studies aangetoond dat het vergelijkbare genen activeert als retinol — maar via een ander mechanisme. Het bindt niet aan dezelfde retinoïde-receptoren, maar leidt wel tot vergelijkbare uitkomsten: minder fijne lijntjes, betere huidtextuur en evenredige huidtoon.',
      },
      {
        type: 'callout',
        content: 'In een gerandomiseerde dubbelblinde studie (British Journal of Dermatology, 2019) bleken bakuchiol (0.5%) en retinol (0.5%) vergelijkbaar effectief te zijn voor het verminderen van rimpels en huidverkleuring — maar bakuchiol veroorzaakte significant minder irritatie.',
      },
      {
        type: 'h2',
        content: 'Bakuchiol vs retinol: de directe vergelijking',
      },
      {
        type: 'ul',
        content: [
          'Werkzaamheid — vergelijkbaar bij lage concentraties; retinol wint bij hoge doses voor intensieve anti-aging',
          'Irritatierisico — bakuchiol aanzienlijk milder, retinol vaker oorzaak van roodheid en schilfering',
          'Geschiktheid gevoelige huid — bakuchiol breed inzetbaar; retinol vereist opbouw en buffering',
          'Gebruik overdag — bakuchiol kan overdag gebruikt worden; retinol alleen \'s avonds',
          'Zwangerschap — bakuchiol veilig bevonden; retinol officieel af te raden',
          'Snelheid — retinol werkt doorgaans sneller bij hogere doses; bakuchiol geleidelijker',
        ],
      },
      {
        type: 'h2',
        content: 'Wanneer kies je voor bakuchiol?',
      },
      {
        type: 'p',
        content: 'Bakuchiol is de betere keuze als je een gevoelige of reactieve huid hebt, als je net begint met anti-aging activen, of als je zwanger bent of borstvoeding geeft. Ook als je retinol al eerder hebt geprobeerd en te veel irritatie ervaarde, is bakuchiol een serieus alternatief — geen compromis.',
      },
      {
        type: 'h2',
        content: 'Wanneer kies je voor retinol?',
      },
      {
        type: 'p',
        content: 'Retinol heeft de langste onderzoeksgeschiedenis en de meeste klinische bewijslast achter zich. Voor intensieve celvernieuwing, duidelijk zichtbare fijne lijntjes of huidtextuurproblemen blijft retinol het effectiefst — zolang je het opbouwt in frequentie en begint met een lage concentratie.',
      },
      {
        type: 'h2',
        content: 'Of gebruik ze samen',
      },
      {
        type: 'p',
        content: 'De meest interessante ontwikkeling is de combinatie van beide. Bakuchiol is aangetoond de irritatie van retinol te verminderen wanneer ze samen worden gebruikt — het versterkt de retinol-activiteit terwijl het de drempelwaarde voor bijwerkingen verhoogt. Dat maakt een gebalanceerde formule met beide ingrediënten wetenschappelijk onderbouwder dan een keuze voor slechts één.',
      },
      {
        type: 'cta',
        content: 'Reset Serum combineert Retinol 0.3% met Bakuchiol 0.5% — precies om die reden. Effectief voor celvernieuwing, zonder de irritatie die retinol-beginners doorgaans tegenhouden.',
      },
      {
        type: 'h2',
        content: 'Conclusie',
      },
      {
        type: 'p',
        content: 'Bakuchiol is geen marketing. Het is een klinisch onderbouwd ingrediënt dat voor veel mensen beter werkt dan retinol alleen. De vraag is niet "wat is beter?" maar "wat past bij jouw huid en je doelen?" — en steeds vaker is het antwoord: allebei.',
      },
    ],
  },
  {
    slug: 'waarom-minder-beter-werkt',
    title: 'Waarom minder huidverzorging bijna altijd beter werkt',
    excerpt: 'De gemiddelde vrouw gebruikt 12 producten per dag. Dermatologen raden 3 à 4 aan. Wat doen de andere 8 eigenlijk met je huid?',
    category: 'Filosofie',
    readTime: '6 min',
    date: 'Mei 2026',
    dateISO: '2026-05-15',
    image: '/journal-featured.jpg',
    seo: {
      title: 'Waarom minder huidverzorging beter werkt | MAUYI Journal',
      description: 'De gemiddelde vrouw gebruikt 12 producten per dag. Dermatologen raden 3–4 aan. Wat doen de andere 8 eigenlijk met je huid?',
    },
    body: [
      { type: 'p', content: 'Dit artikel is binnenkort beschikbaar.' },
    ],
  },
  {
    slug: 'retinol-beginners-gids',
    title: 'Retinol voor beginners: wat je moet weten',
    excerpt: 'Hoe start je met retinol zonder irritatie? Alles wat je moet weten in één leesbare gids.',
    category: 'Ingrediënten',
    readTime: '5 min',
    date: 'April 2026',
    dateISO: '2026-04-10',
    image: '/reset-serum-new.jpg',
    seo: {
      title: 'Retinol voor beginners | MAUYI Journal',
      description: 'Hoe start je met retinol zonder irritatie? Alles over concentraties, frequentie en wat je wel en niet moet combineren.',
    },
    body: [
      { type: 'p', content: 'Dit artikel is binnenkort beschikbaar.' },
    ],
  },
  {
    slug: 'niacinamide-serum-gids',
    title: 'Niacinamide serum: wat het doet en waarom het in elke routine past',
    excerpt: 'Niacinamide is een van de meest veelzijdige ingrediënten in huidverzorging. Maar wat doet het precies, welke concentratie heb je nodig en combineert het goed met retinol?',
    category: 'Ingrediënten',
    readTime: '5 min',
    date: 'Juni 2026',
    dateISO: '2026-06-01',
    image: '/reset-serum-new.jpg',
    seo: {
      title: 'Niacinamide Serum: wat het doet en welke concentratie werkt | MAUYI Journal',
      description: 'Niacinamide 10% verkleint poriën, versterkt de huidbarrière en vermindert roodheid. Alles over dit multitasker-ingrediënt: werking, concentratie en combinaties.',
    },
    body: [
      {
        type: 'p',
        content: 'Niacinamide staat op vrijwel elk serum-etiket dat de afgelopen jaren is uitgebracht. En dat is niet zonder reden — het is een van de weinige ingrediënten die klinisch bewijs heeft voor meerdere huidproblemen tegelijk. Maar "niacinamide zit erin" zegt weinig als je niet weet wat het doet, hoeveel je nodig hebt en waarom het bijna altijd een slimme keuze is.',
      },
      {
        type: 'h2',
        content: 'Wat is niacinamide?',
      },
      {
        type: 'p',
        content: 'Niacinamide is de actieve vorm van vitamine B3 (niacine) en een in water oplosbare verbinding die direct door de huid wordt opgenomen. Het werkt op meerdere lagen tegelijk: het versterkt de huidbarrière, reguleert talgproductie, remt melanineoverdracht en heeft anti-inflammatoire eigenschappen.',
      },
      {
        type: 'p',
        content: 'Wat niacinamide onderscheidt van veel andere actieven is de brede inzetbaarheid: het werkt goed op droge huid, vette huid, gevoelige huid en gecombineerde huid — zonder dat je een inloopperiode nodig hebt.',
      },
      {
        type: 'h2',
        content: 'Wat doet een niacinamide serum voor je huid?',
      },
      {
        type: 'ul',
        content: [
          'Poriënverfijning — niacinamide reguleert talgproductie, waardoor poriën minder snel verstopt raken en zichtbaar kleiner lijken',
          'Huidbarrière versterken — het verhoogt de productie van ceramiden en huideiwitten die de barrièrefunctie ondersteunen',
          'Ongelijkmatige huidtoon egaliseren — remt melanineoverdracht van melanocyten naar huidcellen, waardoor pigmentvlekken en donkere kringen vervagen',
          'Roodheid en ontsteking verminderen — anti-inflammatoire werking maakt het geschikt bij acne, rosacea-geneigde huid en reactieve huid',
          'Fijne lijntjes — bij hogere concentraties (10%) zijn effecten op huidtextuur en fijne lijntjes klinisch aangetoond',
        ],
      },
      {
        type: 'h2',
        content: 'Welke concentratie werkt?',
      },
      {
        type: 'p',
        content: 'Het meeste onderzoek is gedaan op concentraties tussen 2% en 10%. Lage concentraties (2–4%) zijn effectief voor barrièreondersteuning en vochtretentie. Voor merkbare effecten op poriën, pigment en textuur zijn concentraties van 5% en hoger aan te raden. De bekende "10% concentratie" is de drempel waarbij effecten op fijne lijntjes en huidtoon consistent in studies worden gemeten.',
      },
      {
        type: 'callout',
        content: 'Hogere concentraties (>10%) geven niet per se betere resultaten. Boven de 10% neemt het risico op tijdelijke roodheid toe zonder extra bewezen voordeel. 10% niacinamide is de sweet spot die in de meeste klinische trials als effectief en veilig geldt.',
      },
      {
        type: 'h2',
        content: 'Combineert niacinamide met retinol?',
      },
      {
        type: 'p',
        content: 'Ja — en goed ook. Er was lange tijd de misvatting dat niacinamide en retinol niet gecombineerd mogen worden omdat ze een verbinding zouden vormen (nicotinezuur) die roodheid veroorzaakt. Dat klopt niet in de praktijk: deze reactie vereist hoge temperaturen en treedt niet op bij huidverzorgingsproducten. Integendeel — niacinamide vermindert de irritatie die retinol kan veroorzaken en beschermt de huidbarrière terwijl retinol celvernieuwing stimuleert.',
      },
      {
        type: 'p',
        content: 'De combinatie is daarmee niet alleen veilig, maar synergistisch: retinol pakt de structuur aan, niacinamide zorgt dat de huid de ingreep verdraagt.',
      },
      {
        type: 'h2',
        content: 'Voor welke huidtypen is niacinamide geschikt?',
      },
      {
        type: 'p',
        content: 'Niacinamide is een van de veiligste actieven in huidverzorging en geschikt voor vrijwel elk huidtype. Voor vette en acnegevoelige huid reguleert het talg en remt het ontstekingen. Voor droge en gevoelige huid ondersteunt het de barrière en houdt het vocht vast. Voor volwassen en aging huid verlaagt het de zichtbaarheid van pigmentvlekken en verfijnt het textuur. Er is geen inloopperiode vereist — je kunt het dagelijks toepassen, ook overdag.',
      },
      {
        type: 'h2',
        content: 'Hoe gebruik je een niacinamide serum correct?',
      },
      {
        type: 'ul',
        content: [
          'Volgorde — serum na toner, voor moisturizer; bij combinatie met retinol kun je ze samen \'s avonds gebruiken',
          'Frequentie — dagelijks, ochtend én avond is veilig en effectief',
          'Combinaties om te vermijden — niacinamide heeft geen problematische interacties met gangbare ingrediënten; veilig naast vitamine C, AHA/BHA, peptiden en SPF',
          'Verwachte resultaten — poriën en textuur na 4–6 weken, pigmentvlekken na 8–12 weken bij consequent gebruik',
        ],
      },
      {
        type: 'cta',
        content: 'Reset Serum bevat Niacinamide 10% — samen met Retinol 0.3% en Bakuchiol. Zo werkt barrièrebescherming en celvernieuwing tegelijk, in één parfumvrije formule voor de avond.',
      },
      {
        type: 'h2',
        content: 'Conclusie',
      },
      {
        type: 'p',
        content: 'Niacinamide is geen trend — het is een van de best onderbouwde ingrediënten in moderne huidverzorging. Het doet wat de meeste serums beloven: poriënverfijning, barrièreondersteuning, egalisatie en anti-aging in één formule. Als je maar één actief ingrediënt aan je routine toevoegt en je huid gevoelig of reactief is, is niacinamide de meest logische keuze.',
      },
    ],
  },
]

export function getAllPosts(): JournalPost[] {
  return POSTS
}

export function getPost(slug: string): JournalPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getFeaturedPost(): JournalPost {
  return POSTS.find((p) => p.featured) ?? POSTS[0]
}
