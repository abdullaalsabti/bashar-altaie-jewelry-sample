import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

/** Fade + rise, triggered once when the block enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const still = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: still ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const lineVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
}

const lineChild: Variants = {
  hidden: { y: '110%' },
  shown: { y: '0%', transition: { duration: 1.05, ease: EASE } },
}

/**
 * Display headline where each line rises out of its own mask.
 * Pass a string containing \n to break lines.
 */
export function MaskedLines({
  text,
  className,
  as = 'h2',
  delay = 0,
  inView = true,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  delay?: number
  inView?: boolean
}) {
  const still = useReducedMotion()
  const Tag = motion[as]
  const lines = text.split('\n')

  const animateProps = inView
    ? ({ whileInView: 'shown', viewport: { once: true, margin: '-10% 0px' } } as const)
    : ({ animate: 'shown' } as const)

  return (
    <Tag
      className={className}
      variants={lineVariants}
      initial={still ? 'shown' : 'hidden'}
      transition={{ delayChildren: delay }}
      {...animateProps}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={lineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Stamped spec label, as found on the underside of a piece. */
export function Hallmark({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`hallmark text-champagne-deep ${className}`}>{children}</span>
}

/** Rule that draws itself in, echoing the single-stroke logo. */
export function DrawnRule({ className = '', vertical = false }: { className?: string; vertical?: boolean }) {
  const still = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={`bg-champagne ${vertical ? 'w-px' : 'h-px'} ${className}`}
      style={{ transformOrigin: vertical ? 'top' : 'var(--rule-origin, left)' }}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: still ? 0 : 1.4, ease: EASE }}
    />
  )
}
