import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { applyDocumentLocale, type Locale } from '../i18n'
import { useActiveSection } from '../hooks/useActiveSection'
import { useDialog } from '../hooks/useDialog'

const SECTIONS = ['collection', 'worn', 'craft', 'stones', 'atelier', 'visit'] as const
const LINKS = SECTIONS.slice(0, 5)

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const active = useActiveSection(SECTIONS)
  const rtl = i18n.language === 'ar'

  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 40))

  const closeMenu = useCallback(() => setOpen(false), [])
  const menuRef = useDialog(open, closeMenu)

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
              width={160}
              height={128}
              className={`logo-light w-auto transition-all duration-500 ${condensed ? 'h-9 md:h-10' : 'h-11 md:h-14'}`}
            />
            <span className="hidden flex-col border-s border-hairline ps-3 leading-tight sm:flex">
              <span className="display text-[15px] tracking-normal">
                {t('brand.name')} <span className="text-smoke">{t('brand.suffix')}</span>
              </span>
              <span className="hallmark mt-1 text-[9px] text-smoke">{t('brand.since')}</span>
            </span>
          </a>

          <nav aria-label={t('nav.primary')} className="hidden items-center gap-9 lg:flex">
            {LINKS.map((id) => {
              const current = active === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={current ? 'true' : undefined}
                  className={`hallmark group relative py-2 transition-colors hover:text-champagne-deep ${
                    current ? 'text-champagne-deep' : 'text-ink'
                  }`}
                >
                  {t(`nav.${id}`)}
                  <span
                    className={`absolute -bottom-0.5 start-0 h-px w-full bg-champagne transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 ${
                      rtl ? 'origin-right' : 'origin-left'
                    } ${current ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleLocale}
              aria-label={t('nav.langLabel')}
              className="hallmark flex items-center gap-1.5 rounded-full border border-hairline px-3.5 py-2 transition-colors hover:border-champagne hover:text-champagne-deep"
            >
              <span aria-hidden className={i18n.language === 'en' ? 'text-ink' : 'text-smoke/50'}>
                EN
              </span>
              <span aria-hidden className="h-2.5 w-px bg-hairline" />
              <span
                aria-hidden
                className={i18n.language === 'ar' ? 'text-ink' : 'text-smoke/50'}
                style={{ fontFamily: 'IBM Plex Sans Arabic' }}
              >
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
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span aria-hidden className="h-px w-5 bg-ink" />
              <span aria-hidden className="h-px w-5 bg-ink" />
            </button>
          </div>
        </div>

        {/* Reading progress — the same single champagne stroke as the rest of the page. */}
        <motion.div
          aria-hidden
          className={`h-px bg-champagne ${rtl ? 'origin-right' : 'origin-left'}`}
          style={{ scaleX: progress, opacity: condensed ? 1 : 0 }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.primary')}
            className="fixed inset-0 z-[60] bg-ink text-paper lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <img src="/images/logo.jpg" alt="" width={160} height={128} className="logo-dark h-10 w-auto" />
              <button onClick={closeMenu} className="hallmark px-2 py-2 text-champagne">
                {t('nav.close')}
              </button>
            </div>
            <nav aria-label={t('nav.primary')} className="mt-10 flex flex-col px-6">
              {SECTIONS.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={closeMenu}
                  aria-current={active === id ? 'true' : undefined}
                  className="display flex items-baseline justify-between gap-4 border-b border-white/10 py-5 text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t(`nav.${id}`)}
                  {active === id && <span className="hallmark text-[10px] text-champagne">{t('nav.here')}</span>}
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
