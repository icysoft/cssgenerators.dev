# cssgenerators.dev

Free online CSS generator tools for front-end developers. Live preview, one click to copy.

**Live site:** [cssgenerators.dev](https://cssgenerators.dev)

## Tools

| Tool | URL | Keyword |
|------|-----|---------|
| Text Shadow | `/css-text-shadow-generator` | css text shadow generator |
| Filter | `/css-filter-generator` | css filter generator |
| Flexbox | `/css-flexbox-generator` | css flex generator |
| Box Shadow | `/css-box-shadow-generator` | box-shadow css generator |
| Drop Shadow | `/css-drop-shadow-generator` | css drop shadow generator |
| Button | `/css-button-generator` | generate button css |
| Grid | `/css-grid-generator` | css grid generator |
| Border | `/css-border-generator` | css border generator |
| Clip Path | `/css-clip-path-generator` | clip path css generator |
| Triangle | `/css-triangle-generator` | css triangle generator |
| Arrow | `/css-arrow-generator` | css arrow generator |
| Speech Bubble | `/css-speech-bubble-generator` | speech bubble css generator |
| Gradient | `/css-gradient-generator` | css gradient generator |

## Stack

- [Astro](https://astro.build) — static site generator
- [React](https://react.dev) — interactive tool islands (`client:load`)
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting + CDN

100% client-side. No backend, no database, no sign-up.

## Dev

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Deployment

Push to `main` → Cloudflare Pages auto-deploys.

Build settings:
- Build command: `npm run build`
- Output directory: `dist`

## Indexing

After deploying, submit all URLs to search engines:

```bash
npm run indexnow
```

Submits 14 URLs to [IndexNow](https://www.indexnow.org) (relayed to Bing, Yandex, Seznam).

## License

MIT — generated CSS is free to use in any project, commercial or personal, without attribution.
