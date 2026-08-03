import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Hallmark, MaskedLines, Reveal } from './primitives'

const MAP_URL = 'https://maps.google.com/?q=Bash+Jewelers+Subhi+Al-Omari+Street+Sweifieh+Amman'

function Field({
  id,
  label,
  placeholder,
  textarea,
}: {
  id: string
  label: string
  placeholder?: string
  textarea?: boolean
}) {
  const shared =
    'peer w-full border-b border-hairline bg-transparent py-3 text-[15px] outline-none transition-colors placeholder:text-smoke/45 focus:border-champagne'
  return (
    <div className="relative">
      <label htmlFor={id} className="hallmark text-[10px] text-smoke">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={id} rows={3} placeholder={placeholder} required className={`${shared} resize-none`} />
      ) : (
        <input id={id} name={id} type="text" placeholder={placeholder} required className={shared} />
      )}
    </div>
  )
}

export default function Visit() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    e.currentTarget.reset()
    window.setTimeout(() => setSent(false), 4500)
  }

  return (
    <section id="visit" className="grain relative bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-champagne" />
              <Hallmark className="text-champagne">{t('visit.eyebrow')}</Hallmark>
            </div>
          </Reveal>
          <MaskedLines text={t('visit.title')} className="display mt-6 text-[clamp(2.25rem,4.6vw,3.75rem)]" />
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-sm leading-relaxed text-white/55">{t('visit.body')}</p>
            <dl className="mt-10 space-y-4 border-t border-white/12 pt-7">
              {(['address', 'hours', 'phone'] as const).map((k) => (
                <div key={k} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <dt className="hallmark w-24 shrink-0 text-[10px] text-champagne">
                    {t(`visit.labels.${k}`)}
                  </dt>
                  <dd className="text-[15px] text-white/80">
                    {k === 'hours' ? (
                      t('visit.hours')
                    ) : (
                      <a
                        href={k === 'phone' ? 'tel:+962795557086' : MAP_URL}
                        dir={k === 'phone' ? 'ltr' : undefined}
                        target={k === 'phone' ? undefined : '_blank'}
                        rel={k === 'phone' ? undefined : 'noreferrer'}
                        className="inline-block border-b border-white/20 pb-0.5 transition-colors hover:border-champagne hover:text-champagne"
                      >
                        {t(`visit.${k}`)}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={onSubmit} className="flex flex-col gap-8 [&_input]:text-paper [&_textarea]:text-paper">
            <div className="grid gap-8 md:grid-cols-2">
              <Field id="name" label={t('visit.name')} />
              <Field id="contact" label={t('visit.contact')} />
            </div>
            <Field id="message" label={t('visit.message')} placeholder={t('visit.messagePlaceholder')} textarea />

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                className="hallmark group relative overflow-hidden border border-champagne px-8 py-4 text-champagne"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">
                  {t('visit.submit')}
                </span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-champagne transition-transform duration-600 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              </button>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="hallmark text-champagne"
                  >
                    {t('visit.sent')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
