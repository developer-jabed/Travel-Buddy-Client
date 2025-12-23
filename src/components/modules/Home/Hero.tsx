"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Globe,
  Shield,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDE_DURATION = 5000;

export default function HeroCarousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      title: "Discover Perfect Travel Companions",
      subtitle:
        "Connect with verified travelers worldwide using our intelligent matching system.",
      image: "/images/carosel-2.jpg",
      stats: ["50K+ Verified Travelers", "120+ Countries"],
    },
    {
      title: "Adventure Awaits Everywhere",
      subtitle:
        "Find your next unforgettable journey with like-minded explorers.",
      image: "/images/carosel.jpg",
      stats: ["15K+ Successful Trips", "98% Satisfaction Rate"],
    },
    {
      title: "Travel Smart. Travel Safe.",
      subtitle:
        "Verified profiles, secure chats, and trusted global connections.",
      image: "/images/carosel-3.jpg",
      stats: ["AI-Powered Matching", "24/7 Support"],
    },
  ];

  /* ================= AUTO SLIDE (FIXED) ================= */
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  };

  const scrollNext = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  /* ================= SLIDE ANIMATION ================= */
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative w-full  rounded-lg min-h-[70vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================= BACKGROUND SLIDES ================= */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                135deg,
                oklch(var(--primary)/0.8) 0%,
                oklch(var(--primary)/0.5) 30%,
                oklch(var(--background)/0.2) 70%,
                transparent 100%
              )`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 min-h-[70vh] flex items-center py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span>{slides[current].title.split(" ")[0]}</span>
              <span className="block text-primary">
                {slides[current].title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              {slides[current].subtitle}
            </p>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push("/trip")}
                className="px-8 py-6 text-lg rounded-xl"
              >
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/trip")}
                className="px-8 py-6 text-lg rounded-xl"
              >
                <Search className="mr-2 w-5 h-5" /> Explore
              </Button>
            </div>

            <div className="flex gap-6 pt-6">
              {slides[current].stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i === 0 ? <Users /> : <Globe />}
                  <span>{stat}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="hidden lg:grid gap-6">
            <InfoCard icon={<Users />} title="Global Community" />
            <InfoCard icon={<Shield />} title="Verified Profiles" offset />
            <InfoCard icon={<MapPin />} title="Smart Matching" />
          </div>
        </div>
      </div>

      {/* ================= NAV BUTTONS (FIXED ALIGNMENT) ================= */}
      <div className="absolute inset-y-0 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto p-3 rounded-full bg-card/70 backdrop-blur border hover:scale-110 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={next}
          className="pointer-events-auto p-3 rounded-full bg-card/70 backdrop-blur border hover:scale-110 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollNext}
        className="absolute bottom-8 right-8 p-3 rounded-full bg-card/70 backdrop-blur border"
      >
        <ChevronDown />
      </motion.button>

      {/* ================= PROGRESS BAR ================= */}
      <motion.div
        key={current}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-primary"
      />
    </section>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({
  icon,
  title,
  offset,
}: {
  icon: React.ReactNode;
  title: string;
  offset?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`p-6 rounded-xl bg-card/70 backdrop-blur border shadow ${
        offset ? "ml-12" : ""
      }`}
    >
      <div className="flex gap-4 items-center">
        <div className="p-3 rounded-lg bg-accent">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
    </motion.div>
  );
}
