import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyProductBar from './StickyProductBar'
import IngredientsAccordion from './IngredientsAccordion'
import PDPHero from './PDPHero'
import PDPTextureGallery from './PDPTextureGallery'
import PDPRoutineContext from './PDPRoutineContext'
import PDPWhyThisWorks from './PDPWhyThisWorks'
import PDPUsageTimeline from './PDPUsageTimeline'
import PDPFaq from './PDPFaq'
import { getProduct, getAllProducts, getPublicProducts, getRelatedProducts } from '@/lib/products'
import PDPBundleUpsell from './PDPBundleUpsell'
import PDPReviews from './PDPReviews'

const BASE_URL = 'https://mauyi.nl'

export function generateStaticParams() {
  return getPublicProducts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `${BASE_URL}/products/${slug}`,
      images: [{ url: product.heroImage, width: 900, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seo.title,
      description: product.seo.description,
      images: [product.heroImage],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product || product.hidden) notFound()

  const related = getRelatedProducts(product.relatedSlugs)

  const availability =
    product.availability === 'available'
      ? 'https://schema.org/InStock'
      : 'https://schema.org/PreOrder'

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `${BASE_URL}${product.heroImage}`,
    brand: { '@type': 'Brand', name: 'MAUYI' },
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'EUR',
      availability,
      url: `${BASE_URL}/products/${slug}`,
      seller: { '@type': 'Organization', name: 'MAUYI' },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Producten', item: `${BASE_URL}/shop` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${BASE_URL}/products/${slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is dit veilig voor gevoelige huid?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja. De formule is ontworpen met gevoelige huid als uitgangspunt. De laagste effectieve retinolconcentratie (0.3%) wordt gebufferd door niacinamide, waardoor irritatie sterk vermindert. Begin met 2–3 avonden per week.' },
      },
      {
        '@type': 'Question',
        name: 'Kan ik dit combineren met vitamine C of SPF?',
        acceptedAnswer: { '@type': 'Answer', text: "Gebruik vitamine C 's ochtends, dit serum 's avonds. SPF overdag is verplicht — retinol maakt de huid tijdelijk iets gevoeliger voor zon. Combineer dit niet met andere retinol- of exfoliërende producten." },
      },
      {
        '@type': 'Question',
        name: 'Hoe snel zie ik resultaat?',
        acceptedAnswer: { '@type': 'Answer', text: 'De eerste veranderingen in textuur zijn merkbaar na 3–4 weken bij consistent gebruik. Significant verschil in huidtoon, fijnere lijntjes en kleinere poriën is zichtbaar na 8–12 weken.' },
      },
      {
        '@type': 'Question',
        name: 'Wat als mijn huid reageert?',
        acceptedAnswer: { '@type': 'Answer', text: 'Lichte warmte, straktheid of een tijdelijke droogheid zijn normaal in de eerste weken. Verlaag de frequentie naar 2 avonden per week. Bij aanhoudende irritatie, stop het gebruik.' },
      },
      {
        '@type': 'Question',
        name: 'Is dit geschikt tijdens zwangerschap of borstvoeding?',
        acceptedAnswer: { '@type': 'Answer', text: 'Retinol wordt niet aanbevolen tijdens zwangerschap of borstvoeding. Raadpleeg altijd je huisarts of gynaecoloog.' },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="bg-[#FAF8F5] min-h-screen">

        {/* ─── BREADCRUMB ───────────────────────────────── */}
        <div className="bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <nav className="flex items-center gap-2 text-xs text-[#9A9590]">
              <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
              <span className="text-stone-300">/</span>
              <Link href="/shop" className="hover:text-[#C9A96E] transition-colors">Producten</Link>
              <span className="text-stone-300">/</span>
              <span className="text-[#1A1A1A] font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* ─── 1. CINEMATIC HERO ────────────────────────── */}
        <PDPHero product={product} />

        {/* ─── 2. MANIFESTO ─────────────────────────────── */}
        <section className="bg-[#FAF8F5] py-24">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
            {product.emotion && (
              <h2
                className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.08] mb-10"
                style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}
              >
                &ldquo;{product.emotion}&rdquo;
              </h2>
            )}
            <p className="text-[17px] text-[#5C5754] leading-[1.8] font-light">
              {product.longDescription}
            </p>
          </div>
        </section>

        {/* ─── 3. TEXTURE GALLERY ───────────────────────── */}
        <PDPTextureGallery product={product} />

        {/* ─── 4. WAAROM DIT WERKT ──────────────────────── */}
        <PDPWhyThisWorks product={product} />

        {/* ─── 5. INGREDIËNTEN ──────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label">Formule</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight mb-3"
              >
                Elk ingrediënt.
                <br />
                <span
                  className="font-normal italic"
                  style={{ color: '#9A9590', fontFamily: 'var(--font-cormorant)' }}
                >
                  Met een reden.
                </span>
              </h2>
              <p className="text-[15px] text-[#9A9590] font-light">
                Geen vullers. Geen obscure extracten. Alleen wat klinisch werkt.
              </p>
            </div>
            <IngredientsAccordion
              keyIngredients={product.keyIngredients}
              allIngredients={product.allIngredients}
            />
          </div>
        </section>

        {/* ─── 5. HOE TE GEBRUIKEN ──────────────────────── */}
        <section className="bg-[#0F0E0C] py-20 text-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label text-[#C9A96E]">Gebruik</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                Hoe te gebruiken.
              </h2>
            </div>
            <ol className="space-y-0">
              {product.howToUse.map((step, i) => (
                <li key={i} className="flex items-start gap-6 py-5 border-b border-white/6 last:border-0">
                  <span
                    className="text-[#C9A96E] font-medium text-sm tabular-nums shrink-0 pt-0.5"
                    style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-stone-300 leading-relaxed font-light text-[15px]">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 6. ROUTINE CONTEXT ───────────────────────── */}
        <PDPRoutineContext product={product} relatedProducts={related} />

        {/* ─── 7. TIJDLIJN ──────────────────────────────── */}
        <PDPUsageTimeline />

        {/* ─── 8. REVIEWS ───────────────────────────────── */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">

            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label">Sample testers</span>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
                  Wat onze testers zeggen.
                </h2>
                <p className="text-[13px] text-[#9A9590] font-light max-w-xs text-right">
                  Feedback verzameld tijdens de ontwikkelfase met sample testers.
                </p>
              </div>
            </div>

            {/* Review cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {product.reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-stone-100 p-6 flex flex-col">
                  {/* Quote */}
                  <p className="text-[#1A1A1A] text-[14px] leading-relaxed font-light mb-5 flex-1">
                    &ldquo;{r.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className={`w-8 h-8 ${r.color} rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                      {r.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-[#1A1A1A] truncate">{r.author}</p>
                      <p className="text-[10px] text-[#9A9590]">{r.skin} · {r.weeks}</p>
                    </div>
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.15em] text-[#9A9590] bg-stone-100 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                      Tester
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pre-launch disclaimer */}
            <div className="mt-8 text-center">
              <p className="text-[12px] text-[#9A9590] font-light">
                Dit product is in pre-launch. Bovenstaande feedback is afkomstig van sample testers tijdens de ontwikkelfase.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 9. FAQ ───────────────────────────────────── */}
        <PDPFaq productName={product.name} />

        {/* ─── 9b. BUNDLE UPSELL ────────────────────────── */}
        {related.length > 0 && (
          <PDPBundleUpsell currentProduct={product} relatedProducts={related} />
        )}

        {/* ─── 9c. KLANTREVIEWS ─────────────────────────── */}
        <PDPReviews slug={product.slug} />

        {/* ─── 10. PAIRS WELL WITH ──────────────────────── */}
        {related.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">

              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-[#C9A96E]" />
                  <span className="section-label">Vervolgens in je routine</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
                  Jouw routine,
                  <br />
                  <span
                    className="font-normal italic"
                    style={{ color: '#9A9590', fontFamily: 'var(--font-cormorant)' }}
                  >
                    compleet gemaakt.
                  </span>
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/products/${rel.slug}`}
                    className="group flex gap-5 bg-[#FAF8F5] rounded-2xl border border-stone-100 overflow-hidden hover:border-[#C9A96E]/30 hover:bg-white hover:shadow-sm transition-all duration-300 p-5"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src={rel.heroImage}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <span className="section-label block mb-2">{rel.badge}</span>
                      <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#C9A96E] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-[12px] text-[#9A9590] font-light mb-3 line-clamp-2">{rel.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-semibold text-[#1A1A1A]">€{rel.price}</span>
                        <span className="text-[11px] text-[#C9A96E] font-medium group-hover:underline underline-offset-2">
                          Bekijk →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </section>
        )}

      </main>

      <Footer />
      <StickyProductBar
        slug={product.slug}
        name={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
        image={product.heroImage}
        size={product.size}
        availability={product.availability}
      />
    </>
  )
}
