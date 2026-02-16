# Implementation Guide

This portfolio website is built as a PRODUCT, not just a showcase. Every interaction demonstrates product thinking.

## Architecture Overview

### State Management (Zustand)
- Simple, lightweight state management
- No boilerplate like Redux
- Perfect for command palette, theme, navigation state

### Routing (React Router)
- Client-side routing for smooth transitions
- Pre fetch for instant page loads
- Scroll restoration

### Animation (Framer Motion)
- Page transitions
- Micro-interactions
- Scroll-triggered animations
- Gesture-based interactions

## Key Features to Implement

### 1. Interactive Case Studies (`/case-studies`)
Each case study should be a **mini-product experience**:
- Step-by-step navigation (Problem → Context → Thinking → Tradeoffs → Decision → Outcome → Lessons)
- Progress indicator
- Smooth transitions between steps
- Clickable prototype mockups
- Decision trees showing tradeoffs

### 2. Product Thinking Simulator (`/simulator`)
Interactive scenarios that show how you think:
```
Scenario: "User onboarding dropped 25%"
Options:
  A) Run user interviews immediately
  B) Check analytics for drop-off points  
  C) A/B test new onboarding flow
  D) Add more features to onboarding

Show YOUR choice, explain WHY, show TRADEOFFS
```

### 3. Command Palette (Cmd+K)
Like Linear/Vercel:
- Global search
- Quick navigation
- Keyboard shortcuts
- Fuzzy matching

### 4. AI Experiments Section
- Mock AI assistant that answers product questions
- Interactive product strategy tool
- AI feature prioritization matrix
- All powered by pre-written responses (no real AI needed)

## Design Principles

1. **Minimal & Fast**: No unnecessary animations, instant page loads
2. **Typography**: Inter font, clear hierarchy, generous spacing
3. **Color**: Dark theme with primary blue accent (#2E75B6)
4. **Motion**: Purposeful, not decorative
5. **Micro-interactions**: Button hovers, card lifts, smooth transitions

## Data Structure

All content lives in `/src/data`:
- `profile.ts` - Your bio, contact, social links
- `experience.ts` - Work history with impact metrics
- `caseStudies.ts` - Detailed case studies
- `skills.ts` - Technical & product skills
- `writing.ts` - Blog posts, articles
- `speaking.ts` - Talks, presentations

## Component Organization

```
components/
  layout/
    Header.tsx
    Footer.tsx
    CommandPalette.tsx
  
  home/
    Hero.tsx
    FeaturedWork.tsx
    ProductPrinciples.tsx
  
  case-studies/
    CaseStudyCard.tsx
    StepNavigator.tsx
    InteractiveFlow.tsx
  
  common/
    Button.tsx
    Card.tsx
    Modal.tsx
```

## Next Steps

1. Copy your photo to `src/assets/`
2. Update `src/data/profile.ts` with your info
3. Customize colors in `tailwind.config.js`
4. Run `npm install` and `npm run dev`
5. Build out case studies with real data
6. Add actual product screenshots/mockups
7. Deploy to Vercel

## Customization

- Colors: Edit `tailwind.config.js`
- Fonts: Change in `index.html`
- Content: Edit files in `src/data/`
- Components: Modify in `src/components/`

## Performance Checklist

- [ ] Code splitting with React.lazy()
- [ ] Image optimization (WebP format)
- [ ] Preload critical resources
- [ ] Lazy load below-fold content
- [ ] Minimize bundle size

This is your PRODUCT. Make every pixel count.
