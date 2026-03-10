# Publication rapide du site client

Cette version est statique et ne depend plus du backend.

## 1) Vercel
- Root directory: `client-publish-package`
- Build command: `npm run build`
- Output directory: `dist`
- Le fichier `vercel.json` gere le fallback SPA.

## 2) Netlify
- Base directory: `client-publish-package`
- Build command: `npm run build`
- Publish directory: `dist`
- Le fichier `netlify.toml` gere le fallback SPA.

## 3) URLs utiles
- Page principale: `/`
- Route compatible QR existante: `/p/sphere-office-1`
- Route alternative conservee: `/company/sphere-office-1`

## 4) Important
- Aucune variable d'environnement n'est requise.
- Le logo client est inclus dans `public/`.
- Si tu modifies les textes ou contacts du client, mets a jour `src/data/staticBusiness.ts`.
