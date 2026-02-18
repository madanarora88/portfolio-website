# Deployment Guide

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:5173`

3. **Build for Production**
```bash
npm run build
```

## Deploy to Vercel (Recommended)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Vite and deploy

## Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Environment Setup

No environment variables needed for basic setup.

### Live AI on AI Experiments page (optional)
To enable live OpenAI responses in the "AI Onboarding Assistant" chat:
1. In Vercel: Project → Settings → Environment Variables
2. Add `OPENAI_API_KEY` with your OpenAI API key
3. Redeploy. The chat will use GPT-4o-mini (cost-effective). Rate limit: 15 requests/min per client.

If not set, the chat uses pre-written demo responses.

**Vercel Analytics** is already integrated – view metrics in Vercel Dashboard → Project → Analytics.

For Google Analytics (optional):
```
VITE_GA_ID=your-google-analytics-id
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## Performance Optimization

The following optimizations are already in place:

1. **Font Loading** – Google Fonts load non-blocking (media="print" onload) to avoid blocking render
2. **Images** – Hero image uses fetchpriority="high"; below-fold images use loading="lazy"; width/height set to prevent layout shift
3. **Code Splitting** – All routes (Home, Case Studies, About, Writing, Speaking, Contact, AI Experiments, Simulator) use React.lazy()
4. **Vercel Analytics** – Enabled via @vercel/analytics for performance insights

### Further improvements (optional)
- Convert photos to WebP for smaller file sizes
- Use vite-plugin-lucide or per-icon imports if lucide-react bundle grows (lucide is already tree-shakeable)

## Troubleshooting

**Build fails:**
- Check Node version (16+ required)
- Clear node_modules and reinstall

**Styles not loading:**
- Ensure Tailwind is properly configured
- Check postcss.config.js exists

**Routes not working:**
- Configure redirect rules for SPA routing
- Vercel: automatically handled
- Netlify: add `_redirects` file

## Monitoring

- **Vercel Analytics** – Enabled by default; view in Vercel Dashboard → Analytics
- Edge Network and compression are enabled by default on Vercel
- Optional: Google Analytics, Plausible (privacy-friendly)

---

Need help? Check the main README.md
