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
    readTime: '5 min',
    date: 'Mei 2026',
    dateISO: '2026-05-15',
    image: '/journal-featured.jpg',
    seo: {
      title: 'Waarom minder huidverzorging beter werkt | MAUYI Journal',
      description: 'De gemiddelde vrouw gebruikt 12 producten per dag. Dermatologen raden 3–4 aan. Wat doen de andere 8 eigenlijk met je huid? Een eerlijk antwoord.',
    },
    body: [
      {
        type: 'p',
        content: 'De gemiddelde vrouw gebruikt 12 huidverzorgingsproducten per dag. Dermatologen raden 3 à 4 aan. Ergens in dat verschil zit een industrie die er belang bij heeft dat jij meer koopt — en een huid die dat niet altijd waardeert.',
      },
      {
        type: 'h2',
        content: 'Wat te veel producten met je huid doen',
      },
      {
        type: 'p',
        content: 'De huid heeft een barrièrefunctie. Die barrière — het stratum corneum — is opgebouwd uit huidcellen, ceramiden en lipiden die vocht vasthouden en irritanten buiten houden. Elke extra laag product die je aanbrengt, verstoort die balans enigszins. Bij gezonde huid is dat geen probleem. Maar bij een stapeling van actieven, exfolianten, parfumstoffen en conserveermiddelen raakt de barrière overbelast.',
      },
      {
        type: 'p',
        content: 'Het resultaat: roodheid, uitdroging, gevoeligheid — symptomen die vaak worden toegeschreven aan "een slechte huid", terwijl de oorzaak juist te veel producten zijn.',
      },
      {
        type: 'callout',
        content: 'Dermatologen zien routinematig patiënten met "gevoelige huid" die na het simplificeren van hun routine binnen enkele weken verbeteren — zonder enige medische interventie.',
      },
      {
        type: 'h2',
        content: 'Het probleem met ingrediëntenconflicten',
      },
      {
        type: 'p',
        content: 'Niet alle actieve ingrediënten werken goed samen. Retinol en AHA\'s tegelijk vergroten de kans op irritatie. Vitamine C (L-ascorbinezuur) is instabiel bij een hogere pH, waardoor het zijn werking verliest als je het combineert met niacinamide in de verkeerde volgorde. Hoe meer producten je gebruikt, hoe groter de kans dat ingrediënten elkaars werking ondermijnen — of erger, irritatie versterken.',
      },
      {
        type: 'h2',
        content: 'Wat werkt dan wel?',
      },
      {
        type: 'ul',
        content: [
          'Reiniger — één milde cleanser, geen foaming agents die de barrière aantasten',
          'Actief serum — één serum met werkzame ingrediënten in de juiste concentratie',
          'Moisturizer — één vochtinbrenger die de barrière ondersteunt',
          'SPF overdag — dit is niet onderhandelbaar, maar ook niet meer dan dit',
        ],
      },
      {
        type: 'h2',
        content: 'Minder kopen is geen compromis',
      },
      {
        type: 'p',
        content: 'De logica van "meer is beter" klopt niet in huidverzorging. Een serum met Retinol 0.3%, Niacinamide 10% en Bakuchiol doet wat drie aparte producten beloven — zonder de interacties, zonder de overbelasting, en met minder kans op bijwerkingen. Dat is geen beperking. Dat is een betere formulering.',
      },
      {
        type: 'cta',
        content: 'Reset Serum is ontworpen om drie stappen te vervangen: celvernieuwing (retinol), barrièreondersteuning (niacinamide) en kalmering (bakuchiol) in één avondserum.',
      },
      {
        type: 'h2',
        content: 'Hoe je jouw routine simplificeert',
      },
      {
        type: 'p',
        content: 'Begin met weglaten, niet toevoegen. Verwijder alles wat parfum of alcohol bevat. Elimineer dubbele producten die hetzelfde doen. Houd alleen wat bewezen werkt en wat jij consistent gebruikt. Een eenvoudige routine die je elke avond uitvoert, overtreft altijd een complexe routine die je half vergeet.',
      },
    ],
  },
  {
    slug: 'retinol-beginners-gids',
    title: 'Retinol voor beginners: hoe je start zonder irritatie',
    excerpt: 'Hoe start je met retinol zonder irritatie? Alles over de juiste concentratie, opbouwschema en wat je wel en niet combineert.',
    category: 'Ingrediënten',
    readTime: '6 min',
    date: 'April 2026',
    dateISO: '2026-04-10',
    image: '/reset-serum-new.jpg',
    seo: {
      title: 'Retinol voor beginners: hoe start je zonder irritatie | MAUYI Journal',
      description: 'Alles wat je moet weten over retinol als beginner: welke concentratie, hoe je opbouwt, wat je niet combineert en wanneer je resultaat ziet.',
    },
    body: [
      {
        type: 'p',
        content: 'Retinol heeft een reputatie. "Mijn huid was rood en droog de eerste weken" — dat hoor je vaak. Maar die irritatie is bijna altijd vermijdbaar. Het probleem is niet retinol zelf, maar hoe mensen beginnen: te hoge concentratie, te vaak, te snel. Dit is een praktische gids om dat te voorkomen.',
      },
      {
        type: 'h2',
        content: 'Welke concentratie kies je als beginner?',
      },
      {
        type: 'p',
        content: 'Begin nooit boven de 0.3%. De meest gemaakte fout is starten met een 0.5% of 1% product, aangetrokken door "sterkere resultaten". In de praktijk leidt dit vaker tot een verstoorde huidbarrière dan tot snellere verbetering. Start met 0.1%–0.3% en geef je huid 8–12 weken om te wennen. Daarna kun je eventueel ophogen.',
      },
      {
        type: 'callout',
        content: 'Klinisch onderzoek laat zien dat 0.3% retinol bij consistent gebruik vergelijkbare resultaten geeft als hogere concentraties — met significant minder bijwerkingen. Het gaat om consistentie, niet om dosis.',
      },
      {
        type: 'h2',
        content: 'Hoe bouw je op?',
      },
      {
        type: 'ul',
        content: [
          'Week 1–2: 2 avonden per week, op droge huid na reinigen',
          'Week 3–4: 3 avonden per week als huid goed reageert',
          'Maand 2: om de avond (4–5x per week)',
          'Maand 3+: dagelijks gebruik als huid gewend is',
        ],
      },
      {
        type: 'h2',
        content: 'De buffermethode: minder irritatie, zelfde resultaat',
      },
      {
        type: 'p',
        content: 'Als je gevoelige huid hebt, gebruik de buffermethode: breng eerst een dunne laag moisturizer aan, dan het retinol serum. De moisturizer vertraagt de absorptie licht, waardoor de huid minder intensief reageert. Dit verlengt de inloopperiode niet — het maakt hem comfortabeler.',
      },
      {
        type: 'h2',
        content: 'Wat combineer je niet met retinol?',
      },
      {
        type: 'ul',
        content: [
          'AHA/BHA (glycolzuur, salicylzuur) — op dezelfde avond: te agressief samen',
          'Vitamine C (\'s avonds) — gebruik vitamine C \'s ochtends, retinol \'s avonds',
          'Benzoylperoxide — inactiveert retinol',
          'Andere retinol-producten — nooit stapelen',
        ],
      },
      {
        type: 'h2',
        content: 'Wat combineer je wél?',
      },
      {
        type: 'p',
        content: 'Niacinamide en bakuchiol zijn de beste combinatiepartners voor retinol. Niacinamide beschermt de huidbarrière en vermindert aantoonbaar de irritatie van retinol. Bakuchiol heeft een synergistisch effect: het versterkt de retinol-activiteit terwijl het het irritatierisico verlaagt. Een formule die alle drie combineert, is daarmee effectiever én tolereerder dan retinol alleen.',
      },
      {
        type: 'h2',
        content: 'Wanneer zie je resultaat?',
      },
      {
        type: 'ul',
        content: [
          '2–4 weken: huidtextuur gladder, poriën minder zichtbaar',
          '4–8 weken: huidtoon egaler, eerste verbetering in fijne lijntjes',
          '12 weken: significante verbetering in celvernieuwing en huidkwaliteit',
          '6 maanden+: langetermijneffecten op collageenproductie',
        ],
      },
      {
        type: 'cta',
        content: 'Reset Serum bevat Retinol 0.3% — de ideale beginconcentratie — samen met Niacinamide 10% en Bakuchiol 0.5% die de irritatie opvangen. Ontworpen voor een inloopperiode die soepel verloopt.',
      },
    ],
  },
  {
    slug: 'huidbarriere-herstellen',
    title: 'Huidbarrière herstellen: wat het is, hoe je het beschadigt en hoe je het repareert',
    excerpt: 'Een beschadigde huidbarrière is de meest onderschatte oorzaak van gevoelige huid. Herken de signalen en leer hoe je herstel versnelt.',
    category: 'Huidverzorging',
    readTime: '6 min',
    date: 'Mei 2026',
    dateISO: '2026-05-20',
    image: '/journal-barrier.jpg',
    seo: {
      title: 'Huidbarrière herstellen: oorzaken en oplossingen | MAUYI Journal',
      description: 'Beschadigde huidbarrière? Herken de signalen — roodheid, trekkerigheid, gevoeligheid — en leer welke ingrediënten herstel versnellen.',
    },
    body: [
      {
        type: 'p',
        content: 'Veel mensen leven jarenlang met een beschadigde huidbarrière zonder dat ze het weten. Roodheid, trekkerigheid, plots gevoelig worden voor producten die vroeger prima werkten — dit zijn geen willekeurige huidproblemen. Het zijn symptomen van een barrière die onder druk staat.',
      },
      {
        type: 'h2',
        content: 'Wat is de huidbarrière precies?',
      },
      {
        type: 'p',
        content: 'De huidbarrière is de buitenste laag van je huid: het stratum corneum. Dit bestaat uit afgestorven huidcellen (corneocyten) die als bakstenen in een matrix van ceramiden, vetzuren en cholesterol zitten. Samen vormen ze een fysieke afsluiting die vocht vasthoudt en irriterende stoffen, bacteriën en UV-straling buiten houdt.',
      },
      {
        type: 'p',
        content: 'Als die matrix beschadigd raakt — door te weinig ceramiden, verstoring van de pH-waarde of mechanische schade — verliest de huid vocht en worden externe irritanten makkelijker opgenomen. De huid reageert met ontstekingen, roodheid en verhoogde gevoeligheid.',
      },
      {
        type: 'h2',
        content: 'Signalen van een beschadigde huidbarrière',
      },
      {
        type: 'ul',
        content: [
          'Trekkerigheid of strakheid na het reinigen',
          'Roodheid of irritatie na producten die vroeger goed werkten',
          'Droogheid die niet reageert op extra moisturizer',
          'Brandend of prikkelend gevoel bij waterig producten',
          'Huid die "alles absorbeert" maar droog blijft',
          'Acne of mee-eters die plots erger worden',
        ],
      },
      {
        type: 'h2',
        content: 'Wat beschadigt de huidbarrière?',
      },
      {
        type: 'ul',
        content: [
          'Over-exfoliëren — meer dan 2–3x per week AHA/BHA verwijdert ook gezonde huidcellen',
          'Agressieve reinigers met sulfaten — schuimende cleansers breken de lipidenlaag af',
          'Te heet water — heet water lost ceramiden en huidoliën op',
          'Te veel actieve ingrediënten tegelijk — gestapelde actieven overbelasten de barrière',
          'Parfum en alcohol in skincare — directe irritanten die de barrière aantasten',
          'Omgevingsfactoren — droge lucht, airconditioning, harde wind',
        ],
      },
      {
        type: 'callout',
        content: 'De meest voorkomende oorzaak van een beschadigde huidbarrière is paradoxaal: te veel huidverzorging. Over-exfoliëren en te veel actieven stapelen tast de beschermende laag aan die je juist probeert te verbeteren.',
      },
      {
        type: 'h2',
        content: 'Hoe herstel je de huidbarrière?',
      },
      {
        type: 'p',
        content: 'Herstel begint met stoppen. Verwijder alle exfolianten, retinol, vitamine C en andere actieven voor 1–2 weken. Gebruik alleen een milde cleanser, een ceramide-rijke moisturizer en SPF overdag. Geef de barrière de kans om zichzelf te herstellen — dat doet hij als je hem niet verder belast.',
      },
      {
        type: 'h2',
        content: 'Welke ingrediënten versnellen herstel?',
      },
      {
        type: 'ul',
        content: [
          'Ceramiden — vullen de gaten in de lipidenmatrix op, de meest directe barrièreversterker',
          'Niacinamide — verhoogt de aanmaak van ceramiden en huideiwitten, vermindert vochtverlies',
          'Panthenol (vitamine B5) — trekt vocht aan en kalmeert ontstoken huid',
          'Bakuchiol — anti-inflammatoir, kalmeert de huid terwijl het barrièreherstel ondersteunt',
          'Hyaluronzuur — bindt vocht in de huid, verlaagt transepidermaal vochtverlies',
          'Shea butter en squalaan — versterken de lipidematrix aan de buitenkant',
        ],
      },
      {
        type: 'h2',
        content: 'Wanneer kun je actieven hervatten?',
      },
      {
        type: 'p',
        content: 'Wacht tot de huid geen trekkerigheid of roodheid meer vertoont na reinigen. Begin daarna opnieuw met één actief tegelijk, in een lage concentratie, 2–3x per week. Start met niacinamide — dat is het veiligst voor een herstellende barrière. Retinol kan daarna worden toegevoegd, gebufferd door de niacinamide die de irritatie opvangt.',
      },
      {
        type: 'cta',
        content: 'Reset Serum combineert Niacinamide 10% met Bakuchiol en Retinol 0.3% — precies de combinatie die celvernieuwing stimuleert terwijl de barrière beschermd blijft. Geschikt ook voor huid in herstelperiode.',
      },
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
  {
    slug: 'vitamine-c-serum-gids',
    title: 'Vitamine C serum: wat het doet, welke vorm werkt en hoe je het gebruikt',
    excerpt: 'Vitamine C serum staat in elke skincare-routine. Maar welke vorm werkt het beste, welke concentratie heb je nodig en waarom kun je het beter \'s ochtends gebruiken?',
    category: 'Ingrediënten',
    readTime: '6 min',
    date: 'Juni 2026',
    dateISO: '2026-06-05',
    image: '/reset-serum-new.jpg',
    seo: {
      title: 'Vitamine C Serum: werking, concentratie en gebruik | MAUYI Journal',
      description: 'Vitamine C serum verkleint poriën, egalisert huidtoon en beschermt tegen vrije radicalen. Welke vorm werkt het beste en wat is de juiste concentratie?',
    },
    body: [
      {
        type: 'p',
        content: 'Vitamine C is een van de meest gebruikte actieve ingrediënten in skincare — en tegelijk een van de meest misverstane. Er zijn tientallen vormen, concentraties variëren van 5% tot 30%, en de werking hangt sterk af van de formulering. Dit is wat je moet weten.',
      },
      {
        type: 'h2',
        content: 'Wat doet vitamine C voor je huid?',
      },
      {
        type: 'ul',
        content: [
          'Antioxidantbescherming — neutraliseert vrije radicalen veroorzaakt door UV-straling en luchtvervuiling',
          'Collageen stimuleren — vitamine C is een cofactor voor collageen synthese, waardoor huid steviger wordt',
          'Pigmentvlekken verminderen — remt melanineproductie, waardoor zonnevlekken en donkere kringen vervagen',
          'Huidtoon egaliseren — verbetert de algehele luminantie en egaalheid van de huid',
          'SPF versterken — vitamine C versterkt de bescherming van zonnebrand wanneer samen gebruikt',
        ],
      },
      {
        type: 'h2',
        content: 'Welke vorm van vitamine C werkt het beste?',
      },
      {
        type: 'p',
        content: 'L-ascorbinezuur is de meest bestudeerde en krachtigste vorm van vitamine C. Het penetreert diep in de huid en heeft de meeste klinische bewijslast. Het nadeel: L-ascorbinezuur is onstabiel en oxideert snel bij blootstelling aan lucht en licht — een geel of oranje serum is een teken van oxidatie en verlies van werkzaamheid.',
      },
      {
        type: 'p',
        content: 'Stabielere derivaten zoals ascorbyl glucoside, sodium ascorbyl phosphate en tetrahexyldecyl ascorbate zijn minder krachtig maar oxideren minder snel. Voor gevoelige huid zijn deze derivaten doorgaans beter te verdragen. Ze vereisen wel een hogere concentratie voor vergelijkbaar effect.',
      },
      {
        type: 'callout',
        content: 'L-ascorbinezuur is het meest effectief bij een concentratie van 10–20% en een pH onder 3.5. Boven 20% neemt de effectiviteit niet toe, maar stijgt het irritatierisico aanzienlijk.',
      },
      {
        type: 'h2',
        content: 'Ochtend of avond?',
      },
      {
        type: 'p',
        content: 'Vitamine C gebruik je het beste \'s ochtends. Het werkt overdag als antioxidant die je huid beschermt tegen UV-schade en vervuiling. Gecombineerd met SPF versterken ze elkaars beschermende werking. \'s Avonds is er minder reden voor gebruik — dan is de antioxidantfunctie minder relevant, terwijl andere actieven zoals retinol overneemen.',
      },
      {
        type: 'h2',
        content: 'Vitamine C en retinol: wel of niet combineren?',
      },
      {
        type: 'p',
        content: 'De klassieke aanpak: vitamine C \'s ochtends, retinol \'s avonds. Niet omdat ze slecht samenwerken, maar omdat ze elk op een ander moment het meest effectief zijn. Vitamine C beschermt overdag, retinol vernieuwt \'s nachts. Samen geven ze coverage over de hele dag.',
      },
      {
        type: 'h2',
        content: 'Wat te doen als je huid reageert?',
      },
      {
        type: 'p',
        content: 'L-ascorbinezuur kan bij gevoelige huid tintelingen veroorzaken, zeker in hogere concentraties. Begin dan met een lagere concentratie (5–10%) of kies voor een stabieler derivaat. Als je huid barrièreproblemen heeft, introduceer vitamine C pas nadat de barrière hersteld is.',
      },
      {
        type: 'h2',
        content: 'Hoe bewaar je vitamine C serum?',
      },
      {
        type: 'ul',
        content: [
          'Donker en koel bewaren — in de koelkast of een donkere lade verlengt de houdbaarheid',
          'Luchtdichte verpakking — pompflacons of airless packaging voorkomen oxidatie',
          'Kleur controleren — lichtgeel is normaal, donkergeel of oranje = geoxideerd, gooi het weg',
          'Na opening: gebruik binnen 3 maanden voor optimale werking',
        ],
      },
      {
        type: 'cta',
        content: 'MAUYI Reset Serum bevat Niacinamide 10% — een stabiele antioxidant die overdag én \'s avonds de huidbarrière versterkt. Combineer het \'s ochtends met vitamine C voor maximale bescherming.',
      },
    ],
  },
  {
    slug: 'hyaluronzuur-serum-gids',
    title: 'Hyaluronzuur serum: werking, molecuulgewicht en wanneer het écht helpt',
    excerpt: 'Hyaluronzuur staat in bijna elk vochtinbrengend serum. Maar hoe werkt het, maakt molecuulgewicht uit en bij welke huidtypen helpt het het meest?',
    category: 'Ingrediënten',
    readTime: '5 min',
    date: 'Juni 2026',
    dateISO: '2026-06-08',
    image: '/journal-barrier.jpg',
    seo: {
      title: 'Hyaluronzuur Serum: werking, molecuulgewicht en gebruik | MAUYI Journal',
      description: 'Hyaluronzuur bindt tot 1000x zijn eigen gewicht aan vocht. Maar maakt molecuulgewicht uit? En wanneer helpt het serum écht voor jouw huid?',
    },
    body: [
      {
        type: 'p',
        content: 'Hyaluronzuur is het ingrediënt dat in vrijwel elk vochtinbrengend serum, crème of toner staat. Het wordt aangeprezen als "supervochtig", "plumpend" en "jeugdverlengende". Maar wat doet het werkelijk, en wanneer heeft een hyaluronzuur serum écht zin?',
      },
      {
        type: 'h2',
        content: 'Wat is hyaluronzuur?',
      },
      {
        type: 'p',
        content: 'Hyaluronzuur (hyaluronic acid, HA) is een glycosaminoglycaan — een suikermolecuul dat van nature in je huid, gewrichten en ogen voorkomt. In de huid zit het in de dermis, waar het vocht aantrekt en vasthoudt. Eén gram hyaluronzuur kan tot 6 liter water binden, wat het een uitzonderlijk krachtige vochtbinder maakt.',
      },
      {
        type: 'p',
        content: 'Naarmate je ouder wordt, neemt de hoeveelheid hyaluronzuur in de huid af — samen met collageen en elastine. Dat is een van de redenen waarom huid droger en minder veerkrachtig wordt.',
      },
      {
        type: 'h2',
        content: 'Maakt molecuulgewicht uit?',
      },
      {
        type: 'p',
        content: 'Ja, en het is een van de meest onderschatte aspecten van hyaluronzuur serums. Molecuulgewicht bepaalt hoe diep het ingrediënt in de huid doordringt:',
      },
      {
        type: 'ul',
        content: [
          'Hoog molecuulgewicht (>1000 kDa) — blijft op de huid, vormt een vochtfilm op de oppervlakte, geeft direct "plump" effect maar dringt niet diep door',
          'Medium molecuulgewicht (50–500 kDa) — dringt door tot het bovenste deel van de dermis',
          'Laag molecuulgewicht (<50 kDa) — penetreert dieper, stimuleert collageen, maar kan bij beschadigde huid inflammatoir werken',
          'Nano HA (<10 kDa) — diepste penetratie, meest effectief voor langetermijn hydratatie',
        ],
      },
      {
        type: 'callout',
        content: 'De beste hyaluronzuur serums combineren meerdere molecuulgewichten voor hydratatie op alle niveaus: oppervlakkig voor direct effect, diep voor langdurige vochtretentie.',
      },
      {
        type: 'h2',
        content: 'Wanneer helpt een hyaluronzuur serum écht?',
      },
      {
        type: 'p',
        content: 'Hyaluronzuur werkt het beste in een vochtige omgeving. Het trekt water aan vanuit de omgeving — maar als de lucht erg droog is (airconditioned ruimtes, winterlucht), kan het water juist aan de huid onttrekken als er geen afsluitmiddel bovenop zit. Aanbrengen op vochtige huid en daarna afsluiten met een ceramide-rijke moisturizer is de effectiefste manier.',
      },
      {
        type: 'h2',
        content: 'Voor welke huidtypen is het geschikt?',
      },
      {
        type: 'p',
        content: 'Hyaluronzuur is universeel toepasbaar en heeft nauwelijks contra-indicaties. Het is de basis van een goede vochthuishouding voor elk huidtype. Voor droge en gevoelige huid is het een essentieel onderdeel van de routine. Voor vette huid biedt het hydratatie zonder dat het poriën verstopt. Voor aging skin ondersteunt het de plompheid en veerkracht die verloren gaan.',
      },
      {
        type: 'h2',
        content: 'Hoe gebruik je het correct?',
      },
      {
        type: 'ul',
        content: [
          'Aanbrengen na reinigen, op licht vochtige huid',
          'Daarna afsluiten met moisturizer — niet weglaten, anders werkt HA averechts in droge lucht',
          'Ochtend én avond te gebruiken',
          'Combineer met niacinamide voor betere barrièreondersteuning',
          'Niet combineren met zeer lage pH-producten (zoals hoge L-ascorbinezuur) — wacht dan 15–20 minuten',
        ],
      },
      {
        type: 'cta',
        content: 'MAUYI Reset Serum bevat Niacinamide 10%, dat de ceramideproductie stimuleert en vochtverlies vermindert — een fundamentelere aanpak dan oppervlakkige hydratatie. Combineer met een hyaluronzuur toner voor maximale vochthuishouding.',
      },
      {
        type: 'h2',
        content: 'Conclusie',
      },
      {
        type: 'p',
        content: 'Hyaluronzuur werkt — maar alleen als je de juiste formulering kiest en het correct gebruikt. Let op molecuulgewichten, breng het aan op vochtige huid en sluit altijd af. Dan is het een van de beste vochtbinders in skincare.',
      },
    ],
  },
  {
    slug: 'huidverzorging-routine-ochtend-avond',
    title: 'Skincare routine opbouwen: de juiste volgorde voor ochtend en avond',
    excerpt: 'Welke producten in welke volgorde? Een duidelijke gids voor een effectieve skincare routine — zowel \'s ochtends als \'s avonds — zonder onnodige stappen.',
    category: 'Huidverzorging',
    readTime: '7 min',
    date: 'Juni 2026',
    dateISO: '2026-06-10',
    image: '/journal-featured.jpg',
    seo: {
      title: 'Skincare Routine Opbouwen: volgorde ochtend en avond | MAUYI Journal',
      description: 'De juiste volgorde voor een skincare routine: van reiniger tot SPF. Welke producten in welke stap, en wat is het verschil tussen ochtend en avond?',
    },
    body: [
      {
        type: 'p',
        content: 'Een goede huidverzorgingsroutine hoeft niet ingewikkeld te zijn. De volgorde maakt echter veel uit — producten die in de verkeerde volgorde worden aangebracht, kunnen elkaars werking blokkeren of irritatie veroorzaken. Dit is een praktische gids voor een effectieve routine, ochtend én avond.',
      },
      {
        type: 'h2',
        content: 'De ochtend skincare routine',
      },
      {
        type: 'p',
        content: 'De ochtend routine is gericht op beschermen. Je huid heeft \'s nachts gewerkt aan herstel — de ochtend is het moment om die huid te ondersteunen en klaar te maken voor de dag.',
      },
      {
        type: 'ul',
        content: [
          'Stap 1: Reinigen — gebruik \'s ochtends een milde reiniger of gewoon water als je huid niet vet aanvoelt. Agressief reinigen verwijdert de beschermende oliën die \'s nachts zijn opgebouwd.',
          'Stap 2: Toner of essence (optioneel) — hyaluronzuur toner op vochtige huid voor extra hydratatie.',
          'Stap 3: Vitamine C serum — antioxidant bescherming overdag, stimuleert collageen. Laat 1–2 minuten intrekken.',
          'Stap 4: Moisturizer — sluit vocht in en versterkt de barrière.',
          'Stap 5: SPF — verplicht, altijd. Factor 30 als minimum, factor 50 als ideaal. Geen gezichtscrème vervangt SPF.',
        ],
      },
      {
        type: 'callout',
        content: 'SPF is het meest impactvolle anti-aging product dat bestaat. UV-straling is verantwoordelijk voor 80–90% van zichtbare veroudering. Geen serum compenseert het weglaten van SPF.',
      },
      {
        type: 'h2',
        content: 'De avond skincare routine',
      },
      {
        type: 'p',
        content: '\'s Avonds is de huid in herstelmode. Celvernieuwing is \'s nachts verhoogd, wat de avond het ideale moment maakt voor actieve ingrediënten zoals retinol.',
      },
      {
        type: 'ul',
        content: [
          'Stap 1: Make-up verwijderen — gebruik micellair water of een olie-based cleanser als eerste stap.',
          'Stap 2: Reinigen — een milde cleanser om alle residuen te verwijderen. Dit is de dubbele reiniging (double cleanse).',
          'Stap 3: Toner (optioneel) — bereid de huid voor op actieve ingrediënten.',
          'Stap 4: Actief serum — retinol, niacinamide of andere actieven. Gebruik op droge huid voor maximale absorptie.',
          'Stap 5: Moisturizer — sluit alles af en ondersteunt de barrière tijdens de herstelperiode.',
          'Stap 6: Facial oil (optioneel) — een olie bovenop de moisturizer voor extra voeding bij droge huid.',
        ],
      },
      {
        type: 'h2',
        content: 'De regel voor volgorde: dun naar dik',
      },
      {
        type: 'p',
        content: 'De basisregel voor het aanbrengen van skincare producten: altijd van dun naar dik, en van waterig naar vettig. Dit zorgt ervoor dat lichte producten kunnen penetreren voordat dikkere producten de huid afsluiten. Een serum gaat altijd voor een crème, en een olie altijd als laatste stap.',
      },
      {
        type: 'h2',
        content: 'Wat mag je niet stapelen?',
      },
      {
        type: 'ul',
        content: [
          'Retinol + AHA/BHA op dezelfde avond — te agressief voor de huidbarrière',
          'Vitamine C (L-ascorbinezuur) + niacinamide direct na elkaar bij lage pH — laat 15 minuten wachten',
          'Retinol overdag — retinol breekt af onder UV-straling en verhoogt fotogevoeligheid',
          'Twee exfolianten tegelijk — kies één en gebruik wisselend',
        ],
      },
      {
        type: 'h2',
        content: 'Hoeveel stappen heb je echt nodig?',
      },
      {
        type: 'p',
        content: 'Veel minder dan je denkt. Een effectieve routine kan bestaan uit drie stappen: reinigen, actief serum en SPF (ochtend) of moisturizer (avond). Meer producten betekenen niet betere resultaten — het verhoogt het risico op ingrediëntenconflicten en irritatie. Begin met het minimum en voeg alleen toe wat bewezen effect heeft.',
      },
      {
        type: 'cta',
        content: 'Reset Serum vervangt drie aparte stappen: celvernieuwing (retinol 0.3%), barrièreondersteuning (niacinamide 10%) en kalmering (bakuchiol 0.5%) in één avondserum. Eenvoudiger en effectiever dan een complexe meerstaps routine.',
      },
    ],
  },
  {
    slug: 'porieen-verkleinen-tips',
    title: 'Poriën verkleinen: wat echt werkt (en wat niet)',
    excerpt: 'Poriën kun je niet "sluiten" — maar je kunt ze minder zichtbaar maken. Wat werkt wetenschappelijk gezien, en wat is marketing?',
    category: 'Huidverzorging',
    readTime: '5 min',
    date: 'Juni 2026',
    dateISO: '2026-06-12',
    image: '/reset-serum-new.jpg',
    seo: {
      title: 'Poriën Verkleinen: wat werkt en wat niet | MAUYI Journal',
      description: 'Poriën kun je niet "sluiten", maar wel minder zichtbaar maken. Welke ingrediënten werken echt en welke claims zijn marketing? De wetenschap.',
    },
    body: [
      {
        type: 'p',
        content: 'Poriën verkleinen is een van de meest gezochte skincare-doelen. En tegelijk een van de meest misleidende marketingclaims. De waarheid is simpel maar zelden gezegd: poriën hebben geen spieren en kunnen niet "openen" of "sluiten". Maar je kunt ze aanzienlijk minder zichtbaar maken — als je weet wat er wetenschappelijk gezien werkt.',
      },
      {
        type: 'h2',
        content: 'Waarom zijn poriën zichtbaar?',
      },
      {
        type: 'p',
        content: 'Poriën zijn de openingen van talgklieren en haarzakjes. Ze worden zichtbaarder door vier factoren: overmatige talgproductie (poriën raken verstopt en zetten uit), verlies van elasticiteit (huid die minder strak is laat poriën wijder lijken), ophoping van dode huidcellen (vergroot de opening optisch), en genetica (poriegrootte is grotendeels erfelijk bepaald).',
      },
      {
        type: 'h2',
        content: 'Wat werkt echt?',
      },
      {
        type: 'ul',
        content: [
          'Niacinamide (5–10%) — reguleert talgproductie, vermindert aantoonbaar de zichtbaarheid van poriën na 4–8 weken bij consistent gebruik',
          'Retinol — verhoogt celvernieuwing, vermindert ophoping van dode huidcellen die poriën vergroten en stimuleert collageen voor betere huidspanning',
          'Salicylzuur (BHA) — lost in vet op en reinigt de porie van binnenuit, effectief bij verstopte poriën en blackheads',
          'Glycolzuur (AHA) — exfolieert dode huidcellen op de oppervlakte, maakt poriën optisch kleiner',
          'SPF — UV-schade tast collageen aan, waardoor poriën wijder worden. Dagelijkse SPF is preventief het meest effectief',
        ],
      },
      {
        type: 'callout',
        content: 'In een klinische studie (Journal of Cosmetic Dermatology, 2017) reduceerde 5% niacinamide de zichtbaarheid van poriën significant na 12 weken — vergelijkbaar met tretinoine, maar zonder de bijwerkingen.',
      },
      {
        type: 'h2',
        content: 'Wat werkt niet?',
      },
      {
        type: 'ul',
        content: [
          'Stoom — opent geen poriën, verhoogt alleen bloedcirculatie',
          'Koud water — "sluit" geen poriën, heeft geen permanent effect',
          'Porie-strips — verwijderen de bovenste laag van blackheads maar niet de oorzaak; poriën raken snel opnieuw verstopt',
          'Bicarbonat scrubs — te agressief voor pH van de huid, beschadigt de barrière',
          '"Porie-minimizer" primers — verbergen poriën optisch maar hebben geen effect op de eigenlijke grootte',
        ],
      },
      {
        type: 'h2',
        content: 'Wat heeft invloed op poriën die je niet kunt veranderen?',
      },
      {
        type: 'p',
        content: 'Genetica speelt de grootste rol in poriegrootte. Als jouw ouders grote poriën hebben, is de kans groot dat jij ze ook hebt — en dat is oké. Het doel van skincare is niet het elimineren van poriën (dat kan niet), maar het optimaliseren van je huid binnen jouw genetische bandbreedte.',
      },
      {
        type: 'h2',
        content: 'De meest effectieve aanpak',
      },
      {
        type: 'p',
        content: 'Combineer niacinamide met retinol: niacinamide reguleert talg en vermindert direct de poriézichtbaarheid, retinol verhoogt celvernieuwing en stimuleert collageen voor een strakker "omhulsel" rondom de porie. Beide ingrediënten versterken elkaars werking zonder conflicten.',
      },
      {
        type: 'cta',
        content: 'Reset Serum combineert Niacinamide 10% met Retinol 0.3% — de twee effectiefste ingrediënten voor poriënverfijning in één parfumvrije avondformule. Verwacht na 4–6 weken zichtbaar verschil.',
      },
      {
        type: 'h2',
        content: 'Tijdlijn',
      },
      {
        type: 'ul',
        content: [
          '2–4 weken: talgproductie meer in balans, huid minder glanzend',
          '4–8 weken: poriën zichtbaar verfijnd door niacinamide en exfoliatie',
          '8–12 weken: collageen opbouw door retinol zorgt voor betere huidspanning rondom poriën',
          '6 maanden+: consistente verbetering; huidtextuur gladder en meer egaal',
        ],
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
