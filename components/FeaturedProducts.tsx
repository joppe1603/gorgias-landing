'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const products = [
  {
    slug: 'quiet-cleanser',
    name: 'Quiet Cleanser',
    tagline: 'De cleanser die niks kapotmaakt.',
    description: 'Zachte foamreiniger die SPF, make-up en vervuiling verwijdert zonder de huidbarrière te verstoren.',
    price: '€38',
    size: '150ml',
    skinType: 'Alle huidtypes',
    keyIngredient: 'Ceramiden',
    routineStep: 'Stap 01 — Reinigen',
    image: '/quiet-cleanser.jpg',
    accent: 'bg-[#F5EFE6]',
    tag: 'Dagelijks gebruik',
  },
  {
    slug: 'reset-serum',
    name: 'Reset Serum',
    tagline: 'Eén serum. Doet het werk van drie.',
    description: 'Retinol 0.3%, Niacinamide 10% en Hyaluronzuur in één stabiele formule. Effectief, ook voor gevoelige huid.',
    price: '€58',
    size: '30ml',
    skinType: 'Normaal · Droog · Gemengd',
    keyIngredient: 'Retinol + Niacinamide',
    routineStep: 'Stap 02 — Behandelen',
    image: '/reset-serum-new.jpg',
    accent: 'bg-[#EEF0F5]',
    tag: 'Bestseller',
    featured: true,
  },
  {
    slug: 'soft-barrier-cream',
    name: 'Soft Barrier Cream',
    tagline: 'Hydratatie zonder het vettige gevoel.',
    description: 'Lichte dagcrème die de huidbarrière herstelt en langdurig vocht vasthoudt. Werkt met of zonder SPF.',
    price: '€48',
    size: '50ml',
    skinType: 'Droog · Gevoelig · Rijper',
    keyIngredient: 'Bakuchiol + Ceramiden',
    routineStep: 'Stap 03 — Beschermen',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80&fit=crop',
    accent: 'bg-[#F0EDE8]',
    tag: 'Gevoelige huid',
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">De producten</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05]"
            >
              Drie producten.
              <br />
              <span className="text-[#9A9590] font-normal italic">Niet meer.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link href="/shop" className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium">
              Alle producten
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 6h8M6 2l4 4-4 4"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative ${product.featured ? 'md:-mt-4' : ''}`}
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative rounded-2xl overflow-hidden border border-stone-100 hover:border-[#C9A96E]/30 transition-colors duration-300 bg-white">

                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full ${product.featured ? 'bg-[#1A1A1A] text-[#C9A96E]' : 'bg-white/90 text-stone-500 border border-stone-200'}`}>
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className={`relative ${product.accent} aspect-[4/3] overflow-hidden`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    {/* Routine step */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] mb-3">{product.routineStep}</p>

                    {/* Name + tagline */}
                    <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-1.5">{product.name}</h3>
                    <p className="text-sm text-[#6B6560] italic mb-4">{product.tagline}</p>

                    {/* Description */}
                    <p className="text-sm text-[#6B6560] leading-relaxed mb-6">{product.description}</p>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="ingredient-pill">{product.keyIngredient}</span>
                      <span className="ingredient-pill">{product.skinType}</span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-5 border-t border-stone-100">
                      <div>
                        <p className="text-2xl font-semibold text-[#1A1A1A] font-[family-name:var(--font-cormorant)]">{product.price}</p>
                        <p className="text-xs text-[#9A9590]">{product.size}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${product.featured ? 'btn-gold' : 'btn-outline group-hover:border-[#C9A96E] group-hover:text-[#C9A96E]'}`}>
                        Bekijk
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M2 6h8M6 2l4 4-4 4"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <Link href="/shop" className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium">
            Alle producten bekijken
          </Link>
        </div>
      </div>
    </section>
  )
}
