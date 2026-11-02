# Customizing the template

## Branding
- **Name, tagline, address, copy:** edit `src/i18n/en.json` and `src/i18n/ar.json`. Keep both files' keys identical (a test checks this).
- **Logo:** replace `public/images/logo.jpg` (used in `Nav.tsx` and `Footer.tsx`).
- **Favicons and manifest:** replace the files in `public/` and edit `public/site.webmanifest`. Page title and meta tags are in `index.html`.
- **Colours and fonts:** design tokens are in `src/index.css` (see the Design system table in the README).

## Images and products
- Put images in `public/images/` and reference them as `/images/<file>`.
- Hero image: `src/components/Hero.tsx`. Worn gallery: the list at the top of `src/components/Worn.tsx`. Collection items: `src/components/Collection.tsx`.

## Sections
Sections are composed in `src/App.tsx`. Remove or reorder a section there, and update the `SECTIONS` list in `src/components/Nav.tsx` plus the matching `nav.*` strings.

## Adding a language
1. Add `src/i18n/<code>.json` with the same keys as `en.json`.
2. Register it in `src/i18n/index.ts` (`LOCALES`, `resources`, and the RTL check in `applyDocumentLocale`).
3. Update the language toggle in `Nav.tsx`, which currently switches between two languages.

## Deploying
`vercel.json` is included for Vercel. Any static host works: run `npm run build` and serve `dist/` with an SPA fallback to `index.html`.
