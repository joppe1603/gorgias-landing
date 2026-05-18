'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'

type Props = {
  currentProduct: Product
  relatedProducts: Product[]
}

export default function PDPBundleUpsell({ currentProduct, relatedProducts }: Props) {
  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)

  if (!relatedProducts.length) return null

  const availableRelated = relatedProducts.filter(p => p.availability === 'available')
  const allProducts = [currentProduct, ...availableRelated].filter(
    (p, i, arr) => arr.findIndex(x => x.slug === p.slug) === i
  )

  if (allProducts.length < 2) return null

  const bundleTotal = allProducts.reduce((sum, p) => sum + p.price, 0)
  const bundleDiscount = Math.round(bundleTotal * 0.1)
  const bundlePrice = bundleTotal - bundleDiscount

  function addBundle() {
    allProducts.forEach(p => {
      dispatch({
        type: 'ADD_ITEM',
        payload: { slug: p.slug, name: p.name, price: p.price, image: p.heroImage, size: p.size },
      })
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <section className="py-16 bg-[#FAF8F5] border-t border-stone-100">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-[#C9A96E]" />
          <span className="section-label">Vaak samen gekocht</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-stone-100 p-6 sm:p-8"
        >
          {/* Products row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {allProducts.map((p, i) => (
              <div key={p.slug} className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-100">
                  <Image src={p.heroImage} alt={p.name} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9A9590]">{p.badge}</p>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{p.name}</p>
                  <p className="text-sm text-[#C9A96E] font-medium">€{p.price}</p>
                </div>
                {i < allProducts.length - 1 && (
                  <span className="text-2xl text-stone-200 font-light select-none">+</span>
                )}
              </div>
            ))}
          </div>

          {/* Pricing + CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-stone-100">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#1A1A1A]">€{bundlePrice}</span>
                <span className="text-base text-stone-300 line-through">€{bundleTotal}</span>
                <span className="text-xs font-semibold text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/20 px-2.5 py-1 rounded-full">
                  −€{bundleDiscount} korting
                </span>
              </div>
              <p className="text-[11px] text-[#9A9590] mt-1">
                {allProducts.length} producten samen · Gratis verzending
              </p>
            </div>
            <button
              onClick={addBundle}
              type="button"
              className="btn-gold px-6 py-3 rounded-2xl text-sm font-medium cursor-pointer min-w-[180px] text-center"
            >
              {added ? '✓ Bundel toegevoegd' : 'Voeg bundel toe aan winkelwagen'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
