# Lighthouse report

Measured locally against `npm run build && npm run preview` (desktop-default Lighthouse run, headless Chrome, English locale, one run — scores vary between runs).

| Category | Score |
| --- | --- |
| Performance | 79 |
| Accessibility | 90 |
| Best practices | 100 |
| SEO | 92 |

## Known findings (follow-up work)
- **Accessibility:** `color-contrast` failures; `list` / `listitem` structure issues.
- **Performance:** Largest Contentful Paint is slow (hero image); consider resizing/compressing images.
- **SEO:** no `robots.txt`.

Reproduce: `npx lighthouse http://localhost:4173 --view` while `npm run preview` is running.
