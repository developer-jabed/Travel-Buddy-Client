"use client";

import { motion } from "framer-motion";
import {
  Mountain,
  Umbrella,
  Building2,
  Trees,
  Music,
  Heart,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";


const travelCategories = [
  { name: "Adventure", icon: <Mountain className="w-10 h-10" />, description: "Thrilling outdoor expeditions and extreme sports", travelers: "2.5K+ Active", color: "text-blue-500", delay: 0 },
  { name: "Beach", icon: <Umbrella className="w-10 h-10" />, description: "Tropical getaways and coastal relaxation", travelers: "1.8K+ Active", color: "text-teal-400", delay: 0.1 },
  { name: "Culture", icon: <Building2 className="w-10 h-10" />, description: "Historic sites and cultural immersion", travelers: "1.2K+ Active", color: "text-yellow-500", delay: 0.2 },
  { name: "Hiking", icon: <Trees className="w-10 h-10" />, description: "Mountain trails and wilderness exploration", travelers: "3.1K+ Active", color: "text-green-500", delay: 0.3 },
  { name: "Festival", icon: <Music className="w-10 h-10" />, description: "Music events and cultural celebrations", travelers: "800+ Active", color: "text-pink-500", delay: 0.4 },
  { name: "Wellness", icon: <Heart className="w-10 h-10" />, description: "Retreats, yoga, and mindfulness journeys", travelers: "950+ Active", color: "text-purple-500", delay: 0.5 },
];

export default function TravelCategories() {
  return (
    <section className="relative w-[95%] mx-auto rounded-lg py-20 bg-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight"
          >
            Discover Your <span className="text-blue-500">Travel Style</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 text-lg md:text-xl"
          >
            Explore categories that match your interests and find the perfect travel companions.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelCategories.map((category,) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: category.delay }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-md rounded-2xl p-8 cursor-pointer hover:shadow-xl transition-shadow"
            >
              {/* Icon */}
              <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-6 bg-gray-100 ${category.color}`}>
                {category.icon}
              </div>
              {/* Name */}
              <h3 className={`text-2xl font-semibold mb-2 ${category.color}`}>
                {category.name}
              </h3>
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>
              {/* Travelers */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{category.travelers}</span>
                </div>
                <Link href="/trip" passHref>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-1 text-white bg-blue-500 px-4 py-2 rounded-full text-sm"
                  >
                    Explore <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
