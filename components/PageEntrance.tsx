'use client'

import { Children, type ReactNode } from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function PageEntrance({ children }: { children: ReactNode }) {
  const nodes = Children.toArray(children)
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="overflow-x-hidden"
    >
      {nodes.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.main>
  )
}
