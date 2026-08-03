import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Hallmark, MaskedLines, Reveal } from './primitives'

type Shot = {
  key: string
  image: string
  /** Grid placement — deliberately uneven, so it reads as a contact sheet. */
  span: string
  ratio: string
  /** Crop anchor; `top` keeps faces and pendants in frame when cropped. */
  position?: string
}

const SHOTS: Shot[] = [
  {
    key: 'turquoiseDrop',
    image: '/images/worn-turquoise-drop.jpg',
    span: 'md:col-span-7',
    // Cropped high: the source has an Instagram lockup burned into its lower edge.
    ratio: 'aspect-[4/5]',
    position: 'object-[50%_12%]',
  },
  {
    key: 'tughra',
    image: '/images/worn-tughra-tiered.jpg',
    span: 'md:col-span-5 md:mt-16',
    ratio: 'aspect-[3/4]',
  },
  {
    key: 'rashadi',
    image: '/images/worn-rashadi-opal.jpg',
    span: 'md:col-span-5',
    ratio: 'aspect-[3/4]',
  },
  {
    key: 'marquise',
    image: '/images/worn-marquise-suite.jpg',
    span: 'md:col-span-7 md:-mt-8',
    ratio: 'aspect-[4/5]',
  },
  {
    key: 'line',
    image: '/images/worn-line-necklace.jpg',
    span: 'md:col-span-12',
    ratio: 'aspect-[16/10]',
    position: 'object-[50%_35%]',
  },
]

function Shot({ shot, index }: { shot: Shot; index: number }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const base = `worn.shots.${shot.key}`

  return (
    <motion.figure
      ref={ref}
      className={`group relative ${shot.span}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`grain relative w-full overflow-hidden ${shot.ratio}`}>
        <motion.img
          src={shot.image}
          alt={t(`${base}.alt`)}
          style={{ y }}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-[110%] w-full object-cover ${shot.position ?? ''} transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]`}
        />
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hairline pt-3">
        <span className="display text-lg">{t(`${base}.name`)}</span>
        <Hallmark className="text-[10px]">{t(`${base}.spec`)}</Hallmark>
      </figcaption>
    </motion.figure>
  )
}

export default function Worn() {
  const { t } = useTranslation()

  return (
    <section id="worn" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-champagne" />
                <Hallmark>{t('worn.eyebrow')}</Hallmark>
              </div>
            </Reveal>
            <MaskedLines text={t('worn.title')} className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]" />
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <p className="max-w-sm leading-relaxed text-smoke">{t('worn.body')}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-20 md:grid-cols-12">
          {SHOTS.map((shot, i) => (
            <Shot key={shot.key} shot={shot} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
