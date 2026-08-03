import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import ar from './ar.json'

export const LOCALES = ['en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]

const STORAGE_KEY = 'ba-locale'

function initialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ar') return stored
  return navigator.language.startsWith('ar') ? 'ar' : 'en'
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: initialLocale(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export function applyDocumentLocale(locale: Locale) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale
  document.documentElement.dir = dir
  localStorage.setItem(STORAGE_KEY, locale)
}

applyDocumentLocale(i18n.language as Locale)

export default i18n
