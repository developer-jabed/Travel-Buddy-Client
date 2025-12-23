"use client";

import { motion } from "framer-motion";
import { Star, Users, MapPin, Sparkles, CheckCircle } from "lucide-react";

const highlights = [
  {
    title: "Explore World-Class Destinations",
    description: "From serene beaches to thrilling mountains, find trips that inspire your next adventure.",
    icon: <MapPin className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Trusted & Verified Trips",
    description: "Every trip is curated and verified to ensure safety, fun, and unforgettable memories.",
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
  },
  {
    title: "Join a Thriving Community",
    description: "Connect with 50k+ like-minded travelers worldwide and share your experiences.",
    icon: <Users className="w-6 h-6 text-purple-500" />,
  },
  {
    title: "Top Rated Experiences",
    description: "Enjoy highly rated trips with 4.9★ feedback from thousands of happy travelers.",
    icon: <Star className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: "Exclusive Premium Support",
    description: "Our expert team ensures you get the best guidance and assistance at every step.",
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
  },
  {
    title: "Seamless Booking & Planning",
    description: "Plan your adventures easily with our intuitive tools and helpful resources.",
    icon: <Star className="w-6 h-6 text-teal-500" />,
  },
];

export default function PopularTripsTextGrid() {
  return (
    <section className="relative py-24 bg-gray-100 w-[95%] mx-auto overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Inspire Your Next Adventure
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover why travelers trust us for memorable experiences. We provide the best support,
            expert guidance, and inspiring journeys to make every trip unforgettable.
          </motion.p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-500 transition">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>

              {/* Decorative Glow */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-200 opacity-20 blur-3xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
