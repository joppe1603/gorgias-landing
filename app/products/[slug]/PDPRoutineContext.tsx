'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function PDPRoutineContext({
  product,
  relatedProducts,
}: {
  product: Product
  relatedProducts: Product[]
}) {
  const ctx = product.routineContext
  if (!ctx) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-px bg-[#C9A96E]" />
          <span className="section-label">In je routine</span>
        </motion.div>

        {/* Step + time + note */}
        <div className="flex items-start gap-10 mb-10">
          {/* Large step number */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9590] mb-2">Stap</p>
            <p
              className="text-7xl sm:text-8xl font-semibold text-[#1A1A1A] leading-none"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {String(ctx.step).padStart(2, '0')}
            </p>
          </motion.div>

          {/* Time + note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="pt-1"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A96E] bg-[#FDF8F0] border border-[#C9A96E]/25 px-3 py-1.5 rounded-full mb-4">
              {ctx.time}
            </span>
            <p className="text-[15px] text-[#5C5754] font-light leading-relaxed max-w-sm">
              {ctx.note}
            </p>
          </motion.div>
        </div>

        {/* Pairing note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="bg-[#FAF8F5] rounded-2xl p-5 mb-10 border border-stone-100"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-2.5">Let op</p>
          <p className="text-[13px] text-[#6B6560] font-light leading-relaxed">{ctx.pairingNote}</p>
        </motion.div>

        {/* Related products as pairing chips */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9A9590] mb-4">Combineert goed met</p>
            <div className="flex flex-wrap gap-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/products/${rel.slug}`}
                  className="group flex items-center gap-3 bg-[#FAF8F5] rounded-xl border border-stone-100 px-4 py-3 hover:border-[#C9A96E]/40 hover:bg-white transition-all duration-200"
                >
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={rel.heroImage}
                      alt={rel.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-[#1A1A1A] group-hover:text-[#C9A96E] transition-colors truncate">
                      {rel.name}
                    </p>
                    <p className="text-[10px] text-[#9A9590]">€{rel.price}</p>
                  </div>
                  <svg
                    className="w-3 h-3 text-stone-300 group-hover:text-[#C9A96E] transition-colors shrink-0 ml-1"
                    viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M2 6h8M6 2l4 4-4 4"/>
                  </svg>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
