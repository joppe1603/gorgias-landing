'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: 'bg-orange-50 text-[#FF4F00]',
    title: 'AI-Powered Automation',
    description:
      'Let AI handle your most repetitive tickets — order tracking, returns, FAQs — so your team focuses on high-value conversations that grow revenue.',
    points: ['Smart intent detection', 'Auto-close resolved tickets', 'GPT-4 powered responses'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600',
    title: 'Omnichannel Inbox',
    description:
      'Unify email, live chat, voice, SMS, WhatsApp, Instagram, and Facebook into a single shared inbox. No more tab-switching.',
    points: ['All channels in one view', 'Collision detection', 'Real-time agent presence'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M16 3v4M8 3v4M16 17v4M8 17v4"/>
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600',
    title: 'Deep Shopify Integration',
    description:
      'See full order history, edit orders, issue refunds, and cancel subscriptions — all without leaving the support ticket.',
    points: ['One-click refunds & edits', 'Full order timeline', 'Custom metafields'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10"/>
        <path d="M18 20V4"/>
        <path d="M6 20v-4"/>
      </svg>
    ),
    color: 'bg-green-50 text-green-600',
    title: 'Revenue Analytics',
    description:
      'Track exactly how much revenue your support team generates. See CSAT, response times, and conversion metrics in one dashboard.',
    points: ['Revenue attribution', 'CSAT tracking', 'Custom reports & exports'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    color: 'bg-yellow-50 text-yellow-600',
    title: 'Smart Macros & Rules',
    description:
      'Set up automated workflows that tag, assign, and respond to tickets based on content, customer data, or order status — no coding required.',
    points: ['Condition-based routing', '200+ pre-built macros', 'Multi-step workflows'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: 'bg-pink-50 text-pink-600',
    title: 'Team Collaboration',
    description:
      'Leave internal notes, @mention teammates, set ticket assignments, and manage agent workloads with live metrics and SLA monitoring.',
    points: ['Internal notes & @mentions', 'SLA management', 'Workload view'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FF4F00] bg-orange-50 px-4 py-1.5 rounded-full mb-4">
            Everything you need
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Built for ecommerce,
            <br />
            <span className="gradient-text">designed to convert</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From first contact to repeat purchase, Gorgias gives your team
            the tools to deliver exceptional support at every touchpoint.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="card-hover group relative bg-white rounded-2xl border border-gray-100 p-7 shadow-sm hover:border-orange-100"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{feature.description}</p>

              {/* Points */}
              <ul className="space-y-2">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="#FF4F00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4F00] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="#" className="btn-orange inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm">
            Explore all features
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
