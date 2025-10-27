# Product Requirements Document (PRD): GbeduFlow

**Hackathon Edition – AI & Digital Music Economy (October 2025)**

| Field | Details |
|-------|---------|
| **Product Name** | GbeduFlow |
| **Version** | 1.1 (Hackathon + Monetization Update) |
| **Author** | Goodness Mbakara |
| **Date** | October 27, 2025 |
| **Focus Tracks** | Economic Impact Modeling & Global Reach and Export Insights |
| **North Star Metric** | Launch the Afrobeats Economic Heat Index (AEHI) |

## 1. Overview and Problem Statement

### 1.1 Purpose
GbeduFlow is an AI-driven platform that quantifies the grassroots economic energy and export potential of Nigerian music artists. It combines student-generated hype data with lightweight machine learning to produce the Afrobeats Economic Heat Index (AEHI) — a new measure for creative economy insights.

### 1.2 The Problem
Despite Afrobeats' global growth, the underlying data that drives artist discovery, tour decisions, and policy planning remains fragmented or missing entirely.

- **Grassroots energy is invisible** — No structured way to measure which artist is buzzing on campuses or in cities.
- **Export potential is unquantified** — Policymakers and labels lack data on emerging audience clusters abroad.
- **Economic inefficiency** — Sponsorships and grants are misallocated due to lack of evidence-based insight.

### 1.3 The Solution
GbeduFlow introduces two novel data layers:

- **Local Demand Score (LDS)**: Quantifies organic, on-campus popularity using student ratings and participation metrics.
- **Audience Export Index (AEI)**: Uses NLP to cluster public audience data and identify global reach signals.

Both metrics combine into the flagship **Afrobeats Economic Heat Index (AEHI)** — a single score representing grassroots heat + export readiness.

New additions now include monetization features that align with real artist and promoter needs while keeping the AEHI metric independent and trusted.

## 2. Goals, Metrics, and Target Users

### 2.1 Hackathon Success Metrics

| Goal Area | Key Result | Metric |
|-----------|------------|--------|
| **Core Innovation** | Generate AEHI for at least 10 artists. | AEHI computation success rate. |
| **Monetization Feasibility** | Demonstrate 1 working "Boosted Challenge" or featured content flow. | ≥1 active paid or mock-promoted listing in demo. |
| **User Engagement** | Validate that students can submit and interact easily. | ≥75% completion rate in demo tests. |
| **Policy/Analyst Use** | Showcase export audience clusters. | ≥3 distinct global audience clusters generated. |

### 2.2 User Personas

| Persona | Goal | Key Features Needed |
|---------|------|-------------------|
| **Student / Fan ("Padi")** | Discover and hype local artists; join fun challenges. | Simple "Vibe Check" + campus tagging. |
| **Artist / Label** | Increase exposure and measure performance impact. | Boosted Challenges, AEHI insights, Deep Dive Reports. |
| **Promoter / DJ** | Find the next breakout star per city or campus. | AEHI leaderboard + LDS heatmap. |
| **Policy Analyst** | Track local creative economy and export signals. | Audience cluster visualizations. |

## 3. MVP Features

The MVP focuses on three core systems: **Data Input → Analysis → Insights + Monetization Layer**

### 3.1 Artist & Student Input Flow

| ID | Feature | Description | Implementation Notes (Speed Focus) |
|----|---------|-------------|-----------------------------------|
| **F.1.1** | Artist Onboarding | Artists register with name + 1 YouTube video + 1 TikTok/Instagram profile link. | Use a simple POST /api/artists route with Express.js middleware for validation; store minimal metadata in SQLite/PostgreSQL. |
| **F.1.2** | Student Authentication | Students log in using Google/email and select university from a dropdown. | Use Custom Auth/google 0auth. Preload university list from JSON or free api. |
| **F.1.3** | Vibe Check Submission | Students rate artist (1–5) and optionally link a hype video. | Store submission in Submissions table; auto-tag with student's university and details. |

### 3.2 Machine Learning & Data Engine

| ID | Feature | Description | Implementation Notes |
|----|---------|-------------|-------------------|
| **F.2.1** | Local Demand Score (LDS) | Weighted score combining ratings, hype volume, and campus spread. | Implement with a schedule recalculation every few hours. |
| **F.2.2** | Audience Export Index (AEI) | NLP clustering of artist audience text data (bios, comments). | Use TensorFlow.js with Universal Sentence Encoder for embeddings and Natural.js clustering; output top 3 clusters. |
| **F.2.3** | AEHI Computation | Combine LDS + AEI into one interpretable index. | Store AEHI as float (0–100). Recompute on data change triggers. |

### 3.3 Insights Dashboard

| ID | Feature | Description | Implementation Notes |
|----|---------|-------------|-------------------|
| **F.3.1** | AEHI Ranking Dashboard | Displays top 10 artists by AEHI. | Build using Streamlit (fast) or React + Chart.js. |
| **F.3.2** | LDS Heatmap | Shows which campuses drive local demand. | Use color-coded list or Mapbox (optional mock). |
| **F.3.3** | AEI Audience Clusters | Visual summary of global audience types. | Simple Innovative card components listing 3 clusters + keywords. |

## 4. Monetization Features

These modules introduce revenue without compromising AEHI integrity.

| ID | Feature | User | Description | Implementation Notes |
|----|---------|------|-------------|-------------------|
| **M.1** | Boosted Challenge (Native Ad) | Artist/Label | Paid campaign that promotes a listening or hype challenge within a selected campus/city. Boosted visibility increases engagement organically, which may affect LDS. | Create boosted_campaigns table; filter submissions to show boosted artists first on campus feeds. |
| **M.2** | Featured Placement (Non-AEHI) | Promoter/Brand | Sell banner or spotlight slots for DJs, promoters, or campus events. | Add "featured" field in artist/promo schema; toggle placement in dashboard UI. |
| **M.3** | Deep Dive Report (B2C Artist Service) | Artist | Premium report showing AEHI history, LDS by city, and competitor comparison. | Generate from AEHI history table and export as downloadable PDF/CSV via Express.js endpoint. |

## 5. Non-Functional Requirements

| ID | Requirement | Focus | Description |
|----|-------------|-------|-------------|
| **NF-R.1** | Speed | Performance | Prioritize minimal backend logic. Use prebuilt auth, simple DB, and Streamlit for dashboards. |
| **NF-R.2** | Scalability | Architecture | Use Docker + lightweight REST API; keep ML components modular for cloud migration later. |
| **NF-R.3** | Privacy | Security | Store no PII; only anonymized campus data. |
| **NF-R.4** | Mobile-first UX | Usability | Frontend optimized for phones; avoid heavy libraries. |

## 6. Technical Stack (Speed-Optimized)

| Layer | Tech | Rationale |
|-------|------|-----------|
| **Frontend/UI** | React + Vite (or Streamlit) | Vite for fast development; Streamlit for quickest MVP dashboard. |
| **Backend/API** | Express.js (TypeScript) | Lightweight, async-ready, integrates with ML easily via Node.js ecosystem. |
| **Auth & DB** | Firebase Auth + SQLite/PostgreSQL | Minimal setup, scalable later. |
| **ML Layer** | TensorFlow.js + Natural + ML-Matrix | Fast to integrate with Node.js and explainable results. |
| **Hosting** | Render / Railway / Vercel | 1-click deployments ideal for hackathons. |
| **Containerization** | Docker Compose | Ensures smooth handover and future scalability. |

## 7. Scope Definition

### In Scope (Must Have)
- Artist onboarding & student submissions.
- AEHI computation & dashboard.
- One active Boosted Challenge demo.
- Simple admin panel for content moderation.

### Out of Scope (Future/Deferred)
- Real-time streaming integrations (YouTube/TikTok APIs).
- Full social platform features (messaging, profiles).
- Payment gateway integration (mocked for MVP).
- Automated fraud detection or score audits.

## 8. Quick Implementation Plan

| Phase | Focus | Tools / Notes |
|-------|-------|---------------|
| **Day 1** | Setup backend, models, auth | Express.js + Firebase; create /artists, /submissions, /aehi. |
| **Day 2** | Build dashboard (Streamlit or React) | Show AEHI leaderboard, LDS heatmap (mock), clusters. |
| **Day 3** | Add Boosted Challenge + Featured slots | Static list of boosted campaigns with banner toggles. |
| **Day 4** | Add AEHI computation script + Deep Dive generator | Node.js ML libraries + Express.js endpoint for CSV export. |
| **Day 5** | Final polish and deploy | Containerize and deploy to Vercel/Render. |

## 9. Summary

GbeduFlow is the data nerve center of the Nigerian music grassroots — blending AI insight, cultural relevance, and revenue viability.

It empowers:
- **Students** to become active taste-makers,
- **Artists** to understand and grow their local and global traction, and
- **Promoters/Policymakers** to finally quantify Afrobeats' true economic footprint.

And now, with Boosted Challenges, Featured Placements, and Deep Dive Reports, GbeduFlow can sustain itself financially while scaling impact.

---

*This PRD serves as the single source of truth for the GbeduFlow product development during the hackathon and beyond.*
