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

// Static params for all product slugs
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }))
}

// Per-product SEO metadata
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
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i <= Math.round(rating) ? '#C9A96E' : '#E5E7EB'} aria-hidden>
            <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-[#1A1A1A]">{rating}</span>
      <span className="text-sm text-[#6B6560]">({count.toLocaleString('nl-NL')} beoordelingen)</span>
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

      <main className="bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="flex items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/#shop" className="hover:text-[#C9A96E] transition-colors">Producten</Link>
            <span>›</span>
            <span className="text-[#1A1A1A] font-medium">{product.name}</span>
          </nav>
        </div>

        {/* ─── HERO ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAF8F5] shadow-xl shadow-stone-200/60">
                <Image
                  src={product.heroImage}
                  alt={`${product.name} — LUMÉ Skincare`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Trust float cards */}
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-lg border border-stone-100 px-4 py-3 flex items-center gap-2.5">
                <span className="text-2xl">🔬</span>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Dermatoloog getest</p>
                  <p className="text-[10px] text-[#6B6560]">Klinisch bewezen formule</p>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="lg:pt-4">
              {/* Badge + name */}
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-[#6B6560] text-base mb-4">{product.tagline}</p>

              {/* Rating */}
              <div className="mb-5">
                <Stars rating={product.rating} count={product.reviewCount} />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black text-[#1A1A1A]">€{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-stone-400 line-through">€{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    Bespaar €{product.originalPrice - product.price}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B6560] mb-6">{product.size}</p>

              {/* Description */}
              <p className="text-[#6B6560] leading-relaxed mb-7 text-sm sm:text-base">
                {product.description}
              </p>

              {/* Key benefits */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-2.5 bg-[#FAF8F5] rounded-xl p-3">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">{b.title}</p>
                      <p className="text-[10px] text-[#6B6560] leading-snug">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div id="product-hero-cta" className="space-y-3 mb-6">
                <button className="btn-gold w-full py-4 rounded-2xl font-semibold text-base cursor-pointer transition-all">
                  In winkelwagen · €{product.price}
                </button>
                <button className="w-full py-3.5 rounded-2xl font-semibold text-sm border-2 border-stone-200 text-[#1A1A1A] hover:border-[#C9A96E] hover:text-[#C9A96E] cursor-pointer transition-all">
                  Koop nu, betaal later via Klarna
                </button>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6B6560]">
                <span className="flex items-center gap-1.5"><span>🔒</span> Veilig betalen</span>
                <span className="flex items-center gap-1.5"><span>🚚</span> Gratis verzending boven €50</span>
                <span className="flex items-center gap-1.5"><span>↩</span> 30 dagen retour</span>
                <span className="flex items-center gap-1.5"><span>🌿</span> 100% vegan</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LONG DESCRIPTION ─────────────────────────── */}
        <section className="bg-[#FAF8F5] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-4">Over dit product</span>
            <p className="text-lg text-[#1A1A1A] leading-relaxed">{product.longDescription}</p>
          </div>
        </section>

        {/* ─── INGREDIËNTEN ─────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
                Formule
              </span>
              <h2 className="text-3xl font-bold text-[#1A1A1A]">Werkzame ingrediënten</h2>
              <p className="text-[#6B6560] mt-3">Elke stof heeft een bewezen functie. Geen vullers.</p>
            </div>
            <IngredientsAccordion
              keyIngredients={product.keyIngredients}
              allIngredients={product.allIngredients}
            />
          </div>
        </section>

        {/* ─── HOE TE GEBRUIKEN ─────────────────────────── */}
        <section className="bg-[#0F0E0C] py-16 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#C9A96E]/10 px-4 py-1.5 rounded-full mb-4">
                Gebruik
              </span>
              <h2 className="text-3xl font-bold text-white">Hoe te gebruiken</h2>
            </div>
            <ol className="space-y-4">
              {product.howToUse.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#C9A96E] flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-stone-300 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── REVIEWS ──────────────────────────────────── */}
        <section className="py-16 bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
                Beoordelingen
              </span>
              <h2 className="text-3xl font-bold text-[#1A1A1A]">Wat klanten zeggen</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Stars rating={product.rating} count={product.reviewCount} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {product.reviews.map((r) => (
                <div key={r.author} className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#C9A96E" aria-hidden>
                        <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed mb-5">&ldquo;{r.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className={`w-9 h-9 ${r.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {r.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{r.author}</p>
                      <p className="text-xs text-[#6B6560]">{r.location} · {r.skin} · {r.weeks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── GERELATEERDE PRODUCTEN ───────────────────── */}
        {related.length > 0 && (
          <section className="py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
                  Combineert goed met
                </span>
                <h2 className="text-3xl font-bold text-[#1A1A1A]">Gerelateerde producten</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/products/${rel.slug}`} className="group block bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md hover:border-[#C9A96E]/30 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden bg-[#FAF8F5]">
                      <Image
                        src={rel.heroImage}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A96E] bg-[#FDF8F0] px-2 py-0.5 rounded-full">
                        {rel.badge}
                      </span>
                      <h3 className="text-lg font-bold text-[#1A1A1A] mt-2 mb-1 group-hover:text-[#C9A96E] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-sm text-[#6B6560] mb-3">{rel.tagline}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-[#1A1A1A]">€{rel.price}</span>
                        <span className="text-sm font-semibold text-[#C9A96E] group-hover:underline underline-offset-2">
                          Bekijk product →
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
        name={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
      />
    </>
  )
}
