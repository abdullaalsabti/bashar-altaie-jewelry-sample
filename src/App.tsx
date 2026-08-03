import { useTranslation } from 'react-i18next'
import { useAnchorScroll } from './hooks/useAnchorScroll'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collection from './components/Collection'
import Worn from './components/Worn'
import Craft from './components/Craft'
import Stones from './components/Stones'
import Atelier from './components/Atelier'
import Visit from './components/Visit'
import Footer from './components/Footer'

export default function App() {
  const { t, i18n } = useTranslation()
  useAnchorScroll()

  return (
    <>
      <a
        href="#main"
        className="hallmark absolute start-4 top-4 z-[80] -translate-y-24 bg-ink px-5 py-3 text-paper transition-transform focus:translate-y-0"
      >
        {t('nav.skip')}
      </a>

      {/* Remount on locale change so masked-line animations replay in the new script. */}
      <div key={i18n.language}>
        <Nav />
        <main id="main">
          <Hero />
          <Marquee />
          <Collection />
          <Worn />
          <Craft />
          <Stones />
          <Atelier />
          <Visit />
        </main>
        <Footer />
      </div>
    </>
  )
}
