'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    price: { monthly: 10, annual: 8 },
    description: 'Perfect for small teams getting started with customer support.',
    tickets: '50 tickets/month',
    popular: false,
    color: 'border-gray-200',
    btnStyle: 'border-2 border-gray-200 text-gray-700 hover:border-[#FF4F00] hover:text-[#FF4F00]',
    features: [
      'Email & live chat',
      'Shopify & BigCommerce integrations',
      '3 agent seats included',
      'Basic automation rules',
      '150+ integrations',
      'Help center (FAQ portal)',
      'Standard support (email)',
      'Mobile app',
    ],
    notIncluded: [
      'Voice & SMS',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated CSM',
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 60, annual: 50 },
    description: 'For growing brands that need automation and multi-channel support.',
    tickets: '300 tickets/month',
    popular: true,
    color: 'border-[#FF4F00]',
    btnStyle: 'btn-orange',
    features: [
      'Everything in Starter',
      'Voice & SMS channels',
      'Instagram & Facebook DM',
      '10 agent seats included',
      'Advanced AI automations',
      'Analytics dashboard',
      'CSAT surveys',
      'SLA management',
      'Priority support (chat)',
      'Revenue reporting',
    ],
    notIncluded: [
      'Custom integrations',
      'Dedicated CSM',
    ],
  },
  {
    name: 'Advanced',
    price: { monthly: 360, annual: 300 },
    description: 'For high-volume brands that need enterprise power and custom workflows.',
    tickets: '2,000 tickets/month',
    popular: false,
    color: 'border-gray-200',
    btnStyle: 'border-2 border-gray-200 text-gray-700 hover:border-[#FF4F00] hover:text-[#FF4F00]',
    features: [
      'Everything in Pro',
      'Unlimited agent seats',
      'Custom integrations (API)',
      'Dedicated Customer Success Manager',
      'White-glove onboarding',
      'Custom SLA policies',
      'Advanced reporting & BI export',
      'SOC 2 compliance reports',
      'SSO & SAML authentication',
      'Enterprise SLA (99.9% uptime)',
    ],
    notIncluded: [],
  },
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <circle cx="8" cy="8" r="7" fill="#FF4F00" fillOpacity="0.1"/>
    <path d="M5 8L7 10L11 6" stroke="#FF4F00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <circle cx="8" cy="8" r="7" fill="#f3f4f6"/>
    <path d="M6 6L10 10M10 6L6 10" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="py-28 bg-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-50/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-50/40 to-transparent rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#FF4F00] bg-orange-50 px-4 py-1.5 rounded-full mb-4">
            Simple pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Start free, scale as
            <br />
            <span className="gradient-text">you grow</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            No hidden fees, no long-term contracts. Cancel anytime.
            7-day free trial on all plans.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                !annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              Annual
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl border-2 ${plan.color} p-8 ${
                plan.popular ? 'shadow-2xl shadow-orange-100 lg:-mt-4 bg-white' : 'bg-white shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF4F00] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-md shadow-orange-200">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name + description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-black text-gray-900">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-gray-400 mb-2">/mo</span>
                </div>
                {annual && (
                  <p className="text-xs text-gray-400">
                    Billed annually (${(annual ? plan.price.annual : plan.price.monthly) * 12}/yr)
                  </p>
                )}
              </div>

              {/* Ticket volume */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 2h8l-1 7H3L2 2z"/>
                    <circle cx="4.5" cy="10" r="0.75" fill="currentColor"/>
                    <circle cx="7.5" cy="10" r="0.75" fill="currentColor"/>
                  </svg>
                  {plan.tickets}
                </span>
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`block w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-center transition-all mb-8 ${plan.btnStyle}`}
              >
                {plan.popular ? 'Start free trial' : 'Get started free'}
              </a>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-6" />

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                    <XIcon />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Need more than 2,000 tickets/month?</h4>
            <p className="text-gray-500 text-sm">
              Talk to us about an Enterprise plan with custom ticket volume, dedicated infrastructure, and a tailored onboarding program.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 px-7 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
          >
            Contact sales
          </a>
        </motion.div>

        {/* FAQ quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-400">
            Have questions?{' '}
            <a href="#" className="text-[#FF4F00] font-semibold hover:underline">Read our pricing FAQ</a>
            {' '}or{' '}
            <a href="#" className="text-[#FF4F00] font-semibold hover:underline">chat with us</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
