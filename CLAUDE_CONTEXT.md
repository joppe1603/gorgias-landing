# LUMÉ — Claude Context File
_Bijgewerkt: mei 2026. Gebruik dit bestand om de context te herstellen in een nieuwe sessie._

---

## Project Overview

**Naam**: LUMÉ Skincare
**Repo**: `gorgias-landing` op GitHub (`joppe1603/gorgias-landing`)
**Pad**: `/Users/joppe/Desktop/gorgias-landing`
**Framework**: Next.js 14 App Router + TypeScript
**Styling**: Tailwind CSS v3 + custom utilities in `globals.css`
**Animaties**: Framer Motion v11
**Taal**: Nederlands (alle UI copy)
**Git branch**: `main`

---

## Tech Stack

| Package | Versie |
|---|---|
| next | 14.2.4 |
| react / react-dom | ^18 |
| framer-motion | ^11.2.10 |
| typescript | ^5 |
| tailwindcss | ^3.4.1 |

**Fonts** (Google Fonts via `next/font`):
- `--font-inter` → body, labels, numbers
- `--font-cormorant` → headings, quotes, serifs

---

## Design System

### Kleuren
```
--gold:        #C9A96E   (primaire accent)
--gold-dark:   #B8935A   (hover state)
--gold-light:  #E8C98A   (lichte variant)
--cream:       #FAF8F5   (lichte achtergrond)
--cream-deep:  #F0EBE1
--ink:         #1A1A1A   (primaire tekst)
--muted:       #6B6560   (body tekst)
--surface:     #FDFCFA
--border:      #EAE5DE
--dark:        #0F0E0C   (donkere secties)
#9A9590                  (placeholder / subtekst)
#5C5754                  (body tekst licht)
```

### CSS Utilities (globals.css)
- `.btn-gold` — gouden CTA knop
- `.btn-outline` — border knop
- `.section-label` — klein uppercase label (10px, tracking 0.2em)
- `.gradient-text` — goud gradient tekst
- `.dot-pattern` — subtiel stip patroon
- `.card-hover` — hover lift effect
- `.journal-card` — border kaart
- `.ingredient-pill` — kleine pill badge
- `.divider-gold` / `.divider-stone` — horizontale dividers
- `.img-editorial` — `filter: saturate(0.88) contrast(1.03) brightness(0.97)` (film look)
- `.scrollbar-hide` — verbergt scrollbar (voor mobile gallery)
- `.animate-marquee` — oneindige marquee animatie
- `.hero-blob` — animated radial gradient blob
- `.feature-card-glow` — hover glow op kaarten
- `body::after` — globale film grain overlay (opacity 0.028)

### Framer Motion Patronen
```ts
// fadeUp helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

// Spring animaties (slide cart)
{ type: 'spring', damping: 30, stiffness: 340, mass: 0.9 }

// Parallax (PDPHero desktop)
useScroll({ target: ref, offset: ['start start', 'end start'] })
useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
```

---

## Bestandsstructuur

```
gorgias-landing/
├── app/
│   ├── layout.tsx                    # Root layout + fonts + JSON-LD schema
│   ├── globals.css                   # Design system + custom utilities
│   ├── page.tsx                      # Homepage
│   ├── robots.ts                     # Robots.txt
│   ├── sitemap.ts                    # Sitemap
│   ├── shop/page.tsx
│   ├── philosophy/page.tsx
│   ├── routine/page.tsx
│   ├── journal/page.tsx
│   ├── faq/page.tsx
│   ├── ingredients/page.tsx
│   ├── community/page.tsx
│   └── products/[slug]/
│       ├── page.tsx                  # PDP - 8 secties
│       ├── PDPHero.tsx               # Hero + mobile gallery + cart CTA
│       ├── PDPTextureGallery.tsx     # Donkere texture beeldengrid
│       ├── PDPRoutineContext.tsx     # Routine stap + pairing chips
│       ├── IngredientsAccordion.tsx  # Expandable ingrediënten lijst
│       └── StickyProductBar.tsx     # Sticky onderste balk
├── components/
│   ├── Navbar.tsx                    # Mega menu + mobiel menu + cart icon
│   ├── SlideCart.tsx                 # Slide-out winkelwagen paneel
│   ├── Providers.tsx                 # 'use client' wrapper voor CartProvider
│   ├── Footer.tsx
│   ├── SiteChrome.tsx
│   ├── Hero.tsx                      # Homepage hero
│   ├── TrustStrip.tsx
│   ├── FeaturedProducts.tsx
│   ├── RoutinePreview.tsx
│   ├── UGCReviews.tsx
│   ├── PhilosophyPreview.tsx
│   ├── ClosingCTA.tsx
│   ├── ShopPage.tsx
│   ├── PhilosophyPageContent.tsx
│   ├── RoutineBuilderPage.tsx
│   ├── JournalPageContent.tsx
│   ├── FAQPageContent.tsx
│   ├── IngredientsPageContent.tsx
│   ├── CommunityPageContent.tsx
│   ├── Features.tsx
│   ├── Reviews.tsx
│   ├── Routine.tsx
│   ├── BeforeAfter.tsx
│   ├── BrandManifest.tsx
│   ├── LogoCarousel.tsx
│   ├── NewsletterPopup.tsx
│   ├── PageEntrance.tsx
│   ├── Pricing.tsx
│   ├── SkincareQuiz.tsx
│   ├── SocialProof.tsx
│   ├── WhatWeLeaveOut.tsx
│   └── FAQ.tsx
├── contexts/
│   └── CartContext.tsx               # useReducer cart state
├── lib/
│   └── products.ts                  # Product type + alle productdata
└── CLAUDE_CONTEXT.md               # Dit bestand
```

---

## Data Layer — lib/products.ts

### Product Type
```ts
type Ingredient = { name: string; pct?: string; benefit: string }
type ProductReview = { quote: string; author: string; location: string; skinType: string; weeks: number; rating: number; initials: string; color: string }
type Benefit = { icon: string; title: string; desc: string }

type Product = {
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
  // Uitgebreid in evolutie fase:
  emotion?: string        // Merkstandpunt, italic quote op hero
  textureNote?: string    // Textuur beschrijving
  textureImages?: string[] // Extra afbeeldingen voor gallery
  routineContext?: {
    time: string          // bijv. 'Avond'
    step: number          // bijv. 2
    note: string          // gebruiksnotitie
    pairingNote: string   // 'Combineer met...'
  }
}
```

### Producten (7 stuks)

| Slug | Naam | Prijs | Badge | Reviews |
|---|---|---|---|---|
| `quiet-cleanser` | Quiet Cleanser | €38 | Stap 01 | 4.9 (6.800) |
| `reset-serum` | Reset Serum | €58 | Bestseller | 4.9 (12.400) |
| `soft-barrier-cream` | Soft Barrier Cream | €48 | Stap 03 | 4.8 (5.200) |
| `overnight-renewal-oil` | Overnight Renewal Oil | €52 | Nacht | 4.8 (3.800) |
| `radiance-serum` | Radiance Serum | €58 | Bestseller | 4.9 (12.400) |
| `the-glow-ritual` | The Glow Ritual | €129 (was €174) | Beste Waarde | 4.9 (8.700) |
| `sensitive-skin-edit` | Sensitive Skin Edit | €89 | Zachte Formule | 4.8 (4.200) |

**Helper functies**:
- `getAllProducts()` → Product[]
- `getProduct(slug)` → Product | undefined
- `getRelatedProducts(slugs)` → Product[]

---

## Cart Systeem

### CartContext (contexts/CartContext.tsx)
```ts
type CartItem = { slug: string; name: string; price: number; image: string; size: string; quantity: number }
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }           // slug
  | { type: 'UPDATE_QTY'; payload: { slug: string; qty: number } }
  | { type: 'OPEN' } | { type: 'CLOSE' } | { type: 'TOGGLE' }

// useCart() hook geeft terug:
{ state, dispatch, total, itemCount }
```

**Gedrag**:
- `ADD_ITEM` → auto-opent cart, verhoogt quantity als slug al bestaat
- `UPDATE_QTY` met qty ≤ 0 → verwijdert item
- Gratis verzending drempel: **€75**

### Providers.tsx
```tsx
'use client'
// Wraps CartProvider + rendert SlideCart globaal
// Nodig omdat layout.tsx een Server Component is
```

### SlideCart.tsx
- Slide-in paneel van rechts (max-w 420px)
- Spring animatie: `damping:30, stiffness:340`
- Backdrop blur overlay
- Body scroll lock tijdens open
- Gratis verzending progress bar (€75 drempel)
- Routine suggestie: eerste van [quiet-cleanser, reset-serum, soft-barrier-cream] die niet in cart zit
- Lege staat met bag icon + "Bekijk producten" CTA
- Verzendkosten: €4.99 of gratis boven €75

---

## Navbar (components/Navbar.tsx)
- Vaste header met aankondigingsbalk bovenaan
- Scroll detectie: achtergrond verandert na 20px scrollY
- Desktop: mega dropdown voor Shop (3 kolommen)
- Mobiel: burger menu met geanimeerde open/sluit
- Links: Shop, Routine, Philosophie, Ingrediënten, Journal, Community
- Cart icoon met geanimeerde badge (item count)
- Actieve link highlight in goud (#C9A96E)

---

## Product Detail Page (PDP)

### Structuur (app/products/[slug]/page.tsx)
8 secties in volgorde:
1. **Breadcrumb** — Home › Shop › [naam]
2. **PDPHero** — image + productinfo + cart CTAs
3. **Manifesto** — grote Cormorant quote + longDescription
4. **PDPTextureGallery** — donkere asymmetrische beeldengrid
5. **IngredientsAccordion** — uitklapbare ingrediënten
6. **How-to-use** — genummerde stappen
7. **PDPRoutineContext** — stap + tijd + pairing chips
8. **Reviews** — rasterweergave met "Geverifieerd" badges
9. **Pairs-with** — gerelateerde producten grid

Bevat ook: `StickyProductBar`, JSON-LD schema, SEO metadata, `generateStaticParams`

### PDPHero (app/products/[slug]/PDPHero.tsx)
**Desktop**: Parallax scroll afbeelding (useScroll + useTransform), grain overlay, emotion badge overlay, floating ingredient chip
**Mobiel**: CSS snap scroll horizontale gallery (`overflow-x-auto snap-x snap-mandatory`), dot indicators
**Cart CTA**: `dispatch({ type: 'ADD_ITEM', payload: {...} })` → "Toegevoegd ✓" success state 2.2s via AnimatePresence

### StickyProductBar (app/products/[slug]/StickyProductBar.tsx)
Props: `slug, name, price, originalPrice?, image, size`
Verschijnt als `#product-hero-cta` div uit viewport scrolt (IntersectionObserver)
Zelfde cart dispatch + "Toegevoegd" success state als PDPHero

---

## Pagina Overzicht

| Route | Component | Metadata |
|---|---|---|
| `/` | app/page.tsx | LUMÉ homepage |
| `/shop` | ShopPage.tsx | Volledige collectie |
| `/philosophy` | PhilosophyPageContent.tsx | Merk filosofie |
| `/routine` | RoutineBuilderPage.tsx | Routine builder |
| `/journal` | JournalPageContent.tsx | Redactioneel |
| `/faq` | FAQPageContent.tsx | Veelgestelde vragen |
| `/ingredients` | IngredientsPageContent.tsx | Ingrediënten & wetenschap |
| `/community` | CommunityPageContent.tsx | Community & reviews |
| `/products/[slug]` | PDP page.tsx | Product detailpagina |

---

## Copy Regels (Brand Voice)
**Verboden woorden**: glow, radiance, transform, miracle, luxury
**Toon**: eerlijk, wetenschappelijk, rustig, niet overdreven
**Taal**: Nederlands
**Stijl**: kort, direct, geen superlatieven, geen beloftes die niet waargemaakt kunnen worden

---

## Nog te doen / ideeën voor volgende sessie
- [ ] Mobile cart icon in burger menu toevoegen
- [ ] Swipe-to-dismiss op SlideCart (mobiel)
- [ ] Wishlist / favorieten functionaliteit
- [ ] Checkout pagina (momenteel alleen knop)
- [ ] Productfilters op /shop (huidtype, concern)
- [ ] Zoekfunctionaliteit
- [ ] Newsletter popup koppelen aan echte API
- [ ] Klarna integratie (nu alleen knop)
- [ ] Toast notificatie systeem
- [ ] Vergelijk producten feature

---

## Git & Deployment

**Remote**: `https://github.com/joppe1603/gorgias-landing.git`
**Branch**: `main`

Push workflow:
```bash
cd /Users/joppe/Desktop/gorgias-landing
git add [bestanden]
git commit -m "beschrijving"
git push
```
