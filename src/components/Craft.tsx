import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useSpring } from 'motion/react'
import { Hallmark, MaskedLines, Reveal } from './primitives'

const STEPS = ['one', 'two', 'three', 'four'] as const

export default function Craft() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <section id="craft" className="grain relative bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-champagne" />
                <Hallmark className="text-champagne">{t('craft.eyebrow')}</Hallmark>
              </div>
            </Reveal>
            <MaskedLines
              text={t('craft.title')}
              className="display mt-6 text-[clamp(2.25rem,4.6vw,3.75rem)]"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-sm leading-relaxed text-white/55">{t('craft.body')}</p>
            </Reveal>
          </div>

          {/* The stroke: one continuous champagne line that draws itself as you read. */}
          <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
            <div className="absolute inset-y-0 start-[7px] w-px bg-white/12" aria-hidden />
            <motion.div
              aria-hidden
              className="absolute inset-y-0 start-[7px] w-px origin-top bg-champagne"
              style={{ scaleY: draw }}
            />

            {STEPS.map((step, i) => (
              <Reveal key={step} delay={i * 0.06} className="relative ps-12 pb-12 last:pb-0">
                <motion.span
                  className="absolute start-0 top-1.5 h-3.5 w-3.5 rounded-full border border-champagne bg-ink"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-20% 0px' }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <h3 className="display text-2xl md:text-[1.7rem]">{t(`craft.steps.${step}.title`)}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-white/55">
                  {t(`craft.steps.${step}.body`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
