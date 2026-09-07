# 🇮🇳 YatraSetu (यात्रासेतु) — Complete Project Documentation

> **Official Project Report & Technical Specification**  
> **Motto**: *"Yatra Bane Seva"* (Turning Every Journey into an Act of Service)  
> **Live Production URL**: [https://yatra-setu-black.vercel.app/](https://yatra-setu-black.vercel.app/)  
> **GitHub Repository**: [harshvsingh-io/YatraSetu](https://github.com/harshvsingh-io/YatraSetu)  
> **Hackathon Reference**: Smart India Hackathon 2026 (Problem Statement: SIH26202)  
> **Theme**: Sustainable Tourism, Smart Mobility & Community Youth Seva

---

## 📌 Table of Contents
1. [Executive Summary & Problem Statement](#1-executive-summary--problem-statement)
2. [Platform Architecture & System Design](#2-platform-architecture--system-design)
3. [Comprehensive Feature Catalog](#3-comprehensive-feature-catalog)
   - [Core Platform Deliverables](#31-core-platform-deliverables)
   - [The 4 Real-World Tourism Problem Solvers](#32-the-4-real-world-tourism-problem-solvers)
4. [Technology Stack & Free Resources Breakdown](#4-technology-stack--free-resources-breakdown)
5. [Database Schema & State Management](#5-database-schema--state-management)
6. [API Endpoints Specification](#6-api-endpoints-specification)
7. [UI/UX Design System & Editorial Aesthetics](#7-uiux-design-system--editorial-aesthetics)
8. [SIH 2026 Judge Presentation & Demo Flow](#8-sih-2026-judge-presentation--demo-flow)
9. [Future Roadmap & Scalability](#9-future-roadmap--scalability)

---

## 1. Executive Summary & Problem Statement

### 1.1 The Tourism Crisis in India
India's domestic tourism industry is experiencing unprecedented surges, but growth is concentrated in a tiny fraction of destinations:
- **Mass Overtourism**: Shimla, Manali, Goa, and Rishikesh face traffic jams, water scarcity, unmanaged plastic waste on riverbanks, and surging accommodation costs during peak seasons.
- **Neglect of Offbeat Rural Economies**: Hundreds of culturally rich, serene villages (Tirthan Valley, Orchha, Chopta, Jibhi) lack visibility and steady economic livelihood.
- **Absence of Tangible Civic Responsibility**: Tourism is largely extractive. Travelers visit fragile ecosystems, consume local resources, and leave trash without giving back.
- **The "Ghost Attendance" Problem in CSR & NSS**: Over 3.8 million students in the National Service Scheme (NSS) and NCC want recognized volunteering credentials, but organizations struggle with fraudulent, forwarded screenshot attendance during environmental cleanups.
- **Remote Alpine Blackouts**: High-altitude valleys (Spiti, Ladakh, deep forest trails) have zero cellular network (0% 4G/5G). Digital apps crash, booking details disappear, and satellite emergency numbers become unreachable.

### 1.2 The YatraSetu Solution
**YatraSetu** is India's first mindful tourism platform engineered to connect travel directly with civic restoration (*Seva*). 
- It algorithmically diverts crowds away from saturated hotspots to verified eco-homestays in underrated destinations.
- It enables travelers and university students to participate in geo-verified restoration events (beach cleanups, tree plantations, heritage preservation).
- Every verified act of service earns **Green Karma** points and generates **cryptographically auditable Certificates of Seva**.
- Built with zero-network resilience (Offline Remote Travel Pass), voice audio phrasebooks, and real-time environmental risk radars.

---

## 2. Platform Architecture & System Design

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  Next.js 14 App Router  •  TypeScript  •  Tailwind CSS  •  Framer Motion          |
+----------------------------------------+------------------------------------------+
                                         |
            +----------------------------+----------------------------+
            |                                                         |
+-----------v-----------+                                 +-----------v-----------+
|   BROWSER WEB APIs    |                                 | NEXT.JS SERVERLESS    |
| • Geolocation API     |                                 | ROUTE HANDLERS        |
| • Web Speech Synthesis|                                 | • /api/ai-concierge   |
| • LocalStorage Engine |                                 | • /api/weather        |
| • Hardware Tel Dialers|                                 | • /api/heritage       |
+-----------------------+                                 | • /api/decongestion   |
                                                          +-----------+-----------+
                                                                      |
                         +--------------------------------------------+
                         |
+------------------------v----------------------------------------------------------+
|                                EXTERNAL FREE ENGINES                              |
| • Google Gemini 2.0 Flash AI API (Conversational Intelligence)                    |
| • Open-Meteo Weather API (Real-Time Precipitation, Temp, & Soil Saturation)       |
| • Wikipedia REST API (UNESCO & Indian Heritage History & Architecture)            |
| • Supabase PostgreSQL (User Passport, Bookings, & Karma Ledgers)                 |
+-----------------------------------------------------------------------------------+
```

---

## 3. Comprehensive Feature Catalog

### 3.1 Core Platform Deliverables

#### 1. Smart Decongestion & Offbeat Routing Engine (`/discover`)
- Dynamically computes crowd pressure scores (0–100%) based on seasonality, weekend spikes, and footfall data.
- When a user searches an over-pressured city (e.g. *Goa - 85%*), the system initiates a friendly intervention nudging them towards serene alternatives (e.g. *Gokarna - 18%* or *Divar Island*).
- Auto-fetches live weather, IRCTC trains, RedBus, and flights without manual data entry.

#### 2. Zero-Proxy Attendance Verification Architecture (`/events` & `/components/QRCheckInModal.tsx`)
- **15-Second Rotating Dynamic QR**: Event organizers generate a time-seeded QR code on-site that refreshes every 15 seconds. Static screenshots, photos sent over WhatsApp, or forwarded codes expire immediately.
- **Native Browser GPS Geofence**: The attendee scans the code and takes a selfie. The browser's Geolocation API strictly verifies that the device is within 200 meters of the cleanup site.
- **Auditable CSR & NSS Credentialing**: Eliminates fake attendance, providing corporate sponsors and university registrars 100% verified impact metrics.

#### 3. Setu Saathi — Gemini 2.0 Flash AI Concierge (`/api/ai-concierge`)
- An interactive assistant available from any page via a floating pill at `bottom-5 right-5`.
- Powered by **Google Gemini 2.0 Flash** (`gemini-2.0-flash`).
- Grounded in YatraSetu destination data, crowd pressure matrices, and upcoming volunteer restoration drives.
- Includes local conversational fallback with 0ms downtime.

#### 4. Heritage AR Audio Storyteller (`/heritage` & `/heritage/[siteId]`)
- Covers 12 prominent Indian UNESCO & ASI heritage monuments (Hampi, Ajanta Caves, Konark Sun Temple, Qutub Minar, Khajuraho, Meenakshi Temple, etc.).
- Spatial audio narration with ambient temple sitar/flute backing tracks.
- Dynamic historical and architectural knowledge resolver backed by Wikipedia's REST API.

#### 5. Tamper-Proof Digital Certificates of Seva (`/certificates`)
- Automatically generates verifiable certificates formatted to government standards upon event completion.
- Contains participant name, event title, hours served, unique SHA-256 validation code, and Ministry of Tourism/NSS recognition metadata.
- Downloadable as high-resolution printable vouchers for placement resumes and academic credits.

#### 6. Gamified Green Karma Ledger & Rewards Store (`/rewards` & `/profile`)
- Users accumulate Green Karma points (+250 for eco-stays, +300 for cleanup events, +50 for litter reports).
- Points can be redeemed for discounts on partner homestays, state eco-bus tickets, and ASI monument entry passes.

---

### 3.2 The 4 Real-World Tourism Problem Solvers

#### Feature 1: Offline Remote Travel Pass (`/offline-pass`)
- **Problem**: Zero 4G/5G mobile tower signal in high Himalayas (Spiti, Ladakh, Chopta) or dense Western Ghats valleys.
- **Solution**:
  - Alpine boarding pass design with vintage perforated notches and scannable QR tokens.
  - Caches all booking information, offline host telephone, check-in dates, and SHA-256 tokens in browser storage.
  - **100% Airplane Mode Ready**: Can be pulled up without an active internet connection.
  - **Direct Hardware Emergency Dialers**: 1-click calls for **112 (National Emergency)**, **1078 (NDRF Disaster)**, **1091 (Women Safety)**, and **108 (Ambulance)** that trigger device satellite/GSM dialers without data.
  - **Integration**: Placed at `/offline-pass`, in `BookingModal.tsx` after checkout, and on each booking card in `profile/page.tsx`.

#### Feature 2: Local Dialect & Eco-Etiquette Audio Phrasebook (`/phrasebook`)
- **Problem**: Cultural misunderstandings and accidental violations of sacred eco-customs (e.g. wearing shoes in Devta groves, polluting drinking springs).
- **Solution**:
  - Covers 6 Indian regions:
    1. **Himachal Pradesh**: Kullvi & Pahadi (Kasol, Tirthan, Jibhi)
    2. **Ladakh & Zanskar**: Bhoti (Leh, Nubra, Pangong)
    3. **Uttarakhand (Devbhoomi)**: Garhwali & Kumaoni (Chopta, Rishikesh)
    4. **Konkan Coast**: Konkani (Goa, Gokarna, Malvan)
    5. **Kerala**: Malayalam (Wayanad, Munnar, Varkala)
    6. **Rajasthan**: Marwari & Bishnoi Culture (Jaipur, Jodhpur, Pushkar)
  - **Web Speech Audio**: Native browser speech synthesis speaks phrases aloud with proper phonetic accents.
  - **Sacred Eco-Taboos**: Explicit dos and don'ts (Devta temple fines, Mani stone clockwise circumambulation, sacred grove rules).
  - **Integration**: Standalone hub at `/phrasebook` and dynamically embedded in `/discover` matching the searched city.

#### Feature 3: Live Mountain & Coastal Safety Radar (`EcoSafetyAlert.tsx`)
- **Problem**: Sudden mountain weather shifts, landslide hazards during monsoons, and rough coastal tides.
- **Solution**:
  - Fetches live Open-Meteo metrics (temperature, precipitation probability, humidity).
  - Calculates certified dynamic safety levels:
    - 🟢 *Level 1: Trail Safe & Favorable*
    - 🟡 *Level 2: Weather Caution (Slippery soils / high humidity swell)*
    - 🔴 *Level 3: Trail Hazard Alert (Saturated soil / landslide risk)*
  - Mountain altitude acclimatization guidance for elevations $>2,200\text{m}$ (AMS prevention tips) and 1-tap emergency helplines.
  - **Integration**: Positioned directly beside the live weather widget on `/discover`.

#### Feature 4: Swachh Yatra: Citizen Trail & Litter Reporter (`/report-litter`)
- **Problem**: Unmonitored plastic garbage dumps on remote trekking trails where municipal sanitation workers never reach.
- **Solution**:
  - Photo snapshot proof upload with client-side image preview.
  - **1-Tap Auto-GPS Geofence Fetcher**: Grabs precise latitude & longitude coordinates using `navigator.geolocation`.
  - Waste category (plastic bottles, camping gear, broken glass, industrial rubble) and volume estimation.
  - Submitting dispatches a verified cleanup ticket (`SW-2026-XXXX`) to local university NSS units, adds it to the live community feed, and **awards +50 Green Karma points** immediately.
  - **Integration**: Standalone page at `/report-litter` and banner on `/events`.

---

## 4. Technology Stack & Free Resources Breakdown

| Category | Technology Used | Rationale & Free Resource Utilization |
| :--- | :--- | :--- |
| **Framework** | Next.js 14.2.21 (App Router) | Server-side rendering, lightning-fast static page generation, and zero-config API route handlers. |
| **Language** | TypeScript | Strong typing across data models, preventing runtime bugs. |
| **Styling** | Tailwind CSS | Utility-first CSS with a custom Indian heritage color palette (`earth`, `amber`, `terra`, `sage`, `ink`). |
| **Animations** | Framer Motion | Fluid section reveals, page transitions, and interactive modal dialogs. |
| **Icons** | Lucide React | Lightweight, tree-shakeable SVG icons. |
| **AI Engine** | Google Gemini 2.0 Flash (`@google/genai`) | High-speed, multimodal LLM provided via Google AI Studio API key with generous free tier. |
| **Weather API** | Open-Meteo REST API | 100% free, open-source weather and environmental data without API keys or credit card requirements. |
| **Speech Engine**| HTML5 Web Speech Synthesis API | Native browser capability for pronouncing regional dialects with 0ms server latency. |
| **Geolocation** | W3C Geolocation API | Client-side coordinate acquisition for geofencing and trail litter reporting. |
| **Database/Auth**| Supabase PostgreSQL + Local Storage | Hybrid architecture: cloud persistence with full offline client resilience. |
| **Deployment** | Vercel Cloud Platform | Continuous deployment from GitHub `origin/main` with edge network caching. |

---

## 5. Database Schema & State Management

### User Profile Model (`UserProfile`):
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "student-nss" | "tourist" | "community-lead";
  institution?: string;
  joinDate: string;
  stats: {
    eventsAttended: number;
    volunteerHours: number;
    stampsEarned: number;
    certificatesCount: number;
    karmaPoints: number;
  };
  bookings: BookingRecord[];
}
```

### Booking Record Model (`BookingRecord`):
```typescript
interface BookingRecord {
  id: string;
  destination: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
  restorationEventLinked?: string;
  bonusKarma?: number;
}
```

### Citizen Litter Report Model (`LitterReport`):
```typescript
interface LitterReport {
  id: string;
  location: string;
  coordinates: string;
  category: "plastic" | "camping" | "glass" | "industrial" | "wrappers";
  volume: "1-5kg" | "5-15kg" | "15kg+";
  reporter: string;
  date: string;
  status: "Assigned to NSS Unit" | "Restored & Verified";
  photo: string;
}
```

---

## 6. API Endpoints Specification

| Method | Endpoint | Description | Free Data Source |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai-concierge` | Conversational travel & seva assistant | Google Gemini 2.0 Flash |
| `GET` | `/api/weather?city=...` | Current weather, forecast, and humidity | Open-Meteo REST API |
| `GET` | `/api/heritage` | Resolves metadata for 12 Indian monuments | Wikipedia REST API & Curated DB |
| `GET` | `/api/decongestion` | Returns crowd index and offbeat alternatives | Curated Footfall Matrix |
| `GET` | `/api/local-partners` | Verified community-run eco-homestays | Curated Homestay Registry |

---

## 7. UI/UX Design System & Editorial Aesthetics

The application follows an **editorial, human-crafted design language** inspired by international design studios (Stripe, Airbnb, Kinfolk):

1. **Color Palette**:
   - `earth-50` (`#FAF8F5`): Warm stone paper background.
   - `ink-900` (`#1A1816`): Deep charcoal text for high contrast.
   - `amber-500` / `amber-600`: Warm temple brass & marigold accent.
   - `terra-600` (`#C85A32`): Earthy terracotta reflecting Indian pottery & soil.
   - `sage-600` (`#4A6B53`): Forest green representing ecological conservation.
2. **Typography**:
   - Headings: Serif display font (*Playfair Display*) evoking heritage and literary authority.
   - Body & UI: Clean sans-serif (*Plus Jakarta Sans* / *Inter*) for legibility.
3. **Card Philosophy**:
   - 24px and 32px border radii (`rounded-3xl`).
   - Subtle border strokes (`border-earth-200`) with soft ambient drop-shadows.
   - Eliminates generic AI placeholder wireframes; every card displays authentic high-resolution photography.

---

## 8. SIH 2026 Judge Presentation & Demo Flow

### Step-by-Step 4-Minute Presentation Script:

1. **0:00 - 0:45 | The Hook & Landing Page**
   - Open [https://yatra-setu-black.vercel.app/](https://yatra-setu-black.vercel.app/).
   - Highlight the editorial tagline: *"India's 1st Mindful Travel & Seva Platform"*.
   - Show the **Feature Superpowers Showcase** grid (Offline Pass, Dialect Guide, Safety Radar, Swachh Yatra).
   - Point out the official ecosystem alignment (Ministry of Tourism, NSS, Swachh Bharat).

2. **0:45 - 1:30 | Setu Saathi AI & Decongestion**
   - Click the floating **Setu Saathi** pill at `bottom-5 right-5`.
   - Ask: *"Suggest an uncrowded mountain trek in Himachal with homestays"*. Show the instant Gemini 2.0 Flash response with deep links.
   - Navigate to `/discover` and search *Goa* $\rightarrow$ show the **Crowd Pressure Meter (85%)** and the system offering *Gokarna* as an eco-alternative.

3. **1:30 - 2:30 | The 4 Problem-Solving Innovations**
   - **Eco-Safety Radar**: Show the live Open-Meteo risk index beside the weather strip on `/discover`.
   - **Dialect Audio Guide**: Scroll down on `/discover` or visit `/phrasebook`, tap the audio speaker icon on *"Julley"* or *"Dev Borem Korum"* to let judges hear browser-native speech pronunciation.
   - **Swachh Yatra Reporter**: Open `/report-litter` or trigger it from `/events`. Tap "Auto GPS" to lock coordinates, select waste type, and submit to earn **+50 Green Karma**.
   - **Offline Remote Pass**: Open `/offline-pass` $\rightarrow$ explain how it operates in **Airplane Mode** with zero internet in Himalayan valleys with direct 112/1078 hardware dialers.

4. **2:30 - 3:30 | Zero-Proxy Verification & Certificates**
   - On the homepage or `/events`, highlight the **How We Verify** section with the **live 15-second rotating QR countdown**.
   - Explain how time-seeded tokens + 200m GPS geofencing eliminate proxy attendance for NSS students.
   - Open `/certificates` to show the official certificate with digital signature and Ministry of Tourism metadata.

5. **3:30 - 4:00 | Judge Fast Access Pill**
   - Click the **⚡ Judge Demo** button in the Navbar.
   - Show how a judge can switch between an NSS Student profile (Aarav Sharma) and a Traveler profile in 1 click to inspect past bookings, earned karma, and downloaded vouchers.

---

## 9. Future Roadmap & Scalability

1. **DigiLocker Integration**: Direct synchronization of Certificates of Seva into students' official National Academic Depository (NAD) and DigiLocker accounts.
2. **State Tourism Department Dashboard**: B2G administrative portal for State Tourism Boards (e.g. Goa Tourism, Himachal Tourism) to monitor crowd density heatmaps and mobilize NSS units dynamically.
3. **PWA (Progressive Web App) with Offline Service Workers**: Background background synchronization allowing litter reports to queue when offline and auto-upload when back in network range.
4. **Multi-Lingual Audio Narration**: Expanding speech synthesis across all 22 official Eighth Schedule languages of India.

---

*Compiled by the YatraSetu Team for Smart India Hackathon 2026. All rights reserved.*
