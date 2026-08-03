import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Hallmark, MaskedLines } from './primitives'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const stats = ['stat1', 'stat2', 'stat3'] as const

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-paper pt-24 md:pt-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-0 px-6 md:px-10 lg:grid-cols-[1.05fr_1fr]">
        {/* Type column */}
        <div className="flex flex-col justify-center py-10 lg:py-24 lg:pe-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-champagne" />
            <Hallmark>{t('hero.eyebrow')}</Hallmark>
          </motion.div>

          <MaskedLines
            as="h1"
            inView={false}
            delay={0.25}
            text={`${t('hero.line1')}\n${t('hero.line2')}\n${t('hero.line3')}`}
            className="display mt-7 text-[clamp(2.75rem,7.6vw,6.1rem)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-8 max-w-md text-[17px] leading-relaxed text-smoke"
          >
            {t('hero.body')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#collection"
              className="hallmark group relative overflow-hidden bg-ink px-7 py-4 text-paper"
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <span className="absolute inset-y-0 -start-full w-full bg-champagne-deep transition-transform duration-600 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-full rtl:group-hover:-translate-x-full" />
            </a>
            <a href="#visit" className="hallmark border-b border-ink pb-1 transition-colors hover:border-champagne hover:text-champagne-deep">
              {t('nav.visit')}
            </a>
          </motion.div>

          {/* Stats, separated by hairlines rather than boxed in cards. */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14 grid grid-cols-3 divide-x divide-hairline border-t border-hairline pt-6 rtl:divide-x-reverse"
          >
            {stats.map((s, i) => (
              <div key={s} className={i === 0 ? 'pe-4 md:pe-7' : 'px-4 md:px-7'}>
                <dt className="display text-2xl md:text-3xl">{t(`hero.${s}.value`)}</dt>
                <dd className="hallmark mt-2 text-[9px] tracking-[0.12em] text-smoke md:text-[10px] md:tracking-[0.22em]">
                  {t(`hero.${s}.label`)}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Image column — bleeds off the right edge of the grid. */}
        <motion.div
          className="grain relative min-h-[52vh] overflow-hidden lg:min-h-[calc(100svh-7rem)] lg:mb-0"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
        >
          <motion.img
            src="/images/ring-sample1.jpg"
            alt="Nishapur turquoise signet ring in 18K gold"
            style={{ y: imageY }}
            fetchPriority="high"
            decoding="async"
            className="drift absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute bottom-5 start-5 flex items-center gap-3">
            <span className="h-px w-6 bg-champagne" />
            <span className="hallmark text-[10px] text-white/90">
              {t('collection.items.ring.hallmark')}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="hallmark text-[9px] text-smoke">{t('hero.scroll')}</span>
        <motion.span
          className="h-10 w-px origin-top bg-champagne"
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
