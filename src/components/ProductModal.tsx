import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import type { ProductKey } from './Collection'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ProductModal({
  productKey,
  image,
  onClose,
}: {
  productKey: ProductKey | null
  image: string
  onClose: () => void
}) {
  const { t } = useTranslation()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!productKey) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [productKey, onClose])

  const base = `collection.items.${productKey}`

  return (
    <AnimatePresence>
      {productKey && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-stretch justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button
            aria-label={t('collection.close')}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/55 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(`${base}.name`)}
            className="relative flex h-full w-full flex-col overflow-y-auto bg-paper md:w-[min(940px,92vw)] md:flex-row"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="grain relative h-64 shrink-0 md:h-auto md:w-[46%]">
              <img src={image} alt={t(`${base}.name`)} className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-1 flex-col p-7 md:p-12">
              <div className="flex items-start justify-between gap-6">
                <span className="hallmark text-champagne-deep">{t(`${base}.type`)}</span>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="hallmark shrink-0 border-b border-ink pb-0.5 transition-colors hover:border-champagne hover:text-champagne-deep"
                >
                  {t('collection.close')}
                </button>
              </div>

              <h3 className="display mt-5 text-[clamp(2rem,4vw,3rem)]">{t(`${base}.name`)}</h3>
              <p className="mt-5 leading-relaxed text-smoke">{t(`${base}.detail`)}</p>

              <dl className="mt-8 border-t border-hairline">
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline py-3">
                  <dt className="hallmark text-[10px] text-smoke">{t('stones.eyebrow')}</dt>
                  <dd className="text-sm">{t(`${base}.stone`)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline py-3">
                  <dt className="hallmark text-[10px] text-smoke">{t('collection.priceLabel')}</dt>
                  <dd className="text-sm">{t(`${base}.price`)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-hairline py-3">
                  <dt className="hallmark text-[10px] text-smoke">{t('collection.specs')}</dt>
                  <dd className="hallmark text-ink">{t(`${base}.hallmark`)}</dd>
                </div>
              </dl>

              <a
                href="#visit"
                onClick={onClose}
                className="hallmark mt-auto inline-block bg-ink px-7 py-4 pt-4 text-center text-paper transition-colors hover:bg-champagne-deep"
              >
                {t('collection.enquire')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
