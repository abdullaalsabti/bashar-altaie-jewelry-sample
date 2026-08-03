import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Hallmark, MaskedLines, Reveal } from './primitives'

/** Cabochon colours, sampled from the stones in the collection. */
const STONES = [
  { key: 'turquoise', body: '#4FB3C4', deep: '#1F6E7C' },
  { key: 'carnelian', body: '#A32B1E', deep: '#5C130C' },
  { key: 'amethyst', body: '#6B4A86', deep: '#33204A' },
  { key: 'pearl', body: '#F3EDE3', deep: '#C8BCA9' },
] as const

export default function Stones() {
  const { t } = useTranslation()
  const [hover, setHover] = useState<string | null>(null)

  return (
    <section id="stones" className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-champagne" />
                <Hallmark>{t('stones.eyebrow')}</Hallmark>
              </div>
            </Reveal>
            <MaskedLines
              text={t('stones.title')}
              className="display mt-6 text-[clamp(2rem,4.2vw,3.4rem)]"
            />
          </div>

          <ul className="lg:col-span-6 lg:col-start-7">
            {STONES.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.05}>
                <li
                  onMouseEnter={() => setHover(s.key)}
                  onMouseLeave={() => setHover(null)}
                  className="flex items-center gap-6 border-b border-hairline py-6 first:border-t"
                >
                  {/* Cabochon: a domed stone, drawn rather than photographed. */}
                  <motion.span
                    aria-hidden
                    className="h-11 w-11 shrink-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 34% 28%, #ffffff 0%, ${s.body} 34%, ${s.deep} 100%)`,
                      boxShadow: `inset 0 -2px 6px rgba(0,0,0,.35), 0 0 0 1px rgba(194,168,124,.9), 0 6px 14px rgba(0,0,0,.14)`,
                    }}
                    animate={{ scale: hover === s.key ? 1.14 : 1, rotate: hover === s.key ? 8 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="display text-2xl">{t(`stones.items.${s.key}.name`)}</h3>
                      <Hallmark className="text-[10px]">{t(`stones.items.${s.key}.origin`)}</Hallmark>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-smoke">
                      {t(`stones.items.${s.key}.note`)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
