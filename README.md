# Mirokaï Experience

> Application PWA narrative et interactive autour de l'univers **Mirokaï**.

**Démo en ligne** → [mirokai-alpha.vercel.app](https://mirokai-alpha.vercel.app)

## Scanne pour y accéder

<p align="center">
  <a href="https://mirokai-alpha.vercel.app">
    <img src="qrcode-mirokai.png" alt="QR code vers la démo Mirokaï" width="260" />
  </a>
</p>

Ouvre l'appareil photo de ton téléphone, vise le QR code et touche la notification pour lancer l'app directement.

## Aperçu

Parcours narratif en 4 chapitres où l'utilisateur assemble progressivement un Mirokaï en résolvant des mini-jeux :

1. **Chapitre 1** — Puzzle (glisser-déposer)
2. **Chapitre 2** — Quiz sur les émotions
3. **Chapitre 3** — Reconstitution de visages
4. **Chapitre 4** — Déchiffrage d'un mot secret

## Stack technique

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** avec design tokens personnalisés
- **Framer Motion** pour les animations et les gestes (swipe, drag, tap)
- **PWA complète** : manifest, service worker (offline caching, notifications push, background sync)
- **Polices** : Outfit + Nunito (display)

## Fonctionnalités PWA

- Installable sur iOS / Android / Desktop
- Fonctionne hors-ligne (cache v19 des routes et assets)
- Icônes maskable 192/512
- Splash screen et starfield background animé

## Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Déploiement

Déployé automatiquement sur **Vercel** à chaque push sur `main`.

```bash
vercel --prod
```

## Structure des écrans

```
/                  → splash
/welcome           → onboarding
/choose            → sélection Miroka / Miroki
/story             → introduction narrative
/quests-1 … /quests-4
/chapitre-1 … /chapitre-4
/mission-1 … /mission-4
/indice-4
/validation-1 … /validation-4
/final             → mission accomplie
```
