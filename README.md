# Madan Arora - AI Product Manager Portfolio

An elite, interactive portfolio website showcasing product leadership, AI expertise, and Fortune 50 impact.

## Features
- Interactive case studies with step-by-step navigation
- Product thinking simulator
- AI experiments section
- Command palette (Cmd/Ctrl + K)
- Smooth animations with Framer Motion
- Responsive design
- Premium feel matching Linear/Vercel/Notion quality

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Deploy to Vercel:
```bash
npx vercel
```

### Deploy with live AI (Ask AI + AI Experiments)

1. **Set the API key in Vercel**
   - Vercel dashboard → your project → **Settings** → **Environment Variables**
   - Add `ANTHROPIC_API_KEY` with your [Anthropic](https://console.anthropic.com/) API key (Production and Preview if you want AI in both).

2. **Deploy**
   - If the repo is connected to Vercel: push to `main` and Vercel will build and deploy.
   - Or from the repo root: `npm run build` then `npx vercel --prod`.

3. **Verify**
   - Ask AI (floating button or ⌘I) and the three AI Experiments (Hiring Signal Extractor, PM Decision Pressure Test, Onboarding Failure Detector) will use live Claude when `ANTHROPIC_API_KEY` is set.

## Structure
```
src/
  components/     # Reusable UI components
  pages/          # Page components
  hooks/          # Custom React hooks
  data/           # Static data and content
  assets/         # Images and media
```

## Tech Stack
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Zustand (state management)
- React Router

Created by Claude for Madan Arora
