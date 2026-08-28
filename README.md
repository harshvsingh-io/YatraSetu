<div align="center">

# 🌏 YatraSetu

### *"Yatra Bane Seva" — Let the journey become service*

**A civic-travel-tech platform that bridges tourism and restoration**

**100% Free Stack — No credit card needed for anything!**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-white?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-Map-2D-green?style=for-the-badge)](https://leafletjs.com/)

---

<br/>

**Built for Smart India Hackathon**

Book your trip. Join a restoration event. Earn rewards. Make tourism a force for good.

[🔗 Live Demo](#-getting-started) · [📦 Deploy on Vercel](#-deploy-on-vercel)

</div>

---

## ✨ What is YatraSetu?

YatraSetu ("setu" = bridge) is a full-stack travel platform that combines **live trip-booking discovery** with a **verified community restoration layer**. Users can:

1. **Discover & Book** — Search destinations, browse hotels/attractions with live OpenStreetMap data, check weather
2. **Join Restoration Events** — RSVP to verified local clean-up/plantation events near their destination
3. **QR-Verified Check-In** — Anti-fraud rotating QR system with geo-tagged selfie backup
4. **Earn Rewards** — Stamps from verified participation, redeemable on hotels, transport, and local deals
5. **Track Impact** — See collective metrics: waste collected, participant-hours, sites restored

**Core loop:** `Sign in → Discover destination → Live booking options → RSVP to restoration event → QR check-in → Rewards → Redeem on next trip`

---

## 💰 100% Free Stack

**No credit card needed for any service!**

| Service | Free Tier | Credit Card? |
|---------|----------|-------------|
| **Supabase** | 500MB DB, 50K users/month | ❌ No |
| **OpenStreetMap + Nominatim** | Unlimited map tiles + search | ❌ No |
| **Leaflet** | Unlimited map rendering | ❌ No |
| **React Three Fiber** | Unlimited 3D rendering | ❌ No |
| **OpenWeatherMap** | 1,000 API calls/day | ❌ No |
| **Vercel** | Unlimited deploys, 100GB bandwidth | ❌ No |
| **GitHub** | Unlimited public repos | ❌ No |
| **Google Cloud** | Not needed — we use free alternatives! | ❌ No |

---

## 🏗️ Architecture

```
yatrasetu/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page with 3D hero
│   │   ├── login/              # Auth (Google OAuth + Phone OTP)
│   │   ├── discover/           # Destination search & booking
│   │   ├── events/             # Restoration events browse & RSVP
│   │   ├── impact/             # Impact dashboard with charts
│   │   ├── rewards/            # Rewards wallet & redemption
│   │   ├── certificates/       # NSS/NCC certificate generator
│   │   ├── profile/            # User profile & settings
│   │   ├── trending/           # Trending spot alerts
│   │   ├── community-apply/    # Community lead application
│   │   ├── api/                # Server-side API routes
│   │   │   ├── places/         # OpenStreetMap/Nominatim search
│   │   │   └── weather/        # OpenWeatherMap proxy
│   │   └── auth/callback/      # Supabase OAuth callback
│   ├── components/             # Reusable UI components
│   │   ├── Hero.tsx            # Landing hero with 3D map
│   │   ├── IndiaMap3D.tsx      # Interactive 3D India map (Three.js)
│   │   ├── LeafletMap.tsx      # 2D map with pins (Leaflet + OSM)
│   │   ├── Navbar.tsx          # Glassmorphism sticky nav
│   │   ├── Button.tsx          # Spring-physics CTA buttons
│   │   ├── TiltCard.tsx        # 3D tilt-on-hover cards
│   │   ├── GSAPParallax.tsx    # Scroll-linked parallax
│   │   ├── SectionReveal.tsx   # Scroll-triggered reveals
│   │   ├── CountUp.tsx         # Animated counter numbers
│   │   ├── Skeleton.tsx        # Shimmer loading states
│   │   └── Toast.tsx           # Slide-in notifications
│   ├── lib/                    # Utilities & hooks
│   │   ├── supabase.ts         # Browser Supabase client
│   │   ├── supabase-server.ts  # Server Supabase client
│   │   ├── useLivePlaces.ts    # OpenStreetMap data hook
│   │   ├── useLiveWeather.ts   # Weather data hook
│   │   └── utils.ts            # cn(), formatNumber()
│   └── middleware.ts           # Auth route protection
├── tailwind.config.ts          # Custom theme (ink, earth, amber, terra, sage)
└── next.config.mjs             # Next.js configuration
```

---

## 🎨 Design System

### Color Palette — Warm, India-inspired, editorial

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `ink-*` | Deep Charcoal | `#1a1613` → `#f5f0e8` | Primary dark, text, backgrounds |
| `earth-*` | Parchment | `#faf6f0` → `#d4c8b5` | Light backgrounds, borders |
| `amber-*` | Temple Gold | `#b8860b` → `#fef3c7` | Primary accent, CTAs, highlights |
| `terra-*` | Terracotta | `#b44d2d` → `#fde8df` | Secondary accent, warnings |
| `sage-*` | Forest Green | `#2d6a4f` → `#d8f3dc` | Nature, success, restoration |

### Typography

- **Display:** Fraunces — variable optical-size serif with warmth and character
- **Body:** Geist — clean, modern sans-serif with excellent readability

### Premium Interactions

- **Spring-physics buttons** — hover scale + click press + ripple from click point
- **3D tilt cards** — cursor-following perspective + glare overlay (desktop only)
- **GSAP ScrollTrigger** — parallax depth, staggered reveals, count-up numbers
- **Glassmorphism nav** — blur + shrink on scroll
- **Skeleton shimmer** — never a blank screen during loading
- **Reduced-motion** — respects `prefers-reduced-motion` for accessibility

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20)
- **npm** or **yarn**
- A **Supabase** project ([create free](https://supabase.com))
- An **OpenWeatherMap** API key ([get free](https://openweathermap.org/api))

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/yatrasetu.git
cd yatrasetu
npm install
```

### 2. Environment Variables

Copy the example and fill in your keys:

```bash
cp .env.local.example .env.local
```

```env
# ─── Supabase (Free tier — no card needed) ───────────
# Get from: Supabase Dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...

# ─── OpenWeatherMap (Free — 1000 calls/day) ──────────
# Get from: https://openweathermap.org/api (free signup)
OPENWEATHERMAP_API_KEY=your_openweathermap_key
```

> **Note:** The app works without any API keys — seeded fallback data is used automatically. No broken screens.

### 3. Supabase Auth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 Client ID (Web application)
3. Add authorized redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
4. Copy Client ID + Secret → Supabase Dashboard → **Auth → Providers → Google**
5. Paste and save

#### Phone OTP (SMS)
1. Choose an SMS provider: **MSG91** (India) or **Twilio** (global)
2. Configure in Supabase Dashboard → **Auth → Providers → Phone**
3. Add your SMS provider credentials

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy on Vercel

```bash
# Option 1: Vercel CLI
npx vercel

# Option 2: Push to GitHub, then import on vercel.com
```

### Vercel Environment Variables

Go to your Vercel project → **Settings → Environment Variables** and add:

| # | Variable | Value | Source |
|---|----------|-------|--------|
| 1 | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Settings → API |
| 2 | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase Settings → API |
| 3 | `OPENWEATHERMAP_API_KEY` | `xxxxxx` | openweathermap.org |

**That's it — only 3 variables!** Everything else is free and keyless.

---

## 📡 API Reference

### OpenStreetMap/Nominatim Places API
- **Route:** `/api/places?q=destination&type=hotel|attraction`
- **Returns:** Name, rating, photos, address, coordinates
- **Fallback:** Seeded data for popular Indian destinations
- **Cost:** Free (no API key needed)

### OpenWeatherMap API
- **Route:** `/api/weather?q=city_name`
- **Returns:** Current weather + 3-day forecast
- **Fallback:** Mock weather data
- **Cost:** Free (1,000 calls/day)

### Supabase Auth
- **Google OAuth:** `supabase.auth.signInWithOAuth({ provider: 'google' })`
- **Phone OTP:** `supabase.auth.signInWithOtp({ phone })` → `verifyOtp({ phone, token, type: 'sms' })`

---

## 📱 Pages

| Route | Page | Features |
|-------|------|----------|
| `/` | Landing | 3D India map, Leaflet map, GSAP parallax, impact counters, testimonials |
| `/login` | Auth | Google OAuth + Phone OTP, split-panel design |
| `/discover` | Discover | Destination search, hotel cards, weather, transport links |
| `/events` | Events | Filter/browse, RSVP, verified badges, safety waiver |
| `/impact` | Dashboard | Animated stats, bar charts, state-wise breakdown |
| `/rewards` | Wallet | Stamp progress, earned rewards, redemption catalog |
| `/certificates` | Certs | NSS/NCC certificate previews, download |
| `/profile` | Profile | Edit form, language toggle (EN/हि), settings |
| `/trending` | Alerts | Report overwhelmed sites, photo upload |
| `/community-apply` | Apply | Community lead application form |

---

## 🛠️ Tech Stack

| Layer | Technology | Free? |
|-------|-----------|-------|
| **Framework** | Next.js 14 (App Router) | ✅ Free |
| **Language** | TypeScript 5.7 | ✅ Free |
| **Styling** | Tailwind CSS 3.4 | ✅ Free |
| **Animation** | Framer Motion 11 + GSAP 3.12 | ✅ Free |
| **3D** | React Three Fiber 8 + drei 9 | ✅ Free |
| **Maps (2D)** | Leaflet + OpenStreetMap | ✅ Free, no key |
| **Places Search** | Nominatim (OpenStreetMap) | ✅ Free, no key |
| **Auth** | Supabase Auth (Google OAuth + Phone OTP) | ✅ Free |
| **Database** | Supabase (PostgreSQL + RLS) | ✅ Free |
| **Weather** | OpenWeatherMap API | ✅ Free |
| **Charts** | Recharts | ✅ Free |
| **Icons** | Lucide React | ✅ Free |
| **Deploy** | Vercel | ✅ Free |

---

## 🔒 Security

- Supabase Row Level Security enabled
- Auth middleware protects private routes
- Phone OTP with 30s cooldown to prevent spam
- `SUPABASE_SERVICE_ROLE_KEY` only on server-side (never exposed to client)
- No Google API keys needed (uses free OSM alternatives)

---

## 🌍 Accessibility

- All animations respect `prefers-reduced-motion`
- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigable
- Color contrast ratios meet WCAG AA

---

## 📄 License

This project was built for **Smart India Hackathon**. 

---

<div align="center">

**Built with ❤️ for Indian tourism and community restoration**

*"Yatra Bane Seva"*

</div>
