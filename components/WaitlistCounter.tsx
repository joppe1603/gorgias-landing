'use client'

import { useEffect, useState } from 'react'

type CounterVariant = 'badge' | 'inline' | 'hero'

export default function WaitlistCounter({ variant = 'badge' }: { variant?: CounterVariant }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? null))
      .catch(() => setCount(null))
  }, [])

  // If count couldn't be fetched, show static trust signal
  if (count === null) {
    if (variant === 'badge') {
      return (
        <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#9A9590] bg-[#FAF8F5] border border-stone-100 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
          Launchlijst groeit dagelijks
        </span>
      )
    }
    if (variant === 'hero') {
      return (
        <p className="text-[13px] text-stone-500 font-light">
          Vroege toegang actief · Eerste sample batch geselecteerd
        </p>
      )
    }
    return null
  }

  if (variant === 'badge') {
    return (
      <span className="inline-flex items-center gap-2 text-[11px] font-medium text-[#9A9590] bg-[#FAF8F5] border border-stone-100 px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
        {count} {count === 1 ? 'persoon volgt' : 'mensen volgen'} de lancering
      </span>
    )
  }

  if (variant === 'hero') {
    return (
      <p className="text-[13px] text-stone-500 font-light">
        {count} {count === 1 ? 'persoon schrijft' : 'mensen schrijven'} zich in voor vroege toegang
      </p>
    )
  }

  // inline variant
  return (
    <span className="text-[#C9A96E] font-semibold">{count}</span>
  )
}
