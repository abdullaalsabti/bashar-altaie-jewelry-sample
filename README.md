# Bashar Altaie Jewellery

Sample marketing site for a Baghdad goldsmith. React + Vite, bilingual (EN / AR with full RTL), animation-led.

## Run

```bash
npm install
npm run dev
```

Build: `npm run build` → `dist/`. Typecheck only: `npm run lint`.

## Deploy (Vercel)

Import the repo — `vercel.json` sets the Vite framework preset. Build command `npm run build`, output `dist`. No env vars.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#0b0b0b` | Text, dark sections |
| `--color-paper` | `#ffffff` | Default surface |
| `--color-bone` | `#f5f2ec` | Alternate surface |
| `--color-champagne` | `#c2a87c` | Accent rules, marks — sampled from the gold in the product photography |
| `--color-champagne-deep` | `#9c8253` | Accent text (holds contrast on paper) |
| `--color-hairline` | `#e4dfd6` | Dividers |

Type: **Marcellus** (display — Roman inscriptional letterforms, chosen for the engraving connection) + **Jost** (body) + **IBM Plex Mono** (hallmark labels). Arabic swaps the whole stack to **Amiri** + **IBM Plex Sans Arabic** via `:root[dir='rtl']`, with looser leading so Amiri's ascenders and diacritics are not clipped.

Recurring device: a single champagne hairline that draws itself — as the scroll-progress rule under the nav, as the vertical spine in the Craft section, and as the short rule beside every section eyebrow. Spec labels are set as hallmarks (`18K · TURQUOISE · 9.2G`), the way they are stamped on the underside of a piece.

## Structure

```
src/
  App.tsx                 remounts on locale change so entrance animations replay
  i18n/                   i18next setup + en.json / ar.json; writes dir + lang to <html>
  components/
    primitives.tsx        Reveal, MaskedLines, Hallmark, DrawnRule
    Nav, Hero, Marquee, Collection, ProductModal, Craft, Stones, Atelier, Visit, Footer
```

Product copy and specs live entirely in the locale files; `PRODUCTS` in `Collection.tsx` maps a key to its image.

## Notes

- Contact form is client-side only — it shows a confirmation and resets. Wire it to a Vercel function or form service before real use.
- Prices read "On request"; no commerce layer.
- Reduced motion is respected globally, focus is visible on every control, and the layout holds from 390px up.
