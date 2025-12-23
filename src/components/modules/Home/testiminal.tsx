"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Alice Johnson", role: "Adventure Traveler", avatar: "/images/comment.jpg", message: "TravelBuddy helped me find like-minded travelers! Our hiking trip was unforgettable." },
  { name: "Mark Thompson", role: "Beach Lover", avatar: "/images/comment-2.jpg", message: "I never thought I could meet people with the same travel vibe. Highly recommend!" },
  { name: "Sophia Lee", role: "Culture Enthusiast", avatar: "/images/comment-3.jpg", message: "Thanks to TravelBuddy, I explored amazing cultural experiences with new friends!" },
  { name: "David Kim", role: "Mountain Explorer", avatar: "/images/comment-4.jpg", message: "Hiking with new friends was amazing. TravelBuddy made it effortless." },
  { name: "Emma Watson", role: "Wellness Traveler", avatar: "/images/comment-5.jpg", message: "I found yoga partners and wellness trips that matched my interests perfectly." },
  { name: "John Doe", role: "Festival Lover", avatar: "/images/comment-6.jpg", message: "Music festivals were more fun with travelers who shared my passion!" },
];

const VISIBLE_CARDS = 3;
const AUTO_SLIDE_DELAY = 5000;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  // Split testimonials into slides
  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < testimonials.length; i += VISIBLE_CARDS) {
      result.push(testimonials.slice(i, i + VISIBLE_CARDS));
    }
    return result;
  }, []);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative py-24 w-[95%] mx-auto rounded-lg bg-gray-200 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
          What Our Travelers Say
        </h2>
        <p className="max-w-2xl mx-auto mb-16 text-gray-600">
          Real experiences from travelers who found their perfect travel buddies.
        </p>

        <div className="relative">
          {/* Carousel slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex gap-6 justify-center"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {slides[index].map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl shadow-lg p-8 flex-1 min-w-[300px] max-w-[350px] flex flex-col items-center text-center"
                >
                  <Quote className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-gray-700 text-lg mb-6">{t.message}</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-200">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-blue-50 transition"
          >
            <ChevronLeft className="w-5 h-5 text-blue-500" />
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-blue-50 transition"
          >
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "bg-blue-500 w-6" : "bg-gray-300 w-2"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
