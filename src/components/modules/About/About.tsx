"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function AboutPage() {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    gsap.from(headingRef.current, {
      opacity: 1,
      y: -40,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(paragraphRef.current, {
      opacity: 1,
      y: 20,
      delay: 0.5,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 1, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl bg-white shadow-xl p-10 rounded-2xl"
      >
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-4xl font-bold text-gray-900 mb-6 text-center"
        >
          About Travel Buddy
        </h1>

        {/* Description */}
        <p
          ref={paragraphRef}
          className="text-lg text-gray-700 leading-8 text-center"
        >
          Welcome to <span className="font-semibold">Travel Buddy</span> — your
          ultimate partner for simplifying travel planning.  
          This platform helps you explore destinations, plan trips, track
          expenses, and connect with fellow travelers for a more enjoyable
          journey.
          <br />
          <br />
          My name is{" "}
          <span className="font-semibold">Jabed</span>. I am a CSE student at{" "}
          <span className="font-semibold">Dinajpur Polytechnic Institute</span>.
          I built Travel Buddy with the goal of making travel easier and more
          accessible for everyone.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center mt-10 gap-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg"
          >
            <Link href="/">Back to Home</Link>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold"
          >
            <a href="#">Contact Me</a>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
