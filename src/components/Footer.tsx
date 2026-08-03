import { useTranslation } from 'react-i18next'
import { Hallmark } from './primitives'

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/bashjewelers' },
  { label: 'WhatsApp', href: 'https://wa.me/962795557086' },
  { label: 'bashjewelers.com', href: 'https://www.bashjewelers.com' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-paper py-14">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <img src="/images/logo.jpg" alt={t('brand.name')} className="logo-light h-14 w-auto" />
            <p className="mt-5 max-w-xs leading-relaxed text-smoke">{t('footer.tagline')}</p>
          </div>

          <nav className="md:col-span-3 md:col-start-7">
            <Hallmark className="text-[10px] text-smoke">{t('footer.explore')}</Hallmark>
            <ul className="mt-4 space-y-2.5">
              {['collection', 'craft', 'stones', 'atelier'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-[15px] transition-colors hover:text-champagne-deep">
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <Hallmark className="text-[10px] text-smoke">{t('footer.contact')}</Hallmark>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <a
                  href="https://maps.google.com/?q=Bash+Jewelers+Subhi+Al-Omari+Street+Sweifieh+Amman"
                  target="_blank"
                  rel="noreferrer"
                  className="text-smoke transition-colors hover:text-champagne-deep"
                >
                  {t('visit.address')}
                </a>
              </li>
              <li>
                <a
                  href="tel:+962795557086"
                  dir="ltr"
                  className="inline-block text-smoke transition-colors hover:text-champagne-deep"
                >
                  {t('visit.phone')}
                </a>
              </li>
            </ul>
            <Hallmark className="mt-6 block text-[10px] text-smoke">{t('footer.follow')}</Hallmark>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2.5">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hallmark border-b border-hairline pb-1 transition-colors hover:border-champagne hover:text-champagne-deep"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="hallmark text-[10px] text-smoke">
            © {year} {t('brand.name')} {t('brand.suffix')}. {t('footer.rights')}
          </p>
          <p className="hallmark text-[10px] text-smoke/70">{t('footer.sample')}</p>
        </div>
      </div>
    </footer>
  )
}
