"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function FancySubscriptionSection() {
    const benefits = [
        "Exclusive travel deals",
        "Insider tips & guides",
        "Early access to new trips",
    ];

    return (
        <section className="relative bg-gray-200 w-[95%] mx-auto rounded-lg py-24 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-10 left-1/4 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-20"
                    animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-15"
                    animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text & Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <CheckCircle className="w-6 h-6 text-blue-500" />
                            <span className="text-blue-500 font-semibold uppercase text-sm">
                                Verified Subscription
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Subscribe & Unlock <span className="text-blue-500">Premium Travel Benefits</span>
                        </h2>

                        <p className="text-gray-600 text-lg max-w-lg">
                            Stay connected with the latest travel deals, exclusive guides, and early trip announcements. Join our verified subscriber community today!
                        </p>

                        <ul className="space-y-3">
                            {benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right Side: Subscription Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center"
                    >
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Join Now</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            Enter your email to subscribe and get access to all premium perks.
                        </p>

                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />

                            {/* Link as Button */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95, rotate: -1 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Link
                                    href="/subscription"
                                    className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all shadow-lg"
                                >
                                    Subscribe
                                </Link>
                            </motion.div>
                        </div>

                        <p className="text-gray-400 text-xs mt-4 text-center">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
