'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const filters = ['Alles', 'Serums', 'Reinigers', 'Crèmes', 'Bundels', 'Gevoelige huid', 'Bestsellers']

const products = [
  {
    slug: 'quiet-cleanser',
    name: 'Quiet Cleanser',
    tagline: 'Reinigt zonder te verstoren.',
    price: 38,
    size: '150ml',
    image: '/quiet-cleanser.jpg',
    tag: null,
    categories: ['Reinigers', 'Gevoelige huid'],
    keyIngredients: ['Ceramiden', 'Provitamine B5'],
    skinTypes: 'Alle huidtypes',
  },
  {
    slug: 'reset-serum',
    name: 'Reset Serum',
    tagline: 'Eén serum. Doet het werk van drie.',
    price: 58,
    size: '30ml',
    image: '/reset-serum.jpg',
    tag: 'Bestseller',
    categories: ['Serums', 'Bestsellers'],
    keyIngredients: ['Retinol 0.3%', 'Niacinamide 10%'],
    skinTypes: 'Normaal · Droog · Gemengd',
  },
  {
    slug: 'soft-barrier-cream',
    name: 'Soft Barrier Cream',
    tagline: 'Hydratatie zonder het vettige gevoel.',
    price: 48,
    size: '50ml',
    image: '/soft-barrier-cream.jpg',
    tag: null,
    categories: ['Crèmes', 'Gevoelige huid'],
    keyIngredients: ['Bakuchiol', 'Ceramiden'],
    skinTypes: 'Droog · Gevoelig',
  },
  {
    slug: 'the-glow-ritual',
    name: 'The Glow Ritual',
    tagline: 'Volledige 3-stappen routine.',
    price: 129,
    originalPrice: 174,
    size: '3 producten',
    image: '/the-glow-ritual.jpg',
    tag: 'Beste waarde',
    categories: ['Bundels', 'Bestsellers'],
    keyIngredients: ['Retinol', 'Niacinamide', 'Ceramiden'],
    skinTypes: 'Alle huidtypes',
  },
  {
    slug: 'sensitive-skin-edit',
    name: 'Sensitive Skin Edit',
    tagline: 'Resultaat zonder irritatie.',
    price: 89,
    size: '2 producten',
    image: '/sensitive-skin-edit.jpg',
    tag: null,
    categories: ['Bundels', 'Gevoelige huid'],
    keyIngredients: ['Bakuchiol', 'Ceramiden'],
    skinTypes: 'Gevoelig · Droog',
  },
  {
    slug: 'overnight-renewal-oil',
    name: 'Overnight Renewal Oil',
    tagline: 'Herstellend terwijl je slaapt.',
    price: 52,
    size: '30ml',
    image: '/overnight-renewal-oil.jpg',
    tag: null,
    categories: ['Serums'],
    keyIngredients: ['Rozenbottelolie', 'Squalaan'],
    skinTypes: 'Alle huidtypes',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#C9A96E" aria-hidden>
          <path d="M6 1L7.4 4.3H11L8.2 6.5L9.2 10L6 8L2.8 10L3.8 6.5L1 4.3H4.6L6 1Z"/>
        </svg>
      ))}
    </div>
  )
}

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('Alles')

  const filtered = activeFilter === 'Alles'
    ? products
    : products.filter(p => p.categories.includes(activeFilter))

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#FAF8F5] pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">MAUYI — De collectie</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05] mb-4">
              Geen 50 producten.
              <br />
              <span className="text-[#9A9590] font-normal italic">Zes die werken.</span>
            </h1>
            <p className="text-[#6B6560] text-lg font-light max-w-md leading-relaxed">
              Elke formule is klinisch bewezen. Geen opvullers. Geen parfum. Geen ruis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === f
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-sm text-stone-400">{filtered.length} producten</span>
          </div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/products/${product.slug}`} className="group block bg-white rounded-2xl border border-stone-100 hover:border-stone-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-stone-100">
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-[#F5EFE6] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {product.tag && (
                        <div className="absolute top-4 left-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] bg-[#1A1A1A] text-[#C9A96E] px-2.5 py-1 rounded-full">
                            {product.tag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#1A1A1A] mb-1">{product.name}</h3>
                      <p className="text-sm text-[#6B6560] italic mb-4">{product.tagline}</p>

                      {/* Ingredients */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {product.keyIngredients.map((ing) => (
                          <span key={ing} className="ingredient-pill">{ing}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                        <div className="flex items-center gap-3">
                          <Stars />
                          <span className="text-xs text-stone-400">4.9</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-semibold text-[#1A1A1A] font-[family-name:var(--font-cormorant)]">€{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-stone-400 line-through ml-2">€{product.originalPrice}</span>
                          )}
                          <p className="text-xs text-stone-400">{product.size}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Routine builder CTA */}
      <section className="py-20 bg-[#0F0E0C]">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4" style={{ color: '#C9A96E' }}>Niet zeker waar je moet beginnen?</p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white leading-[1.08] mb-6">
              Wij vinden de
              <br />
              <span className="text-stone-500 font-normal italic">routine voor jou.</span>
            </h2>
            <p className="text-stone-400 leading-relaxed mb-10 font-light">
              Beantwoord 3 vragen. Krijg een persoonlijk advies. Geen ingewikkeld algoritme — gewoon eerlijk advies.
            </p>
            <Link href="/routine" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium">
              Bouw mijn routine
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
