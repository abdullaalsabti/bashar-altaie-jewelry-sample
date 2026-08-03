import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { applyDocumentLocale, type Locale } from '../i18n'

const LINKS = [
  { id: 'collection', href: '#collection' },
  { id: 'craft', href: '#craft' },
  { id: 'stones', href: '#stones' },
  { id: 'atelier', href: '#atelier' },
] as const

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 40))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function toggleLocale() {
    const next: Locale = i18n.language === 'ar' ? 'en' : 'ar'
    void i18n.changeLanguage(next)
    applyDocumentLocale(next)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          condensed
            ? 'border-b border-hairline bg-paper/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-10">
          <a
            href="#top"
            className="group flex items-center gap-3 py-4 md:py-5"
            aria-label={`${t('brand.name')} ${t('brand.suffix')}`}
          >
            <img
              src="/images/logo.jpg"
              alt=""
              className={`logo-light w-auto transition-all duration-500 ${condensed ? 'h-9 md:h-10' : 'h-11 md:h-14'}`}
            />
            <span className="hidden flex-col border-s border-hairline ps-3 leading-tight sm:flex">
              <span className="display text-[15px] tracking-normal">
                {t('brand.name')} <span className="text-smoke">{t('brand.suffix')}</span>
              </span>
              <span className="hallmark mt-1 text-[9px] text-smoke">{t('brand.since')}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className="hallmark group relative py-2 text-ink transition-colors hover:text-champagne-deep"
              >
                {t(`nav.${l.id}`)}
                <span className="absolute -bottom-0.5 start-0 h-px w-full origin-left scale-x-0 bg-champagne transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleLocale}
              aria-label={t('nav.langLabel')}
              className="hallmark flex items-center gap-1.5 rounded-full border border-hairline px-3.5 py-2 transition-colors hover:border-champagne hover:text-champagne-deep"
            >
              <span className={i18n.language === 'en' ? 'text-ink' : 'text-smoke/50'}>EN</span>
              <span className="h-2.5 w-px bg-hairline" />
              <span className={i18n.language === 'ar' ? 'text-ink' : 'text-smoke/50'} style={{ fontFamily: 'IBM Plex Sans Arabic' }}>
                ع
              </span>
            </button>

            <a
              href="#visit"
              className="hallmark hidden bg-ink px-5 py-3 text-paper transition-colors hover:bg-champagne-deep md:inline-block"
            >
              {t('nav.visit')}
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label={t('nav.menu')}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className="h-px w-5 bg-ink" />
              <span className="h-px w-5 bg-ink" />
            </button>
          </div>
        </div>

        {/* Reading progress — the same single champagne stroke as the rest of the page. */}
        <motion.div
          aria-hidden
          className="h-px origin-left bg-champagne"
          style={{ scaleX: progress, opacity: condensed ? 1 : 0 }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink text-paper lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <img src="/images/logo.jpg" alt="" className="logo-dark h-10 w-auto" />
              <button onClick={() => setOpen(false)} className="hallmark text-champagne">
                {t('nav.close')}
              </button>
            </div>
            <nav className="mt-10 flex flex-col px-6">
              {[...LINKS, { id: 'visit', href: '#visit' }].map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display border-b border-white/10 py-5 text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t(`nav.${l.id}`)}
                </motion.a>
              ))}
            </nav>
            <p className="hallmark absolute inset-x-6 bottom-8 text-champagne">{t('brand.since')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
