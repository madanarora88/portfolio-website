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

For analytics (optional):
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

The build is already optimized, but you can further improve:

1. **Image Optimization**
- Convert images to WebP
- Use responsive images
- Lazy load below-fold images

2. **Code Splitting**
- Already configured with React.lazy()
- Vite handles this automatically

3. **Caching**
- Vercel/Netlify handle this by default
- Set custom headers if needed

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

Add analytics:
- Google Analytics
- Vercel Analytics
- Plausible (privacy-friendly)

---

Need help? Check the main README.md
