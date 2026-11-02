# Contributing

Thanks for your interest! Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setup

```bash
git clone https://github.com/abdullaalsabti/bashar-altaie-jewelry-sample.git
cd bashar-altaie-jewelry-sample
npm ci
npm run dev
```

Requires Node.js 20+.

## Branches and pull requests

1. Fork the repo and branch from `main`: `feat/short-name`, `fix/short-name` or `docs/short-name`.
2. Keep changes focused. Update both `en.json` and `ar.json` for any new text.
3. Before pushing, run:
   ```bash
   npm run typecheck && npm test && npm run build
   ```
4. Open a PR against `main` using the PR template. CI must pass.
5. For UI changes, check both English (LTR) and Arabic (RTL), keyboard navigation, and reduced motion.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `fix: correct RTL nav spacing`).

## Reporting bugs

Open an issue with the [bug report form](https://github.com/abdullaalsabti/bashar-altaie-jewelry-sample/issues/new/choose): steps to reproduce, expected vs actual behaviour, browser and OS, and language. For security issues, see [SECURITY.md](SECURITY.md) instead.
