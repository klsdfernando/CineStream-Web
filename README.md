# CineStream Website

Static React marketing website for **CineStream** built with Vite.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Generated static files will be in `dist/`.

## GitHub Upload + GitHub Actions (Auto Deploy)

This project is configured to deploy automatically to **GitHub Pages** using Actions.

### Included files

- `.github/workflows/deploy-pages.yml` deploys on every push to `main`.
- `vite.config.js` auto-detects repository name during Actions and sets correct base path.
- `.gitignore` excludes `node_modules` and `dist`.

### Setup steps

1. Create a GitHub repository and push this project to branch `main`.
2. In GitHub repo settings, open `Pages`.
3. Set `Build and deployment` source to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the Actions tab).
5. Your site will be published at:
   - `https://<username>.github.io/<repo-name>/`

Note: If this repo is your special user site repo (`<username>.github.io`), it will publish at the root domain.

## Customize before launch

- Update download URLs in `src/App.jsx` inside `downloadOptions` (currently placeholders).
- Replace showcase files in `public/assets/screenshots/` with your real app screenshots.
- Update version text in `src/App.jsx` if needed.
