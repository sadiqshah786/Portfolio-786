# Sadiq Shah — Portfolio

A dark, pixel-accented developer portfolio built with **React + Vite**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Structure

```
src/
  data.js              # ← edit ALL your content here (name, skills, projects, links)
  App.jsx              # page layout
  index.css            # all styles + theme variables (top of file)
  hooks.js             # scroll-reveal + count-up hooks
  components/          # Navbar, Hero, About, Skills, Projects, Contact, Footer
```

To update text, projects or links, just edit **`src/data.js`** — no component changes needed.
Theme colors live in the `:root { ... }` block at the top of `src/index.css`.

## Deploy

Push to GitHub, then deploy the repo on **Vercel** or **Netlify** (auto-detects Vite),
or run `npm run build` and host the `/dist` folder anywhere.
