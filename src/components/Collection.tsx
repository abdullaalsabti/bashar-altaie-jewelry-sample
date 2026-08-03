import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Hallmark, MaskedLines, Reveal } from './primitives'
import ProductModal from './ProductModal'

export type ProductKey = 'ring' | 'necklace' | 'set'

export const PRODUCTS: { key: ProductKey; image: string }[] = [
  { key: 'ring', image: '/images/ring-sample1.jpg' },
  { key: 'necklace', image: '/images/necklace-sample1.jpg' },
  { key: 'set', image: '/images/necklace-earing-set1.jpg' },
]

function ProductRow({
  productKey,
  image,
  index,
  onOpen,
}: {
  productKey: ProductKey
  image: string
  index: number
  onOpen: () => void
}) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  const flip = index % 2 === 1
  const base = `collection.items.${productKey}`

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-8 border-t border-hairline py-14 md:gap-14 md:py-20 lg:grid-cols-12"
    >
      {/* Big click target for pointers. The labelled button below is the one
          keyboard and screen-reader users get, so the action isn't announced twice. */}
      <motion.button
        onClick={onOpen}
        tabIndex={-1}
        aria-hidden
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className={`group grain relative aspect-[4/3] w-full overflow-hidden lg:col-span-7 lg:aspect-[5/4] ${
          flip ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1'
        }`}
      >
        <motion.img
          src={image}
          alt={t(`${base}.name`)}
          style={{ y }}
          loading={index === 0 ? undefined : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-[114%] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045]"
        />
        {/* Sheen sweeps once on hover — the way light moves across polished gold. */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -inset-y-8 w-1/3 -translate-x-[120%] skew-x-[-18deg] bg-white/25 blur-md transition-transform duration-[1100ms] ease-out group-hover:translate-x-[320%]" />
        </span>
        <span className="absolute bottom-4 end-4 flex items-center gap-2 bg-paper/92 px-4 py-2.5 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
          <span className="hallmark text-ink">{t('collection.view')}</span>
          <span className="text-champagne-deep">→</span>
        </span>
      </motion.button>

      <div className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-2' : 'lg:col-start-9'}`}>
        <Reveal>
          <Hallmark>{t(`${base}.type`)}</Hallmark>
          <h3 className="display mt-3 text-4xl md:text-[2.9rem]">{t(`${base}.name`)}</h3>
          <p className="mt-5 leading-relaxed text-smoke">{t(`${base}.blurb`)}</p>

          <dl className="mt-7 border-t border-hairline pt-4 text-sm">
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="hallmark text-[10px] text-smoke">{t('stones.eyebrow')}</dt>
              <dd>{t(`${base}.stone`)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-hairline py-2">
              <dt className="hallmark text-[10px] text-smoke">{t('collection.specs')}</dt>
              <dd className="hallmark text-ink">{t(`${base}.hallmark`)}</dd>
            </div>
          </dl>

          <button
            onClick={onOpen}
            className="hallmark group mt-7 flex items-center gap-3 border-b border-ink pb-1.5 transition-colors hover:border-champagne hover:text-champagne-deep"
          >
            {t('collection.view')}
            <span className="sr-only"> — {t(`${base}.name`)}</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
              →
            </span>
          </button>
        </Reveal>
      </div>
    </div>
  )
}

export default function Collection() {
  const { t } = useTranslation()
  const [active, setActive] = useState<ProductKey | null>(null)

  return (
    <section id="collection" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px w-10 bg-champagne" />
                <Hallmark>{t('collection.eyebrow')}</Hallmark>
              </div>
            </Reveal>
            <MaskedLines
              text={t('collection.title')}
              className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]"
            />
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <p className="max-w-sm leading-relaxed text-smoke">{t('collection.body')}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          {PRODUCTS.map((p, i) => (
            <ProductRow
              key={p.key}
              productKey={p.key}
              image={p.image}
              index={i}
              onOpen={() => setActive(p.key)}
            />
          ))}
        </div>
      </div>

      <ProductModal
        productKey={active}
        image={PRODUCTS.find((p) => p.key === active)?.image ?? ''}
        onClose={() => setActive(null)}
      />
    </section>
  )
}
