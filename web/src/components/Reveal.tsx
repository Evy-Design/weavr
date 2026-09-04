'use client'

import {motion} from 'motion/react'
import type {ReactNode} from 'react'

export function Reveal({
  children,
  delay = 0,
  className,
  fade = true,
}: {
  children: ReactNode
  delay?: number
  className?: string
  fade?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{opacity: fade ? 0 : 1, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.6, delay, ease: [0.22, 1, 0.36, 1]}}
    >
      {children}
    </motion.div>
  )
}

export function RevealCta({
  children,
  delay = 0,
  className,
  scale = false,
  duration = 0.9,
  y = 56,
}: {
  children: ReactNode
  delay?: number
  className?: string
  scale?: boolean
  duration?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y, scale: scale ? 0.92 : 1}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, margin: '-100px'}}
      transition={{duration, delay, ease: [0.16, 1, 0.3, 1]}}
    >
      {children}
    </motion.div>
  )
}

export function RevealDown({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y: -56}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-100px'}}
      transition={{duration: 0.9, delay, ease: [0.16, 1, 0.3, 1]}}
    >
      {children}
    </motion.div>
  )
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-80px'}}
      variants={{
        hidden: {},
        visible: {transition: {staggerChildren: stagger}},
      }}
    >
      {children}
    </motion.div>
  )
}

const revealItem = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: [0.22, 1, 0.36, 1] as const}},
}

export function RevealItem({children, className}: {children: ReactNode; className?: string}) {
  return (
    <motion.div variants={revealItem} className={className}>
      {children}
    </motion.div>
  )
}
