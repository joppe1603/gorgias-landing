'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const products = [
  {
    label:       'Bestseller',
    name:        'Radiance Serum',
    size:        '30ml',
    price:       '€58',
    originalPrice: null,
    description: 'Ons bestsellende vitamine C + retinol serum voor een stralende, egale huid.',
    image:       '/reset-serum.jpg',
    items: [
      'Retinol 0.3%',
      'Vitamine C 15%',
      'Niacinamide 5%',
      'Hyaluronzuur',
    ],
    note:        null,
    highlight:   false,
    cta:         'Begin simpel',
    ctaStyle:    'border-2 border-stone-200 text-[#1A1A1A] hover:border-[#C9A96E] hover:text-[#C9A96E]',
    href:        '/products/radiance-serum',
  },
  {
    label:       'Beste Waarde',
    name:        'The Glow Ritual',
    size:        'Volledige routine · 3 producten',
    price:       '€129',
    originalPrice: '€174',
    description: 'De complete LUMÉ ochtend- en avondroutine voor transformerende resultaten.',
    image:       'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=480&q=80&fit=crop',
    items: [
      'Radiance Serum (ochtend)',
      'Deep Moisture Cream',
      'Overnight Renewal Oil',
      'Gratis: Mini Oogcrème (cadeau)',
    ],
    note:        'Gratis verzending · 30 dagen retour · Bespaar €45',
    highlight:   true,
    cta:         'Bouw mijn routine',
    ctaStyle:    'btn-gold',
    href:        '/products/the-glow-ritual',
  },
  {
    label:       'Zachte Formule',
    name:        'Sensitive Skin Edit',
    size:        '2 producten',
    price:       '€89',
    originalPrice: null,
    description: 'Bakuchiol + barrièreherstel — alle resultaten, zonder irritatie.',
    image:       'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=480&q=80&fit=crop',
    items: [
      'Bakuchiol Serum',
      'Barrier Restore Cream',
    ],
    note:        null,
    highlight:   false,
    cta:         'Goed voor mij',
    ctaStyle:    'border-2 border-stone-200 text-[#1A1A1A] hover:border-[#C9A96E] hover:text-[#C9A96E]',
    href:        '/products/sensitive-skin-edit',
  },
]

const whyItems = [
  { icon: '🌿', title: 'Schone ingrediënten',  desc: 'Geen parabenen, siliconen of minerale oliën' },
  { icon: '🔬', title: 'Klinisch getest',       desc: 'Elke formule door dermatologen goedgekeurd' },
  { icon: '📦', title: 'Gratis retour',          desc: '30 dagen retourbeleid zonder vragen' },
  { icon: '🌍', title: 'Koolstofneutraal',       desc: 'Verzending en verpakking gecompenseerd' },
]


export default function Pricing() {
  return (
    <section id="shop" className="py-28 bg-white relative overflow-hidden scroll-mt-28">
      {/* Soft background shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FDF8F0]/60 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-stone-50/60 to-transparent rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] px-4 py-1.5 rounded-full mb-4">
            Shop LUMÉ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-5 leading-tight">
            Kies je
            <br />
            <span className="gradient-text">startpunt.</span>
          </h2>
          <p className="text-lg text-[#6B6560] max-w-xl mx-auto">
            Start met één product. Of de complete set. Geen druk.
          </p>
        </motion.div>

        {/* Product cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${product.highlight ? 'lg:-mt-4' : ''}`}
            >
              {/* Gold glow ring on highlight card */}
              <div className={`rounded-2xl ${product.highlight
                ? 'p-[2px] bg-gradient-to-br from-[#C9A96E] via-[#E8C98A] to-[#C9A96E] shadow-[0_0_0_1px_rgba(201,169,110,0.2),0_0_48px_rgba(201,169,110,0.25)]'
                : ''}`}
              >
                <div className={`rounded-2xl border-2 bg-white p-8 ${product.highlight
                  ? 'border-transparent shadow-xl'
                  : 'border-stone-200 shadow-sm'}`}
                >
                  {/* Label */}
                  <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full ${
                      product.highlight
                        ? 'bg-[#FDF8F0] text-[#C9A96E]'
                        : 'bg-stone-50 text-stone-500'
                    }`}>
                      {product.label}
                    </span>
                  </div>

                  {/* Product image */}
                  <div className="w-full h-36 rounded-2xl mb-6 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 380px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 via-transparent to-transparent" />
                  </div>

                  {/* Name + size */}
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{product.name}</h3>
                  <p className="text-xs text-[#6B6560] mb-3 uppercase tracking-wide">{product.size}</p>
                  <p className="text-sm text-[#6B6560] leading-relaxed mb-5">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-black text-[#1A1A1A]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-base text-stone-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  {/* CTA + Quick Add on hover */}
                  <div className="relative mb-6 group/btn">
                    <a
                      href={product.href}
                      className={`block w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-center cursor-pointer transition-all group-hover/btn:opacity-0 group-hover/btn:scale-95 ${product.ctaStyle}`}
                    >
                      {product.cta}
                    </a>
                    <a
                      href={product.href}
                      className="absolute inset-0 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm cursor-pointer opacity-0 scale-95 group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all btn-gold"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      Details
                    </a>
                  </div>

                  {/* Note */}
                  {product.note && (
                    <p className="text-xs text-center text-[#6B6560] mb-5">{product.note}</p>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-stone-100 mb-5" />

                  {/* Key items */}
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400 mb-3">
                    {product.items.length <= 4 ? 'Werkzame stoffen' : 'Bevat'}
                  </p>
                  <ul className="space-y-2">
                    {product.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-stone-600">
                        <div className="w-4 h-4 rounded-full bg-[#FDF8F0] flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Waarom LUMÉ strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-16 bg-[#FAF8F5] border border-stone-100 rounded-2xl p-8"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-8">Waarom LUMÉ?</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-sm font-bold text-[#1A1A1A] mb-1">{item.title}</p>
                <p className="text-xs text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
