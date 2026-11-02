import { describe, expect, it } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n, { applyDocumentLocale } from '../i18n'
import en from '../i18n/en.json'
import ar from '../i18n/ar.json'
import App from '../App'

async function setLocale(l: 'en' | 'ar') {
  await act(async () => {
    await i18n.changeLanguage(l)
    applyDocumentLocale(l)
  })
}

describe('locale files', () => {
  it('Arabic has every top-level key English has', () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort())
  })
})

describe('document direction', () => {
  it('sets rtl for Arabic and ltr for English', () => {
    applyDocumentLocale('ar')
    expect(document.documentElement.dir).toBe('rtl')
    expect(document.documentElement.lang).toBe('ar')
    expect(localStorage.getItem('ba-locale')).toBe('ar')
    applyDocumentLocale('en')
    expect(document.documentElement.dir).toBe('ltr')
    expect(document.documentElement.lang).toBe('en')
  })
})

describe('App', () => {
  it('renders main landmark, navigation and skip link', async () => {
    await setLocale('en')
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: en.nav.skip })).toHaveAttribute('href', '#main')
  })

  it('switches language and direction from the nav toggle', async () => {
    await setLocale('en')
    render(<App />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: en.nav.langLabel }))
    expect(document.documentElement.dir).toBe('rtl')
    expect(i18n.language).toBe('ar')
    expect(screen.getByRole('link', { name: ar.nav.skip })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: ar.nav.langLabel }))
    expect(document.documentElement.dir).toBe('ltr')
  })

  it('opens and closes the mobile menu with Escape', async () => {
    await setLocale('en')
    render(<App />)
    const user = userEvent.setup()
    const btn = screen.getByRole('button', { name: en.nav.menu })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })
})
