🌍 Travel Buddy & Meetup – Client Application (Next.js)

A modern social-travel platform that connects travelers, helps users discover compatible travel partners, manage travel plans, and engage with a travel-first community.

🚀 Live & Repositories

🔗 Live Site: https://travel-buddy-client-chi.vercel.app/

🧩 Client Repository: https://github.com/developer-jabed/Travel-Buddy-Client

🧩 Backend Repository: https://github.com/developer-jabed/Travel-Buddy-Server

✨ Overview

The Travel Buddy client is built with Next.js (App Router), featuring smooth UX, secure authentication, responsive UI, and a powerful dashboard system for both Users and Admins.

This document covers:

✔ Route structures
✔ Component behaviors
✔ Authentication flow
✔ Dashboard features
✔ API communication
✔ Developer setup

⭐ Core Features
🔐 1. Authentication & Authorization

Secure JWT Authentication

Role-Based Access:

Traveler/User

Admin

Auto redirect for:

Unauthorized users

Logged-in users attempting to access login/register

Session persistence using:

Cookies

Server Actions

Protected API routes

Routes:

| Route        | Type      | Description                         |
| ------------ | --------- | ----------------------------------- |
| `/login`     | Public    | User login                          |
| `/register`  | Public    | User registration                   |
| `/dashboard` | Protected | Auto-select dashboard based on role |
 

 👤 2. User Profile Management

Users can:

Create & edit profile

Upload/update profile images (Cloudinary/ImgBB)

Add bio, interests, gender, travel style, age, languages

Specify location (city, country)

View others' profiles

Public profile displays:

Average rating

Recent reviews

Upcoming travel plans

User info & travel preferences

Routes:

 | Route           | Type      | Purpose                         |
 | --------------- | --------- | ------------------------------- |
 | `/profile`      | Protected | View own profile                |
 | `/profile/edit` | Protected | Update profile info             |
 | `/profile/[id]` | Public    | View another traveler’s profile |

🧳 3. Travel Plans

Users can:

Add new travel plans

Edit or delete trips

Set trip description, dates, budget, travel style

Join others’ travel plans

Routes:
| Route                | Purpose                |
| -------------------- | ---------------------- |
| `/travel-plans`      | List your travel plans |
| `/travel-plans/add`  | Create new plan        |
| `/travel-plans/[id]` | Full plan details      |


Each plan page includes:

Host details

Destination & travel dates

Trip budget & style

Join Request button

Reviews about the host

🔍 4. Explore & Matching Engine

Smart filtering system:

Destination search (autocomplete)

Date range filtering

Travel style selection

Interests matching

Real-time search

Route:


| Route      | Description                       |
| ---------- | --------------------------------- |
| `/explore` | Discover travelers & travel plans |


⭐ 5. Review & Rating System

Travelers can:

Add a review

Rate users 1–5 stars

Edit or delete their reviews

Profile displays:

Average rating

Reviews with filters

Trip history with review options

Routes:

| Route               | Purpose                |
| ------------------- | ---------------------- |
| `/reviews/[userId]` | All reviews for a user |

💳 6. Subscription & Payments

Premium features include:

Verified badge

Priority listing

Advanced matching

Stripe / SSLCommerz integration with:

Payment form

Success page

Failure page

Routes:

| Route              | Purpose              |
| ------------------ | -------------------- |
| `/subscription`    | Subscription pricing |
| `/payment/success` | Payment successful   |
| `/payment/fail`    | Payment failed       |


🛡️ 7. Admin Dashboard

Admins can manage:

Users

Travel Plans

Reports

Reviews

Subscription history

Platform analytics

Route:

| Route              | Description          |
| ------------------ | -------------------- |
| `/dashboard/admin` | Admin-only dashboard |



UI adjusts automatically based on role.

🧩 Project Architecture

app/
 ├── (auth)/
 │     ├── login/
 │     ├── register/
 │
 ├── (user)/
 │     ├── profile/
 │     ├── travel-plans/
 │
 ├── explore/
 ├── dashboard/
 ├── travel-plans/
 │     ├── add/
 │     ├── [id]/
 │
 ├── layout.tsx
 └── page.tsx

components/
 ├── navbar/
 ├── cards/
 ├── forms/
 ├── modals/
 └── ui/

lib/
 ├── api.ts
 ├── auth.ts
 ├── utils.ts

hooks/
 ├── useAuth.ts
 ├── useFetch.ts
 └── useQuery.ts

context/
 └── AuthProvider.tsx

styles/
 ├── globals.css
 └── config.css


🧭 Routing Logic – How Routes Behave
🔹 Public Routes

Accessible without login.

/

/login

/register

/explore

/profile/[id]

/travel-plans/[id]

🔹 Protected Routes

Require valid JWT.

/dashboard

/profile

/profile/edit

/travel-plans

/travel-plans/add

🔹 Role-Based Routes
Admin Only:

/dashboard/admin

/dashboard/admin/users

/dashboard/admin/reports

/dashboard/admin/subscriptions

User Only:

/dashboard/user

/reviews/add

/join-requests

🧪 API Communication

All API calls use a centralized helper:

  import api from "@/lib/api";

  const res = await api.get("/travel-plans");

Features:

Token auto-injection

Auto-refresh token on 401

Unified error handler

Interceptor-based response parsing

⚙️ Setup & Installation
1️⃣ Clone Project

git clone https://github.com/developer-jabed/Travel-Buddy-Client
cd Travel-Buddy-Client

2️⃣ Install dependencies

npm install

3️⃣ Environment Setup

Create .env.local:
  NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1
   JWT_SECRET=aaaaaaaaaaa
   REFRESH_TOKEN_SECRECT==aaaaaaaaaaa
   4️⃣ Run development server

   npm run dev
Visit: http://localhost:3000

🛠️ Tech Stack
Next.js 14+ App Router

Tailwind CSS / Shadcn UI

React Query / Zustand

Cloudinary for image hosting

Framer Motion

JWT Authentication

Node/Express backend

📦 Deployment
Frontend: Vercel

Backend: Render

Environment variables configured per deployment

Stripe webhooks supported

🤝 Contributing
PRs and issues welcome on the GitHub repo.

