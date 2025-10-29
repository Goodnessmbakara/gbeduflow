GbeduFlow – Product Requirements Document (MVP Edition)

Hackathon Edition (October 2025)
Prepared by: Esabu Blessing
North Star Metric: Launch the Afrobeats Economic Heat Index (AEHI) for 10 artists


1. Overview

GbeduFlow is an AI-powered web app that measures the grassroots hype and export readiness of Nigerian music artists.
It merges campus-level fan data (“vibes”) and audience text clustering to create one metric — the Afrobeats Economic Heat Index (AEHI).

Core idea:

Turn student hype + online signals into data that helps artists, promoters, and policymakers see which sounds are blowing up.

2. Problem & Solution
Problem

No data captures who’s trending locally or where Afrobeats is expanding globally.

Sponsors and promoters make decisions without real insights.

Solution

Local Demand Score (LDS): Based on student hype data (ratings + submissions).

Audience Export Index (AEI): Based on audience clustering from bios/comments.

Combine both → Afrobeats Economic Heat Index (AEHI) (0–100 scale).

3. MVP Goals
Goal	Metric	Target
Compute AEHI for real demo artists	Successful AEHI output	≥10 artists
Student engagement	% of completed “Vibe Check” forms	≥70%
Monetization demo	Working “Boosted Challenge”	1
Visual output	AEHI dashboard working	✅
4. Key Features (Build-Now Scope)
ID	Feature	Description	Stack Responsibility
1. Artist Onboarding	Artist registers (name, genre, video link)	Frontend + Backend	
2. Student Vibe Check	Student rates artist (1–5) and tags university	Frontend + Backend	
3. AEHI Engine	Combine LDS + AEI into one score (mock or simple formula)	Backend + ML	
4. Dashboard (Leaderboard)	Display top artists and scores	Frontend	
5. Boosted Challenge (Demo)	Mark one artist as boosted for visibility	Frontend + Backend	
5. Technical Stack
Layer	Technology	Reason
Frontend	React (Vite) + Tailwind	Fast, mobile-friendly UI
Backend	Express.js (TypeScript)	Simple and hackathon-ready
Database	SQLite / PostgreSQL	Light, quick setup
Auth	Firebase Auth	Easy Google login
ML / Scoring	TensorFlow.js (for AEI)	Lightweight JS ML
Hosting	Vercel + Render	Free-tier deployment
6. Task Breakdown
Frontend

 Create landing & onboarding screens

 Implement Google login

 Build artist form + “Vibe Check” page

 Create simple dashboard for AEHI leaderboard

 Add “Boosted” tag indicator

Backend

 Setup Express server and DB

 Endpoints: /artists, /submissions, /aehi

 Compute LDS + AEI mock values

 Merge into AEHI score (0–100)

 Return leaderboard data

ML (optional but valuable)

 Use mock NLP clustering on audience text (3 keywords per artist)

 Return as part of AEHI insights

7. Hackathon Implementation Plan (5-Day Sprint)
Day	Focus	Deliverables
Day 1	Setup backend, DB, auth	Working routes & test data
Day 2	Build artist & student forms	Working input flow
Day 3	Implement AEHI logic	Compute + save scores
Day 4	Create leaderboard UI	Dashboard live
Day 5	Add Boosted Challenge demo + deploy	Final pitch-ready MVP
8. Out of Scope (Future Versions)

Real YouTube/TikTok data scraping

Payment gateway integration

Automated fraud or duplicate detection

9. Summary

GbeduFlow is a fast, functional MVP proving that Afrobeats’ grassroots energy can be quantified.
It gives artists visibility, students engagement, and promoters insight — all powered by AI, built for speed, and hackathon-ready.

*This PRD serves as the single source of truth for the GbeduFlow product development during the hackathon and beyond.*
