/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current.children, {
      opacity: 1,
      y: 40,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <motion.div
        initial={{ opacity: 1, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10"
        ref={containerRef}
      >
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          About Travel Buddy
        </h1>

        {/* Intro */}
        <p className="text-lg text-gray-700 leading-8 text-center mb-12">
          <strong>Travel Buddy</strong> is a modern social travel platform that
          helps travelers plan trips, connect with compatible travel partners,
          communicate securely, and manage travel experiences from start to
          finish — all in one place.
        </p>

        {/* USER FLOW */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            👤 User Registration & Login
          </h2>
          <p className="text-gray-700 leading-7">
            New users can create an account via{" "}
            <code className="bg-gray-100 px-1 rounded">/register</code> by
            providing their name, email, and password. Existing users can log in
            through{" "}
            <code className="bg-gray-100 px-1 rounded">/login</code>.
          </p>
          <p className="text-gray-700 leading-7">
            Once logged in, users are authenticated using secure JWT tokens and
            automatically redirected to their role-based dashboard. Protected
            routes ensure unauthorized access is blocked.
          </p>
        </section>

        {/* PROFILE */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            🧑 Profile Management
          </h2>
          <p className="text-gray-700 leading-7">
            Users can manage their personal profile via{" "}
            <code className="bg-gray-100 px-1 rounded">/profile</code> and update
            details through{" "}
            <code className="bg-gray-100 px-1 rounded">/profile/edit</code>.
          </p>
          <p className="text-gray-700 leading-7">
            Profiles include bio, interests, travel style, age, gender,
            languages, location, profile image, average rating, reviews, and
            upcoming trips. Other travelers can view public profiles to decide
            compatibility.
          </p>
        </section>

        {/* TRAVEL PLANS */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            🧳 Travel Planning System
          </h2>
          <p className="text-gray-700 leading-7">
            Users can create travel plans from{" "}
            <code className="bg-gray-100 px-1 rounded">/travel-plans/add</code>.
            Each plan contains destination, travel dates, budget, travel style,
            and description.
          </p>
          <p className="text-gray-700 leading-7">
            All created trips appear in{" "}
            <code className="bg-gray-100 px-1 rounded">/travel-plans</code>, and
            each trip has a dedicated details page where other users can view
            full information.
          </p>
        </section>

        {/* BUDDY REQUEST */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            🤝 Buddy Request System
          </h2>
          <p className="text-gray-700 leading-7">
            When a user finds a suitable travel plan, they can send a join/buddy
            request directly from the trip details page.
          </p>
          <p className="text-gray-700 leading-7">
            The trip host can accept or reject requests. Only accepted users can
            join the trip, ensuring safety, control, and privacy for travelers.
          </p>
        </section>

        {/* CHAT */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            💬 Chat & Communication
          </h2>
          <p className="text-gray-700 leading-7">
            Once a buddy request is accepted, a chat channel becomes available
            between users. This allows travelers to communicate, plan details,
            and build trust before the journey.
          </p>
          <p className="text-gray-700 leading-7">
            The chat system is optimized to avoid unnecessary auto-refreshing
            while still providing a smooth messaging experience.
          </p>
        </section>

        {/* EXPLORE */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            🔍 Explore & Match
          </h2>
          <p className="text-gray-700 leading-7">
            Through the{" "}
            <code className="bg-gray-100 px-1 rounded">/explore</code> route,
            users can search travel plans and travelers using filters like
            destination, date range, interests, and travel style.
          </p>
        </section>

        {/* SUBSCRIPTION */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            💳 Subscription & Payments
          </h2>
          <p className="text-gray-700 leading-7">
            Users can upgrade their experience via{" "}
            <code className="bg-gray-100 px-1 rounded">/subscription</code>.
            Premium members receive verified badges, priority listings, and
            advanced matching features.
          </p>
          <p className="text-gray-700 leading-7">
            Payments are securely handled through Stripe or SSLCommerz, with
            dedicated success and failure pages.
          </p>
        </section>

        {/* ADMIN */}
        <section className="space-y-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            🛡️ Admin Dashboard
          </h2>
          <p className="text-gray-700 leading-7">
            Admins access a powerful dashboard via{" "}
            <code className="bg-gray-100 px-1 rounded">/dashboard/admin</code>.
          </p>
          <p className="text-gray-700 leading-7">
            They can manage users, travel plans, reports, reviews, subscriptions,
            and platform analytics. All admin routes are protected by strict
            role-based authorization.
          </p>
        </section>

        {/* FOOTER CTA */}
        <div className="flex justify-center gap-6 mt-14">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg font-semibold"
            >
              Back to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/trip"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl font-semibold"
            >
              Explore Trips
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
