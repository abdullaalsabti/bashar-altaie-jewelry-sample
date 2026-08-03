import { useTranslation } from 'react-i18next'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collection from './components/Collection'
import Craft from './components/Craft'
import Stones from './components/Stones'
import Atelier from './components/Atelier'
import Visit from './components/Visit'
import Footer from './components/Footer'

export default function App() {
  const { i18n } = useTranslation()

  // Remount the tree on locale change so masked-line animations replay in the new script.
  return (
    <div key={i18n.language}>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <Craft />
        <Stones />
        <Atelier />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
