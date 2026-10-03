# Basant Tamang — Portfolio

A single-page portfolio built with Vite, React, TypeScript, Tailwind CSS and Framer Motion.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Edit the content

All copy lives in **`src/content.ts`**: hero text, bio, stats, skills, projects, contact details, social links and footer. Things to replace are marked `PLACEHOLDER`:

- **Projects**: the six projects are placeholders. Replace the titles, descriptions, tags and `href` links. Each card shows an illustration (`graphic`, drawn in `src/components/ProjectGraphic.tsx`) on its `gradient`.
- **Portrait**: replace `public/portrait.webp` with another square photo (the About tile crops from the top).
- **Email and socials**: set your real email and profile URLs.
- **Contact form**: by default it opens the visitor's email app (`mailto:`). To receive messages directly, create a form at [formspree.io](https://formspree.io) and paste its endpoint into `FORM_ENDPOINT`.

The page title, meta description and Open Graph tags are in `index.html`. Update `og:url` once you have a domain, and add an `og:image` (1200×630) if you want a social preview image. The favicon is `public/favicon.svg`.

Theme colors are CSS variables at the top of `src/index.css`.

## Deploy

It's a static site, so no server config is needed.

- **Vercel**: import the repo at vercel.com/new. It detects Vite automatically (build `npm run build`, output `dist`).
- **Netlify**: import the repo, then set the build command to `npm run build` and the publish directory to `dist`. Or drag the `dist/` folder onto app.netlify.com/drop.
