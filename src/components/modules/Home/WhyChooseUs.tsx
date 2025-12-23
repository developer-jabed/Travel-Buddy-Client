"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, Users, Rocket, Star } from "lucide-react";

const reasons = [
    {
        title: "Trusted & Verified",
        description: "We vet every trip and partner to ensure the highest standards of safety and quality.",
        icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    },
    {
        title: "Global Reach",
        description: "Explore trips in over 120 countries, connecting you with unique experiences worldwide.",
        icon: <Globe className="w-6 h-6 text-green-500" />,
    },
    {
        title: "Community Focused",
        description: "Join a thriving community of like-minded travelers and make lifelong connections.",
        icon: <Users className="w-6 h-6 text-purple-500" />,
    },
    {
        title: "Premium Support",
        description: "Our expert support team is available 24/7 to help you plan, book, and enjoy every adventure.",
        icon: <Rocket className="w-6 h-6 text-pink-500" />,
    },
    {
        title: "Highly Rated Experiences",
        description: "Our trips maintain top ratings (4.9★+) from thousands of happy travelers worldwide.",
        icon: <Star className="w-6 h-6 text-yellow-400" />,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative py-24 bg-gray-100 rounded-lg w-[95%] mx-auto overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Why Choose <span className="text-blue-500">Us</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        We provide unmatched travel experiences, expert guidance, and verified trips to ensure your adventures are safe, memorable, and hassle-free.
                    </motion.p>
                </div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, idx) => (
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
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-500 transition">
                                    {reason.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{reason.description}</p>

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
