🌍 Travel Buddy & Meetup – Client Application (Next.js)
🔗 Live Site: https://your-live-url.com
🧩 Client Repository: https://github.com/your-username/travelbuddy-client
🧩 Backend Repository: https://github.com/your-username/travelbuddy-api
🚀 Overview

The Travel Buddy & Meetup platform is a social-travel application that helps travelers find compatible partners for upcoming trips. The client is built with Next.js (App Router), optimized for performance, SEO, and modern UI/UX.

This documentation covers:

How the project works internally

How routing and authentication are implemented

Dashboard functionality

Folder architecture

Installation and environment setup

✨ Key Features (Client)
🔐 1. Authentication & Authorization

Fully integrated JWT authentication

Token stored securely (HTTP-only cookie / storage depending on setup)

Role-based UI

Auto-redirect on protected routes

Persistent login state using server actions + API routes

👤 2. User Profiles

Profile creation and editing

Upload and update profile image (Cloudinary/ImgBB)

Travel interests, visited countries, bio, location

Public profile view for other travelers

Profile page displays:

Avg rating

Recent reviews

Upcoming travel plans

🧳 3. Travel Plans Management

Users can:

Add, edit, delete travel plans

Set travel type, budget, destination, dates, description

Visibility for others to discover the trip

View full details in /travel-plans/[id]

Request to join another user’s plan

🔍 4. Explore & Matching

Dynamic filtering by destination, dates, interests, travel type

Real-time search

Grid listing with traveler cards

Quick profile preview

⭐ 5. Reviews & Ratings

Leave review after completing a trip

1–5 star rating

Edit or delete review

User profile shows:

Average rating

Trip-based review list

Review & Report buttons available on traveler details page

💳 6. Subscription & Payments

Integrated payment gateway (Stripe / SSLCommerz)

Premium features unlock:

Verified badge

Advanced matching

Priority listing in Explore page

Payment success/failure callback pages

🛠️ 7. Admin Dashboard

Admins can manage:

Users

Travel Plans

Reviews & Reports

Subscription history

Analytics overview

The admin interface is integrated into the same Next.js client via role-based routes.

🧩 Project Architecture
/app
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

/components
 ├── navbar/
 ├── cards/
 ├── forms/
 ├── modals/
 └── ui/

/lib
 ├── api.ts        # API helper with interceptors
 ├── auth.ts       # token handling & role checks
 ├── utils.ts

/hooks
 ├── useAuth.ts
 ├── useFetch.ts
 └── useQuery.ts

/context
 └── AuthProvider.tsx

/styles
 ├── globals.css
 └── config.css

🧭 Routing & Flow Explanation
1. Authentication Routes
Route	Description
/login	User login page
/register	User registration with default role “User”

Login sets:

accessToken

user data in Auth Context

redirects to /dashboard

Protected pages use:

import { getCurrentUser } from "@/lib/auth";

2. User Dashboard

The dashboard renders based on role:

🧑‍💼 User Dashboard

Upcoming travel plans

Recommended matches

Pending join requests

Review requests

Subscription status

🛡️ Admin Dashboard

Manage all users

Manage travel plans

Review flagged content

Platform analytics

Conditional layout:

{user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}

3. Travel Plans
Route	Purpose
/travel-plans	List user plans
/travel-plans/add	Create new plan
/travel-plans/[id]	Full plan details

Each plan card opens a details page with:

Host info

Trip schedule

Budget

Travel type

“Request to Join” button

Reviews about the host

4. Explore & Matching

Route: /explore
Contains filters like:

Destination (autocomplete)

Date range

Interests

Travel type

Data fetched from backend using dynamic query params.

5. Traveler Details + Review & Report

In /profile/[id] or /travelers/[id], user can:

View traveler’s profile

See rating & reviews

See upcoming trips

Buttons included:

Write Review (opens modal with rating + text)

Report User (sends issue report to admin)

⚙️ Installation & Setup
1️⃣ Clone the project
git clone https://github.com/your-username/travelbuddy-client
cd travelbuddy-client

2️⃣ Install dependencies
npm install

3️⃣ Add environment variables

Create .env.local:

NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_CLOUDINARY_URL=your-cloudinary-upload-url
NEXT_PUBLIC_PAYMENT_KEY=your-payment-gateway-key

4️⃣ Run locally
npm run dev


App runs at:
👉 http://localhost:3000

🛠️ Tech Stack
Frontend

Next.js 14+ (App Router)

Tailwind CSS / DaisyUI

Axios for API calls

Zustand / Context API

React Query (optional)

Cloudinary/ImgBB for images

Framer Motion (optional)

JWT-based auth

Backend

(Node/Express/MongoDB — full details in backend repo)

🧪 API Communication Pattern

Client calls backend using a centralized API helper:

import api from "@/lib/api";

const res = await api.get("/travel-plans");


Auto-injects token with interceptors & handles 401 refresh logic.

📦 Deployment

Frontend: Vercel 

Backend: Render 

Use production env variables

Configure CORS

SSL certificate mandatory for payment

🤝 Contributing

Open PRs, issues, and feature requests are welcome.

📄 License

MIT License.