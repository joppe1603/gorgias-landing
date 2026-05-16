'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function PDPTextureGallery({ product }: { product: Product }) {
  const images = product.textureImages
  if (!images || images.length < 2) return null

  const [main, second, third] = images

  return (
    <section className="py-20 bg-[#0F0E0C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-px bg-[#C9A96E]" />
          <span className="section-label text-[#C9A96E]">In gebruik</span>
        </motion.div>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-3 gap-3 mb-10" style={{ height: 'clamp(280px, 44vw, 520px)' }}>

          {/* Main image — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-2 relative rounded-2xl overflow-hidden"
          >
            <Image
              src={main}
              alt={`${product.name} in gebruik`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 66vw, 50vw"
            />
            {/* Grain on image */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
              <filter id="grain-tex-main">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#grain-tex-main)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
          </motion.div>

          {/* Stack of 2 smaller images — 1/3 width */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 relative rounded-2xl overflow-hidden"
            >
              <Image
                src={second}
                alt={`${product.name} textuur`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 18vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/15" />
            </motion.div>

            {third && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 relative rounded-2xl overflow-hidden"
              >
                <Image
                  src={third}
                  alt={`${product.name} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 18vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/10" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Texture quote */}
        {product.textureNote && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-2xl"
          >
            <p className="text-xl sm:text-2xl text-stone-300 font-light italic leading-relaxed">
              &ldquo;{product.textureNote}&rdquo;
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
