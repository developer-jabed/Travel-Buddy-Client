"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import SubscriptionPlansPage from "../Plans/SubscriptionPlans";
import TravelerRecomended from "./Recomended";

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans text-gray-900">

      {/* ===================== HERO ===================== */}
      <section className="bg-white py-40 px-6 text-center border-b animate-fadeSlide">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4 text-gray-900">
          Explore the World with Travel Buddy
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Find travel partners, discover destinations, and enjoy seamless adventures.
        </p>

        {/* Search Box */}
        <div className="flex justify-center gap-3 max-w-xl mx-auto">
          <Input
            placeholder="Search destinations..."
            className="flex-1 bg-gray-100 border-gray-300"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            <Search className="mr-2 w-5 h-5" />
            Search
          </Button>
        </div>
      </section>

      {/* ===================== RECOMMENDED TRAVELERS ===================== */}
      <div className="animate-fadeDrop">
        <TravelerRecomended />
      </div>

      {/* ===================== POPULAR DESTINATIONS ===================== */}
      <section className="py-28 px-6 bg-white animate-fadeDrop">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Paris", img: "/images/paris.jpg" },
            { name: "Tokyo", img: "/images/tokyo.jpg" },
            { name: "Sydney", img: "/images/sydney.jpg" },
          ].map((dest) => (
            <div
              key={dest.name}
              className="rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-72 object-cover"
              />
              <p className="text-xl font-semibold p-5 text-center text-gray-800">
                {dest.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-28 px-6 bg-gray-100 animate-fadeDrop border-t border-b">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Why Choose Travel Buddy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: "🛡️",
              title: "Trusted & Safe",
              desc: "Verified profiles and safe travel partners.",
            },
            {
              icon: "💸",
              title: "Affordable Options",
              desc: "Choose subscription plans that fit your budget.",
            },
            {
              icon: "📍",
              title: "Smart Matchmaking",
              desc: "Find the perfect travel buddy based on your style.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-10 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 text-center"
            >
              <span className="text-6xl">{item.icon}</span>
              <h3 className="text-2xl font-bold mt-5 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-28 px-6 bg-white animate-fadeDrop">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Traveler Testimonials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Alice",
              review: "Travel Buddy made my Paris trip unforgettable!",
            },
            {
              name: "Bob",
              review: "Very easy to use & smooth experience.",
            },
            {
              name: "Clara",
              review: "Matched with a perfect buddy for Japan!",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="p-10 bg-gray-50 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <p className="text-gray-700 italic">  {t.review}</p>
              <p className="mt-6 font-semibold text-gray-900 text-right">
                — {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SUBSCRIPTION PLANS ===================== */}
      <SubscriptionPlansPage />

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="py-32 px-6 bg-slate-400 text-white text-center animate-fadeSlideUp">
        <h2 className="text-5xl font-extrabold mb-5">Start Your Journey Today</h2>

        <p className="text-lg mb-10 opacity-90">
          Join Travel Buddy for smart, safe & fun travel experiences.
        </p>

        <Button
          onClick={() => router.push("/trip")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg rounded-xl shadow-md transition-all"
        >
          Get Started
        </Button>
      </section>

    </div>
  );
}
