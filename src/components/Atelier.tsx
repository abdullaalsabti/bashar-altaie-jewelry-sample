import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Hallmark, Reveal } from './primitives'

export default function Atelier() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="atelier" className="bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div ref={ref} className="grain relative aspect-[4/5] overflow-hidden lg:col-span-5">
          <motion.img
            src="/images/necklace-earing-set1.jpg"
            alt="Amethyst and pearl suite on velvet"
            style={{ y }}
            className="absolute inset-0 h-[116%] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-champagne" />
              <Hallmark>{t('atelier.eyebrow')}</Hallmark>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="display mt-8 text-[clamp(1.6rem,2.9vw,2.5rem)] leading-[1.18]">
              <span className="text-champagne">“</span>
              {t('atelier.quote')}
              <span className="text-champagne">”</span>
            </blockquote>
            <p className="hallmark mt-6 text-smoke">— {t('atelier.attribution')}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 grid gap-6 border-t border-hairline pt-8 md:grid-cols-2">
              <p className="leading-relaxed text-smoke">{t('atelier.body1')}</p>
              <p className="leading-relaxed text-smoke">{t('atelier.body2')}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
