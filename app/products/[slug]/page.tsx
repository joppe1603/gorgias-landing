import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyProductBar from './StickyProductBar'
import IngredientsAccordion from './IngredientsAccordion'
import { getProduct, getAllProducts, getRelatedProducts } from '@/lib/products'

const BASE_URL = 'https://lume-skincare.nl'

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
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

function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill={i <= Math.round(rating) ? '#C9A96E' : '#E5E7EB'} aria-hidden>
            <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-[#1A1A1A]">{rating}</span>
      <span className="text-sm text-[#9A9590]">({count.toLocaleString('nl-NL')})</span>
    </div>
  )
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.relatedSlugs)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.heroImage,
    brand: { '@type': 'Brand', name: 'LUMÉ' },
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/products/${slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />

      <main className="bg-[#FAF8F5] min-h-screen">

        {/* ─── BREADCRUMB ──────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
          <nav className="flex items-center gap-2 text-xs text-[#9A9590]">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#C9A96E] transition-colors">Producten</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]">{product.name}</span>
          </nav>
        </div>

        {/* ─── HERO ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Image column */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
                <Image
                  src={product.heroImage}
                  alt={`${product.name} — LUMÉ Skincare`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Floating badge — dermatoloog getest */}
              <div className="absolute -bottom-4 left-6 bg-white rounded-xl shadow-md border border-stone-100/80 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FDF8F0] rounded-full flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm-1 8.5L3.5 7l.707-.707L6 8.086l4.293-4.293.707.707L6 9.5z" fill="#C9A96E"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1A1A1A] leading-none mb-0.5">Dermatoloog getest</p>
                  <p className="text-[10px] text-[#9A9590]">Klinisch bewezen formule</p>
                </div>
              </div>
            </div>

            {/* Info column */}
            <div className="lg:pt-2">
              {/* Label row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label">{product.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-semibold text-[#1A1A1A] leading-[1.05] mb-3">
                {product.name}
              </h1>
              <p className="text-[#9A9590] text-lg font-light italic mb-6">{product.tagline}</p>

              {/* Rating */}
              <div className="mb-7">
                <Stars rating={product.rating} count={product.reviewCount} />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-semibold text-[#1A1A1A]">€{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-stone-300 line-through">€{product.originalPrice}</span>
                    <span className="text-xs font-semibold text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/20 px-2 py-0.5 rounded-full">
                      −€{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#9A9590] mb-8 font-medium tracking-wide">{product.size}</p>

              {/* Description */}
              <p className="text-[#6B6560] leading-relaxed mb-8 text-base font-light">
                {product.description}
              </p>

              {/* Key benefits */}
              <div className="grid grid-cols-2 gap-2.5 mb-9">
                {product.benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-2.5 bg-white rounded-xl p-3.5 border border-stone-100">
                    <span className="text-lg leading-none mt-0.5">{b.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A] mb-0.5">{b.title}</p>
                      <p className="text-[10px] text-[#9A9590] leading-snug">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div id="product-hero-cta" className="space-y-3 mb-7">
                <button className="btn-gold w-full py-4 rounded-2xl font-medium text-[15px] cursor-pointer">
                  In winkelwagen · €{product.price}
                </button>
                <button className="w-full py-3.5 rounded-2xl font-medium text-sm border border-stone-200 text-[#6B6560] hover:border-[#C9A96E] hover:text-[#C9A96E] cursor-pointer transition-all">
                  Koop nu, betaal later via Klarna
                </button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#9A9590] pt-5 border-t border-stone-200">
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" fill="#C9A96E"/></svg>
                  Gratis verzending boven €50
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M10 2H2a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1z" stroke="#C9A96E" strokeWidth="1.2"/></svg>
                  30 dagen retour
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><circle cx="6" cy="6" r="5" stroke="#C9A96E" strokeWidth="1.2"/><path d="M4 6l1.5 1.5L8 4" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  100% vegan
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M6 1v4l3 1.5" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6" cy="6" r="5" stroke="#C9A96E" strokeWidth="1.2"/></svg>
                  Parfumvrij
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── OVER DIT PRODUCT ────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-px bg-stone-300" />
              <span className="section-label">Over dit product</span>
              <div className="w-8 h-px bg-stone-300" />
            </div>
            <p className="text-xl text-[#1A1A1A] leading-relaxed font-light">
              {product.longDescription}
            </p>
          </div>
        </section>

        {/* ─── INGREDIËNTEN ─────────────────────────────── */}
        <section className="py-20 bg-[#FAF8F5]">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label">Formule</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight mb-3">
                Werkzame ingrediënten.
                <br />
                <span className="text-[#9A9590] font-normal italic">Elk met een functie.</span>
              </h2>
              <p className="text-[#6B6560] font-light">Geen vullers. Geen obscure extracten. Alleen wat klinisch werkt.</p>
            </div>
            <IngredientsAccordion
              keyIngredients={product.keyIngredients}
              allIngredients={product.allIngredients}
            />
          </div>
        </section>

        {/* ─── HOE TE GEBRUIKEN ─────────────────────────── */}
        <section className="bg-[#0F0E0C] py-20 text-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label text-[#C9A96E]">Gebruik</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
                Hoe te gebruiken.
              </h2>
            </div>
            <ol className="space-y-5">
              {product.howToUse.map((step, i) => (
                <li key={i} className="flex items-start gap-5 pb-5 border-b border-white/8 last:border-0 last:pb-0">
                  <span className="text-[#C9A96E] font-medium text-sm tabular-nums shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-stone-300 leading-relaxed font-light">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── REVIEWS ──────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#C9A96E]" />
                <span className="section-label">Beoordelingen</span>
              </div>
              <div className="flex items-end justify-between">
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
                  Wat klanten zeggen.
                </h2>
                <Stars rating={product.rating} count={product.reviewCount} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {product.reviews.map((r) => (
                <div key={r.author} className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-6">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(r.rating)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="#C9A96E" aria-hidden>
                        <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#1A1A1A] text-sm leading-relaxed mb-6 font-light">&ldquo;{r.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-stone-200">
                    <div className={`w-8 h-8 ${r.color} rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1A1A]">{r.author}</p>
                      <p className="text-[10px] text-[#9A9590]">{r.location} · {r.skin} · {r.weeks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GERELATEERDE PRODUCTEN ───────────────────── */}
        {related.length > 0 && (
          <section className="py-20 bg-[#FAF8F5]">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-[#C9A96E]" />
                  <span className="section-label">Combineert goed met</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-tight">
                  Jouw routine,
                  <br />
                  <span className="text-[#9A9590] font-normal italic">compleet gemaakt.</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/products/${rel.slug}`}
                    className="group flex gap-5 bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-[#C9A96E]/30 hover:shadow-md transition-all duration-300 p-5"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0">
                      <Image
                        src={rel.heroImage}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="section-label block mb-1.5">{rel.badge}</span>
                      <h3 className="text-base font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#C9A96E] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#9A9590] font-light mb-3 truncate">{rel.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-[#1A1A1A]">€{rel.price}</span>
                        <span className="text-xs text-[#C9A96E] font-medium">Bekijk →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Back to shop */}
              <div className="mt-10 text-center">
                <Link href="/shop" className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium">
                  ← Alle producten
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <StickyProductBar
        name={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
      />
    </>
  )
}
