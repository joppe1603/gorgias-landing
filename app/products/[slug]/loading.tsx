export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-[104px] bg-stone-50 border-b border-stone-100" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="aspect-square rounded-3xl bg-stone-100" />

          {/* Info skeleton */}
          <div className="space-y-4 lg:pt-4">
            <div className="h-5 w-24 bg-stone-100 rounded-full" />
            <div className="h-10 w-3/4 bg-stone-100 rounded-xl" />
            <div className="h-4 w-1/2 bg-stone-100 rounded-xl" />
            <div className="h-4 w-40 bg-stone-100 rounded-xl" />
            <div className="h-12 w-32 bg-stone-100 rounded-xl" />
            <div className="h-20 bg-stone-100 rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-stone-100 rounded-xl" />
              ))}
            </div>
            <div className="h-14 bg-stone-200 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
