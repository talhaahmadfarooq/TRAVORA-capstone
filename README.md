# TRAVORA — Capstone Multi-Page React Application

> **Project Task:** Capstone Multi-Page React App  
> **Topic:** Routing, State Management & Production Deployment  
> **Student / Assigned To:** Talha Ahmad  
> **Evaluator / Created By:** Qamar Naveed  
> **Submission Date:** September 2026  

---

## 🌐 Project Deliverables

| Deliverable | Link |
| :--- | :--- |
| **Live Production Deployment** | [Live Demo on Vercel](https://travora-capstone.vercel.app) *(Update with your deployed URL)* |
| **Public GitHub Repository** | [GitHub Repository](https://github.com/TalhaAhmad/travora-capstone) *(Update with your repository URL)* |

---

## 📖 Project Overview

**TRAVORA** is an experimental cinematic travel application and luxury discovery platform. Built as a high-performance Single Page Application (SPA) using **React 19**, **TypeScript**, **Vite**, and **React Router v7**, the application combines:
- An interactive 3D WebGL Earth globe with animated flight trajectories.
- Fluid client-side multi-page routing with dynamic parameters and protected views.
- Complex multi-context global state architecture for trip itineraries and user favorites.
- A custom **"Liquid Glass"** UI design system inspired by modern Apple material hierarchy, featuring restrained typography, layered translucency, and responsive layouts.

---

## 🎯 Key Learning Outcomes & Task Requirements Met

### 1. React Router & Single Page Application Navigation
- **Declarative Client-Side Routing:** Zero full-page reloads using React Router `<BrowserRouter>`, `<Routes>`, and `<Route>`.
- **Dynamic Routing & URL Parameters:** Deep linking and dynamic parameter extraction using `useParams()` for destinations (`/destinations/:id`) and luxury accommodations (`/stays/:id`).
- **Protected Views:** Conditional authentication gates for sensitive user profiles (`/profile`) and itinerary management (`/trips`).
- **404 Catch-All Route:** Graceful fallback for undefined URLs with `<Route path="*" element={<NotFoundPage />} />`.
- **Automatic Scroll Restoration:** Global scroll-to-top handler on route changes.

### 2. Complex Global State Management
The application implements an enterprise-grade multi-provider architecture (`AppProviders`):
- **`AuthContext`:** Manages user authentication lifecycle (`user`, `isAuthenticated`, `login`, `logout`, modal state).
- **`TripContext`:** Complex state machine managing:
  - Custom day-by-day travel itineraries (`currentTrip`).
  - Adding, removing, and re-ordering flights, stays, and activities across trip days.
  - Multi-entity favorites management (`destinations`, `stays`) with reactive toast alerts.
  - Journey search criteria (`origin`, `destination`, `date`, `travelers`).
- **`NavigationContext`:** Controls global perspective toggling between 3D Globe and 2D Planar projection.

### 3. External API & Data Integration
- **GeoJSON TopoJSON Fetching:** Live client-side fetch of World Atlas TopoJSON geometries (`https://unpkg.com/world-atlas@2.0.2/countries-110m.json`) for the 2D projected global map.
- **Dynamic Asynchronous Data Flow:** Structured mocks paired with extensible service interfaces for live meteorological forecasts, flight routes, and property catalogues.

### 4. Production Build Optimization & Deployment
- **TypeScript Strict Compilation:** `tsc -b` type checking without warnings or errors.
- **Vite Bundler:** Optimized chunking, minification, tree-shaking, and Gzip compression.
- **SPA Routing Fallback:** Ready for deployment on **Vercel** (`vercel.json`) and **Netlify** (`_redirects`) to guarantee direct-link access and refresh resilience without 404 errors.

---

## 🗺️ Application Route Architecture

| Route Path | View / Component | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Public | Cinematic 3D globe hero, flight path calculator, interactive search |
| `/explore` | `ExplorePage` | Public | Horizontal visual discovery slider with full-bleed dynamic backgrounds |
| `/destinations` | `DestinationsPage` | Public | Curated editorial collection of global travel destinations |
| `/destinations/:id` | `DestinationDetailPage` | Public (Dynamic) | Comprehensive destination dossier, weather, experiences, and booking |
| `/flights` | `FlightsPage` | Public | Precision flight search results, stop filters, and itinerary integration |
| `/stays` | `StaysPage` | Public | Curated boutique stays directory with location and amenity filtering |
| `/stays/:id` | `StayDetailPage` | Public (Dynamic) | Luxury property view, suite reservations, and amenity breakdown |
| `/trips` | `TripsPage` | Protected / User | Visual chronological trip planner with day-by-day activity timelines |
| `/favorites` | `FavoritesPage` | Public / User | Personal collection of saved destinations and accommodations |
| `/profile` | `ProfilePage` | Protected | User account dashboard, preferences, and saved stats |
| `/login` | `LoginPage` | Public | Cinematic flight-streak authentication interface |
| `*` | `NotFoundPage` | Public | 404 error page with quick redirect to home |

---

## 🛠️ Technology Stack

- **Core Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **3D Graphics & WebGL:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Geographic Mapping:** [d3-geo](https://d3js.org/d3-geo) + [topojson-client](https://github.com/topojson/topojson-client)
- **Animation & Transitions:** [Framer Motion](https://www.framer.com/motion/)
- **Iconography:** [Lucide React](https://lucide.dev/)
- **Linter:** [Oxlint](https://oxc.rs/)

---

## 📁 Directory Structure

```text
travora-capstone/
├── public/                     # Static assets, 3D GLB models & Earth textures
│   ├── models/                 # Aircraft and terrain GLB models
│   └── textures/               # Earth 8k day, night, clouds, and specular maps
├── src/
│   ├── assets/                 # Brand assets and graphics
│   ├── components/
│   │   ├── globe/              # 3D Globe, Canvas scene, flight arcs & 2D Map
│   │   ├── layout/             # Navbar, Footer, MainLayout, ScrollToTop
│   │   └── ui/                 # Liquid Glass system (GlassSurface, GlassButton, Typography)
│   ├── context/                # React Context providers (Auth, Trip, Navigation)
│   ├── data/                   # Curated mock data (destinations, flights, stays)
│   ├── pages/                  # Page route components
│   ├── styles/                 # Global styles, typography & Liquid Glass material rules
│   ├── types/                  # TypeScript domain models and interfaces
│   ├── utils/                  # Coordinate calculations & helper utilities
│   ├── App.tsx                 # Route declarations and provider wrapping
│   ├── main.tsx                # Application entry point
│   └── index.css               # Base CSS reset and theme imports
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚡ Getting Started & Setup Commands

### Prerequisites
- **Node.js** version 18.0.0 or higher
- **npm** version 9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/TalhaAhmad/travora-capstone.git
cd travora-capstone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

### 4. Build for Production
Run TypeScript compilation and generate the minified production bundle in the `dist/` directory:
```bash
npm run build
```

### 5. Preview Production Build
Locally preview the generated production build to verify bundle integrity:
```bash
npm run preview
```

### 6. Linting
Run Oxlint to check code quality and ensure adherence to React & TypeScript standards:
```bash
npm run lint
```

---

## 🚀 Deployment Guide (Vercel & Netlify)

### Deploying to Vercel (Recommended)
1. Push your repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: complete capstone application"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `travora-capstone` repository.
4. Keep the default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Ensure a `vercel.json` file is present in the project root to route all deep links to `index.html`:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
6. Click **Deploy**. Your live application link will be generated instantly.

### Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com/) and choose **"Import from Git"**.
2. Connect your GitHub repository.
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Ensure a `public/_redirects` file exists with the following content to avoid 404s on page refresh:
   ```text
   /*    /index.html   200
   ```
5. Click **Deploy Site**.

---

## 👨‍💻 Author & Academic Information

- **Student Name:** Talha Ahmad
- **Role:** Frontend Developer
- **Course / Module:** React Single Page Applications & Production Deployment
- **Supervising Instructor:** Qamar Naveed
- **Institution:** Capstone Project — September 2026
