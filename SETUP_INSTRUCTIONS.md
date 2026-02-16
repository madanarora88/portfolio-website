# Setup Instructions

## You Now Have TWO Deliverables:

### 1. Portfolio Website (This Folder)
A complete React/TypeScript portfolio with:
- Interactive homepage with your stats and companies
- Case studies with step-by-step navigation
- Product principles section
- Responsive design with Framer Motion animations
- Ready to deploy to Vercel

### 2. Marketing Materials (Separate Word Documents)
- Marketing Strategy
- Social Media Calendar
- Press Release & Email Templates
- Speaking Bio & One-Pager

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

## What's Included

```
portfolio-website/
├── src/
│   ├── pages/          # All page components
│   │   ├── Home.tsx    # ✅ Fully built with your data
│   │   ├── About.tsx   # ⚠️  Placeholder - needs content
│   │   ├── CaseStudies.tsx
│   │   ├── Writing.tsx
│   │   ├── Speaking.tsx
│   │   └── Contact.tsx
│   ├── data/           # Your actual data
│   │   ├── profile.ts  # ✅ Your bio, stats, companies
│   │   └── caseStudies.ts # ✅ Walmart & JPM case studies
│   ├── assets/         # Your photo is here
│   └── App.tsx         # Main app with routing
├── public/             # Static assets
└── Configuration files (all set up)
```

## Next Steps

### Immediate (5 minutes):
1. Run `npm install`
2. Run `npm run dev`
3. See your portfolio live!

### Short-term (1-2 hours):
1. Customize colors in `tailwind.config.js`
2. Add more content to placeholder pages
3. Add your actual product screenshots
4. Test on mobile

### Before Launch:
1. Get professional headshot (if needed)
2. Add product screenshots/mockups
3. Write out full case studies
4. Add Command Palette (Cmd+K feature)
5. Build Product Thinking Simulator
6. Add AI Experiments section

### Deploy:
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy to Vercel
npm install -g vercel
vercel
```

## Marketing Materials Integration

Check `MARKETING_MATERIALS_GUIDE.md` for how to:
- Add book section to homepage
- Create speaking page from bio
- Use social media calendar for content
- Send press release at launch

## Customization

### Change Colors:
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#YOUR_COLOR', // Change this
  dark: '#YOUR_DARK',
  light: '#YOUR_LIGHT',
}
```

### Add Your Photo:
Replace `src/assets/madan-photo.jpg` with your photo

### Update Content:
All content is in `src/data/` - just edit the TypeScript files

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (super fast)
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Zustand** - State management (for Command Palette)

## Getting Help

1. Read `IMPLEMENTATION_GUIDE.md` for architecture details
2. Read `DEPLOYMENT.md` for deployment help
3. Check React/Vite docs for framework questions
4. Email me if stuck: I included detailed comments

## Philosophy

This portfolio is a PRODUCT, not just a website. Every interaction should demonstrate your product thinking.

The homepage is fully built to show you the pattern. Use it as a reference for building out the other pages.

---

**You're ready to go! Run `npm install` and `npm run dev` to see it live.**
