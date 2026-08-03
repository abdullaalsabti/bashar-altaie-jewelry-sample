import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'motion/react'

export default function Marquee() {
  const { t, i18n } = useTranslation()
  const still = useReducedMotion()
  const text = t('marquee')
  const rtl = i18n.language === 'ar'

  return (
    <div className="relative overflow-hidden border-y border-hairline bg-bone py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={still ? undefined : { x: rtl ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="hallmark text-smoke">
            {text}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-bone to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-bone to-transparent rtl:bg-gradient-to-r" />
    </div>
  )
}
