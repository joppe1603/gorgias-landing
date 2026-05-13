'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="relative pt-28 pb-0 overflow-hidden bg-white">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      {/* Soft gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-orange-50/60 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white border border-orange-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <span className="w-2 h-2 bg-[#FF4F00] rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-[#FF4F00]">#1 Helpdesk for Ecommerce</span>
          <span className="text-sm text-gray-400">· Trusted by 17,000+ brands</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6"
        >
          Support that turns
          <br />
          <span className="gradient-text">shoppers into fans</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Gorgias centralizes every support channel, automates 60% of tickets with AI,
          and turns your support team into a revenue engine — all in one platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="#"
            className="btn-orange px-8 py-4 rounded-2xl font-semibold text-base w-full sm:w-auto"
          >
            Start free trial
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base text-gray-700 border-2 border-gray-200 hover:border-[#FF4F00] hover:text-[#FF4F00] transition-all w-full sm:w-auto justify-center"
          >
            Book a demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </motion.div>

        {/* Social proof line */}
        <motion.p {...fadeUp(0.35)} className="text-sm text-gray-400 mb-16">
          No credit card required · 7-day free trial · Setup in minutes
        </motion.p>

        {/* Product Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow effect behind mockup */}
          <div className="absolute inset-x-20 top-4 h-full bg-gradient-to-b from-orange-100/40 to-transparent blur-2xl rounded-3xl pointer-events-none -z-10" />

          {/* Browser window */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden ring-1 ring-gray-100">
            {/* Browser bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 max-w-xs mx-auto bg-white border border-gray-200 rounded-lg py-1.5 px-3 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <circle cx="5" cy="5" r="3.5"/>
                  <path d="M8.5 8.5L11 11" strokeLinecap="round"/>
                </svg>
                <span className="text-xs text-gray-400">app.gorgias.com/dashboard</span>
              </div>
            </div>

            {/* App layout */}
            <div className="flex h-[480px] bg-gray-50/30">
              {/* Left sidebar */}
              <div className="w-56 bg-white border-r border-gray-100 flex flex-col">
                {/* Workspace header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#FF4F00] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">G</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Gorgias Demo</span>
                  </div>
                </div>

                {/* Nav items */}
                <nav className="p-3 space-y-1">
                  {[
                    { label: 'All open', count: 47, active: true, icon: '📥' },
                    { label: 'Assigned to me', count: 12, active: false, icon: '👤' },
                    { label: 'Unassigned', count: 23, active: false, icon: '❓' },
                    { label: 'Snoozed', count: 8, active: false, icon: '😴' },
                    { label: 'Closed', count: null, active: false, icon: '✅' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                        item.active
                          ? 'bg-orange-50 text-[#FF4F00]'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-xs font-medium flex-1">{item.label}</span>
                      {item.count && (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                          item.active ? 'bg-[#FF4F00] text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Ticket list */}
                <div className="flex-1 overflow-hidden border-t border-gray-100 mt-1">
                  <div className="p-3 space-y-1">
                    {[
                      { name: 'Emma Wilson', msg: 'Where is my order?', time: '2m', color: 'bg-blue-400', channel: '✉️', unread: true },
                      { name: 'Jake Chen', msg: 'Request for refund #4821', time: '8m', color: 'bg-purple-400', channel: '💬', unread: true },
                      { name: 'Sarah K.', msg: 'Product arrived damaged', time: '15m', color: 'bg-green-400', channel: '✉️', unread: false },
                      { name: 'Tom Rivera', msg: 'Size exchange question', time: '1h', color: 'bg-yellow-500', channel: '📱', unread: false },
                    ].map((ticket, i) => (
                      <div
                        key={ticket.name}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                          i === 0 ? 'bg-orange-50 border border-orange-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-7 h-7 ${ticket.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {ticket.name[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <p className={`text-xs font-semibold truncate ${ticket.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                              {ticket.name}
                            </p>
                            <span className="text-xs">{ticket.channel}</span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{ticket.msg}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-xs text-gray-400">{ticket.time}</span>
                          {ticket.unread && <div className="w-2 h-2 bg-[#FF4F00] rounded-full" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col">
                {/* Ticket header */}
                <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-gray-900">Emma Wilson</h3>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">Order #4921</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">✉️ Via email</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">2 minutes ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">
                      New
                    </span>
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100">
                      Assign
                    </span>
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100">
                      Tag
                    </span>
                  </div>
                </div>

                {/* Customer info sidebar + message */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Messages */}
                  <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {/* Customer message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        E
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-gray-100 max-w-sm shadow-sm">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Hi! I placed an order 5 days ago (#4921) and haven't received any shipping confirmation yet. Can you help me track it?
                        </p>
                        <p className="text-xs text-gray-400 mt-2">Emma · 2 min ago</p>
                      </div>
                    </div>

                    {/* AI draft reply */}
                    <div className="flex gap-3 justify-end">
                      <div className="relative">
                        <div className="bg-orange-50 rounded-2xl rounded-tr-none p-4 border border-orange-100 max-w-sm">
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-4 h-4 bg-[#FF4F00] rounded-full flex items-center justify-center">
                              <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
                                <path d="M4 1L6 3H2L4 1ZM4 7L2 5H6L4 7Z"/>
                              </svg>
                            </div>
                            <span className="text-xs font-semibold text-[#FF4F00]">AI Assist · Draft</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Hi Emma! I found your order #4921. It was shipped yesterday via FedEx (tracking: FX392847). Expected delivery is tomorrow by 8 PM. 🎉
                          </p>
                          <p className="text-xs text-gray-400 mt-2">Review & edit before sending</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer sidebar */}
                  <div className="w-48 border-l border-gray-100 bg-gray-50/50 p-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Customer</p>
                      <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-gray-800">Emma Wilson</p>
                        <p className="text-xs text-gray-500">emma@email.com</p>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-yellow-500">★★★★★</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Recent Orders</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-2 border border-gray-100">
                          <p className="text-xs font-semibold text-gray-700">#4921 · $89</p>
                          <p className="text-xs text-gray-400">In transit</p>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-gray-100">
                          <p className="text-xs font-semibold text-gray-700">#4812 · $124</p>
                          <p className="text-xs text-gray-400">Delivered</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">LTV</p>
                      <p className="text-sm font-bold text-gray-800">$1,240</p>
                    </div>
                  </div>
                </div>

                {/* Reply input */}
                <div className="bg-white border-t border-gray-100 p-4">
                  <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 hover:border-gray-300 transition-colors">
                    <div className="flex-1 text-sm text-gray-400">
                      Hi Emma! I found your order #4921. It was shipped yesterday via...
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="text-gray-400 hover:text-gray-600 text-xs px-2 py-1 rounded-lg hover:bg-gray-100">
                        ✨ Rephrase
                      </button>
                      <button className="btn-orange text-xs font-semibold px-4 py-2 rounded-lg">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating stat badges */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 min-w-[140px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                <span className="text-base">⚡</span>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">60%</p>
                <p className="text-xs text-gray-500 leading-tight">automated</p>
              </div>
            </div>
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF4F00] rounded-full" style={{ width: '60%' }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-8 top-1/4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 min-w-[140px]"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center">
                <span className="text-base">⭐</span>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">4.4 / 5</p>
                <p className="text-xs text-gray-500">Shopify App Store</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-3 border border-gray-100 flex items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">AI response generated in <strong className="text-gray-800">1.2s</strong></span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">CSAT <strong className="text-[#FF4F00]">98%</strong></span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="h-32 bg-gradient-to-b from-transparent to-gray-50 mt-24" />
    </section>
  )
}
