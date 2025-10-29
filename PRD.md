

# 🎶 **GbeduFlow – Product Requirements Document (MVP Edition)**

**Hackathon Edition – October 2025**
**Prepared by:** Esabu Blessing
**North Star Metric:** Launch the **Afrobeats Economic Heat Index (AEHI)** for 10 artists

---

## **1. Overview**

**GbeduFlow** is an AI-powered platform that measures the *grassroots hype* and *global reach* of Nigerian artists.
It combines student-submitted ratings and lightweight audience clustering to produce the **Afrobeats Economic Heat Index (AEHI)** — a single score that quantifies both local traction and export readiness.

The platform empowers:

* **Students (fans)** → to hype local artists and join campus challenges.
* **Artists** → to measure and showcase their traction.
* **Promoters/Policymakers** → to visualize data-driven heat trends in music.

---

## **2. Problem & Solution**

### Problem

* Local buzz isn’t being tracked or quantified.
* Artists lack insight into how their audience grows across regions.
* Promoters and sponsors make decisions without reliable data.

### Solution

* **Local Demand Score (LDS):** Captures organic hype from campus submissions.
* **Audience Export Index (AEI):** Clusters audience text to reveal international interest.
* **AEHI (Main Metric):** Combines both into one interpretable 0–100 score.

---

## **3. MVP Goals**

| Goal                          | Metric                       | Target      |
| ----------------------------- | ---------------------------- | ----------- |
| Compute AEHI for demo artists | Successful AEHI output       | ≥10 artists |
| Student participation         | “Vibe Check” form completion | ≥70%        |
| Monetization demo             | Working “Boosted Challenge”  | 1           |
| Visual output                 | AEHI leaderboard & dashboard | ✅           |

---

## **4. Core MVP Features**

### 1️⃣ Artist Onboarding

Artists can register with their name, genre, and one YouTube/TikTok link.
→ *Backend:* `/api/artists` route
→ *Frontend:* Simple form page

### 2️⃣ Student “Vibe Check”

Students rate artists (1–5) and select their campus.
→ *Backend:* `/api/submissions` route
→ *Frontend:* One-page rating UI

### 3️⃣ AEHI Engine

Backend computes **AEHI = 0.6 × LDS + 0.4 × AEI** using submission data and mock NLP clustering.

### 4️⃣ Dashboard

Displays a leaderboard of artists ranked by AEHI, plus a simple heat indicator.

### 5️⃣ Boosted Challenge (Monetization Demo)

One artist can be “boosted” — appearing at the top of the feed as a sponsored highlight.

---

## **5. Technical Stack**

| Layer        | Technology                              | Rationale                     |
| ------------ | --------------------------------------- | ----------------------------- |
| **Frontend** | React (Vite) + TailwindCSS              | Fast, responsive UI           |
| **Backend**  | Express.js (TypeScript)                 | Quick REST API setup          |
| **Database** | SQLite / PostgreSQL                     | Light and hackathon-friendly  |
| **Auth**     | Firebase Auth (Google)                  | Simple student login          |
| **ML**       | TensorFlow.js (for AEI mock clustering) | JS-native and portable        |
| **Hosting**  | Vercel + Render                         | Free-tier deployment for demo |

---

## **6. Team Responsibilities**

### 🖥️ **Frontend**

* Implement Google login and onboarding screens.
* Build artist registration and “Vibe Check” forms.
* Create AEHI leaderboard dashboard UI.
* Add boosted artist tag on the dashboard.

### ⚙️ **Backend**

* Setup Express server + DB models (`artists`, `submissions`, `aehi`).
* Create endpoints for onboarding, submissions, and AEHI retrieval.
* Implement AEHI computation logic (LDS + AEI).
* Serve leaderboard data to frontend.

### 🤖 **Machine Learning (Optional Enhancement)**

* Use mock NLP clustering to generate AEI values from text samples.
* Return top 3 “audience cluster” keywords per artist.

---

## **7. Implementation Timeline (5-Day Hackathon Plan)**

| Day       | Focus                                   | Deliverables               |
| --------- | --------------------------------------- | -------------------------- |
| **Day 1** | Setup backend, database, and auth       | Working API endpoints      |
| **Day 2** | Build artist + student submission forms | Functional input flow      |
| **Day 3** | Implement AEHI computation              | Mock scoring system active |
| **Day 4** | Create dashboard + boosted artist       | Leaderboard visible        |
| **Day 5** | Final polish + deployment               | Live demo on Vercel/Render |

---

## **8. Out of Scope (Future Work)**

* Real YouTube/TikTok integrations
* Payment gateway setup
* Fraud or duplicate submission detection
* Automated analytics reports

---

## **9. Summary**

**GbeduFlow MVP** delivers a simple but powerful demo of how AI can measure music influence and economic potential.
It proves that **grassroots data = measurable creative economy value** — empowering artists, fans, and stakeholders with insights that finally make Afrobeats quantifiable.


