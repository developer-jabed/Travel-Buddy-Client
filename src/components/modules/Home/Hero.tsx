"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Hero Animation
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 1,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Section Animation
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.from(section.children, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
          opacity: 1,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
      }
    });
  }, []);

  return (
    <div className="font-sans text-gray-900">
      {/* Section 1: Hero */}
      <section
        ref={heroRef}
        className="bg-gradient-to-r from-blue-50 to-blue-100 py-32 px-6 text-center"
      >
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          Explore the World with Travel Buddy
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Find the best trips, destinations, and experiences effortlessly.
        </p>
        <div className="flex justify-center gap-3 max-w-xl mx-auto">
          <Input placeholder="Search destinations..." className="flex-1" />
          <Button className="flex items-center">
            <Search className="mr-2 w-5 h-5" />
            Search
          </Button>
        </div>
      </section>

      {/* Section 2: Popular Destinations */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-24 px-6 bg-white"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Paris", img: "/images/paris.jpg" },
            { name: "Tokyo", img: "/images/tokyo.jpg" },
            { name: "Sydney", img: "/images/sydney.jpg" },
          ].map((dest) => (
            <div
              key={dest.name}
              className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
            >
              <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 w-full">
                {dest.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-24 px-6 bg-blue-50"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Why Choose Travel Buddy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "✈️",
              title: "Safe Travel",
              desc: "Verified guides and partners for worry-free trips.",
            },
            {
              icon: "💰",
              title: "Affordable Plans",
              desc: "Choose deals that fit every budget.",
            },
            {
              icon: "⭐",
              title: "Memorable Experience",
              desc: "Curated trips for lifelong memories.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500"
            >
              <span className="text-yellow-400 text-5xl mb-4 block">
                {item.icon}
              </span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Traveler Testimonials */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-24 px-6 bg-white"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Traveler Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alice",
              review:
                "Travel Buddy made my trip to Paris unforgettable! Highly recommend.",
            },
            {
              name: "Bob",
              review:
                "Easy booking, great support, and amazing experiences.",
            },
            {
              name: "Clara",
              review:
                "Best travel companion app ever! Loved the itineraries.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="p-8 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-500"
            >
              <p className="text-gray-700 italic">"{t.review}"</p>
              <p className="mt-4 font-semibold text-gray-900">- {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Subscription Plans */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-24 px-6 bg-blue-100"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Subscription Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { plan: "Weekly", price: "$9.99" },
            { plan: "Monthly", price: "$29.99" },
            { plan: "Yearly", price: "$299.99" },
          ].map((p) => (
            <div
              key={p.plan}
              className="p-8 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">{p.plan}</h3>
              <p className="text-xl text-gray-700 mb-4">{p.price}</p>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Call-to-Action */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="py-24 px-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Start Your Adventure Today</h2>
        <p className="text-lg mb-8">
          Join Travel Buddy and explore the world like never before.
        </p>
        <Button className="bg-white text-yellow-500 hover:bg-gray-100">
          Get Started
        </Button>
      </section>
    </div>
  );
}
