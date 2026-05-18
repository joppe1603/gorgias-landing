'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Review = {
  id: string
  name: string
  rating: number
  title: string | null
  body: string
  created_at: string
  verified_purchase: boolean
}

function Stars({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          disabled={!interactive}
          onClick={() => interactive && onChange?.(i)}
          onMouseEnter={() => interactive && setHover(i)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill={(interactive ? (hover || rating) : rating) >= i ? '#C9A96E' : '#E5E7EB'} aria-hidden>
            <path d="M8 1L9.8 5.5H15L10.8 8.5L12.5 13L8 10L3.5 13L5.2 8.5L1 5.5H6.2L8 1Z"/>
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function PDPReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', rating: 0, title: '', body: '' })
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/reviews?slug=${slug}`)
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  async function submitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!form.rating) { setFormError('Kies een beoordeling.'); return }
    if (!form.body) { setFormError('Schrijf een review.'); return }
    setSubmitting(true)
    setFormError('')
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, ...form }),
    })
    const json = await res.json()
    setSubmitting(false)
    if (!res.ok) { setFormError(json.error); return }
    setSubmitted(true)
    setShowForm(false)
  }

  const avgRating = reviews.length
    ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length * 10) / 10
    : null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#C9A96E]" />
              <span className="section-label">Klantreviews</span>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-semibold text-[#1A1A1A]">
                {reviews.length > 0 ? `${avgRating} ster` : 'Wees de eerste'}
              </h2>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <Stars rating={Math.round(avgRating!)} />
                  <span className="text-sm text-[#9A9590]">({reviews.length} reviews)</span>
                </div>
              )}
            </div>
          </div>
          {!submitted && (
            <button
              type="button"
              onClick={() => setShowForm(v => !v)}
              className="btn-outline px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
            >
              {showForm ? 'Annuleer' : '+ Schrijf een review'}
            </button>
          )}
        </div>

        {/* Submit success */}
        {submitted && (
          <div className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-6 mb-8 text-center">
            <p className="text-sm font-medium text-[#1A1A1A] mb-1">Bedankt voor je review!</p>
            <p className="text-xs text-[#9A9590]">Na beoordeling wordt jouw review geplaatst.</p>
          </div>
        )}

        {/* Review form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={submitReview}
              className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-6 mb-8 overflow-hidden"
            >
              <h3 className="font-semibold text-[#1A1A1A] mb-5">Jouw review</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#9A9590] mb-1.5 block">Beoordeling *</label>
                  <Stars rating={form.rating} interactive onChange={r => setForm(f => ({ ...f, rating: r }))} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#9A9590] mb-1.5 block">Naam *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="Anna de Vries"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#9A9590] mb-1.5 block">Titel</label>
                    <input
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#C9A96E] transition-colors"
                      placeholder="Geweldig product!"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-[#9A9590] mb-1.5 block">Review *</label>
                  <textarea
                    value={form.body}
                    onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                    placeholder="Vertel anderen over jouw ervaring..."
                  />
                </div>
                {formError && <p className="text-xs text-red-500">{formError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold px-6 py-3 rounded-xl text-sm font-medium cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Versturen...' : 'Review versturen'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Reviews list */}
        {loading ? (
          <p className="text-sm text-[#9A9590] text-center py-10">Reviews laden...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-[#9A9590] text-center py-10">
            Nog geen reviews. Wees de eerste!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map(r => (
              <div key={r.id} className="bg-[#FAF8F5] rounded-2xl border border-stone-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <Stars rating={r.rating} />
                  {r.verified_purchase && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Geverifieerd
                    </span>
                  )}
                </div>
                {r.title && <p className="font-semibold text-[#1A1A1A] text-sm mb-1">{r.title}</p>}
                <p className="text-[13px] text-[#5C5754] leading-relaxed font-light mb-4">{r.body}</p>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <p className="text-xs font-semibold text-[#1A1A1A]">{r.name}</p>
                  <p className="text-[10px] text-[#9A9590]">
                    {new Date(r.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
