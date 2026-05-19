'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const featured = {
  slug: 'waarom-minder-beter-werkt',
  title: 'Waarom minder huidverzorging bijna altijd beter werkt',
  excerpt: 'De gemiddelde vrouw gebruikt 12 producten per dag. Dermatologen raden 3 à 4 aan. Wat doen de andere 8 eigenlijk met je huid?',
  category: 'Filosofie',
  readTime: '6 min',
  date: 'Mei 2026',
  image: '/journal-featured.jpg',
}

const articles = [
  {
    slug: 'de-huidbarriere-gids',
    title: 'De complete gids voor een gezonde huidbarrière',
    excerpt: 'Waarom de barrière de basis is van alles — en hoe je weet of de jouwe beschadigd is.',
    category: 'Wetenschap',
    readTime: '8 min',
    date: 'Mei 2026',
    image: '/journal-barrier.jpg',
  },
  {
    slug: 'retinol-beginners-gids',
    title: 'Retinol voor beginners: wat je moet weten',
    excerpt: 'Hoe start je met retinol zonder irritatie? Alles wat je moet weten in één leesbare gids.',
    category: 'Ingrediënten',
    readTime: '5 min',
    date: 'April 2026',
    image: '/reset-serum-new.jpg',
  },
  {
    slug: 'ochtend-vs-avond-routine',
    title: 'Ochtend vs. avond: wanneer gebruik je wat?',
    excerpt: 'Niet alle ingrediënten horen op hetzelfde moment. Een helder overzicht zonder ingewikkeld jargon.',
    category: 'Routines',
    readTime: '4 min',
    date: 'April 2026',
    image: '/journal-routine.jpg',
  },
  {
    slug: 'skincare-fatigue',
    title: 'Skincare fatigue: hoe te veel zorg je huid schaadt',
    excerpt: 'Over-exfoliëren, te veel actieven, en het paradoxale effect van te goed voor je huid zorgen.',
    category: 'Filosofie',
    readTime: '7 min',
    date: 'Maart 2026',
    image: '/journal-fatigue.jpg',
  },
  {
    slug: 'niacinamide-alles-over',
    title: 'Niacinamide: de multitasker die in elke routine past',
    excerpt: 'Poriënverfijner, verhelderer, anti-inflammatoir. Niacinamide doet wat de meeste serums beloven.',
    category: 'Ingrediënten',
    readTime: '5 min',
    date: 'Maart 2026',
    image: '/journal-niacinamide.jpg',
  },
  {
    slug: 'minimalisme-in-de-badkamer',
    title: 'Minimalisme in de badkamer: een andere manier van kijken',
    excerpt: 'Minder producten. Meer bewustzijn. Hoe een lege plank meer zegt over huidgezondheid dan een volle.',
    category: 'Levensstijl',
    readTime: '3 min',
    date: 'Februari 2026',
    image: '/journal-minimal.jpg',
  },
]

const categoryColors: Record<string, string> = {
  Filosofie: 'bg-stone-100 text-stone-600',
  Wetenschap: 'bg-blue-50 text-blue-700',
  Ingrediënten: 'bg-[#FDF8F0] text-[#B8935A]',
  Routines: 'bg-green-50 text-green-700',
  Levensstijl: 'bg-purple-50 text-purple-700',
}

export default function JournalPageContent() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#FAF8F5] pt-16 pb-20 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#C9A96E]" />
              <span className="section-label">MAUYI Journal</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-[#1A1A1A] leading-[1.05] mb-4">
              Lezen over huid.
              <br />
              <span className="text-[#9A9590] font-normal italic">Zonder de ruis.</span>
            </h1>
            <p className="text-[#6B6560] text-lg font-light leading-relaxed max-w-xl">
              Editoriaal over ingrediënten, routines, wetenschap en intentionele schoonheid. Geen gesponsorde inhoud.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured article */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Uitgelicht artikel</p>
            <Link href={`/journal/${featured.slug}`} className="group grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-[#F5EFE6]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-4 inline-block ${categoryColors[featured.category] || 'bg-stone-100 text-stone-600'}`}>
                  {featured.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] leading-[1.1] mb-4 group-hover:text-[#C9A96E] transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-[#6B6560] leading-relaxed font-light mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-stone-400">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} lezen</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/journal/${article.slug}`} className="group block journal-card rounded-2xl overflow-hidden bg-white">
                  <div className="relative h-52 bg-[#F5EFE6] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-4 inline-block ${categoryColors[article.category] || 'bg-stone-100 text-stone-600'}`}>
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#C9A96E] transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#6B6560] leading-relaxed font-light mb-5 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-stone-400 pt-4 border-t border-stone-100">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime} lezen</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#0F0E0C]">
        <div className="max-w-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label mb-4" style={{ color: '#C9A96E' }}>Nieuw in je inbox</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 leading-[1.1]">
              Huidwetenschap zonder gedoe.
            </h2>
            <p className="text-stone-400 font-light mb-8">Tweemaandelijks. Geen spam. Altijd leesbaar.</p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="jouw@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C9A96E] transition-colors min-w-0"
              />
              <button type="submit" className="btn-gold px-5 py-3 rounded-xl text-sm font-medium shrink-0">
                Aanmelden
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
