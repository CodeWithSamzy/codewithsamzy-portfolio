# CodeWithSamzy — Kazeem Samod’s full-stack portfolio

A new portfolio built around product engineering, project decisions, and the full-stack CV supplied on 23 October 2026. The previous SamzyOS app remains in `../samzyos-v3`.

## Run

```sh
npm ci
npm run dev
```

The development server runs at http://127.0.0.1:5174.

```sh
npm run lint
npm run build
npm run test:e2e
```

The browser command builds current source and starts its own production preview at port 4174. The 37 checks cover widths from 256 to 2560 pixels, short landscape screens, actual touch input, 200% text sizing, clipping, minimum touch targets, navigation, case-study deep links, keyboard focus, the interactive stack, the CV, clipboard feedback, and the JavaScript-disabled fallback. Install the test browser with `npx playwright install chromium` if it is not already present.

## Content

- `src/data.ts`: project narratives, verified links, experience, and contact information.
- `src/App.tsx`: the page and navigation.
- `src/components/CaseStudy.tsx`: native dialog with shareable `#project/<id>` URLs.
- `src/components/ProjectVisual.tsx`: original interface illustrations, not product screenshots or live data.
- `src/styles.css`: responsive layout and locally hosted fonts.
- `public/Kazeem-Samod-Full-Stack-CV.pdf`: byte-for-byte copy of the supplied CV.
- `docs/project-history.md`: source inventory and the distinction between completed features and work in progress.

There is no analytics or third-party runtime request. Contact links open email, the résumé is a static PDF, and all illustrations are HTML/SVG. The timezone display is explicitly Africa/Lagos. Motion is limited to direct interaction feedback and respects reduced-motion preferences.

The public alias is **CodeWithSamzy**; the professional name is **Kazeem Samod**. The rental platform is an anonymous private client case study with no client identity, source link, or deployment URL. Its caption identifies the interface illustration as placeholder content.

Responsive layouts use wrapping content, relative font sizes, safe-area gutters, and dynamic viewport limits for menus and dialogs. The stack controls span the available width on phones and tablets. Current desktop and mobile screenshots are in `preview/`.

## Publishing

`npm run build` writes `dist`. `vercel.json` configures the Vite production build, security headers, and cache policy on Vercel. The production site is [codewithsamzy-portfolio.vercel.app](https://codewithsamzy-portfolio.vercel.app), connected to the `CodeWithSamzy/codewithsamzy-portfolio` GitHub repository for automatic deployments from `main`.

`netlify.toml` and `public/_headers` remain available for an optional Netlify deployment.

The social preview is a real 1200 × 630 PNG. Fonts are served locally under the SIL Open Font License; see `public/fonts/OFL.txt`.
