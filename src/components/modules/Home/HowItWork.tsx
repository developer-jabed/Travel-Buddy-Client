"use client";

import { motion } from "framer-motion";
import {
    UserPlus,
    ClipboardList,
    Users,
    MessageSquare,
    Crown
} from "lucide-react";

export default function HowItWorks() {
    const steps = [
        {
            title: "Sign Up",
            description:
                "Create your free account in seconds. Verify your profile to build trust and improve your matching accuracy.",
            icon: <UserPlus size={48} />,
        },
        {
            title: "Create Your Travel Plan",
            description:
                "Set your destinations, dates, interests, and travel style. A complete plan helps the system find the best match.",
            icon: <ClipboardList size={48} />,
        },
        {
            title: "Find Your Travel Buddy",
            description:
                "Get AI-powered recommendations based on compatibility, interests, travel preferences, and safety score.",
            icon: <Users size={48} />,
        },
        {
            title: "Chat With Your Buddy",
            description:
                "Message your matched buddy instantly. Plan your trip together, share ideas, and confirm arrangements.",
            icon: <MessageSquare size={48} />,
        },
        {
            title: "Subscribe for Better Experience",
            description:
                "Unlock premium features like advanced matching, unlimited chats, priority support, and verified badge.",
            icon: <Crown size={48} />,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16 flex flex-col items-center">
            {/* Page Header */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 text-center"
            >
                How It Works
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-600 text-center max-w-2xl mt-4"
            >
                Connect with like-minded travelers in just a few steps. Plan your journey,
                match with compatible buddies, and enjoy premium travel features.
            </motion.p>

            {/* Steps Section */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-w-6xl w-full">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="
              bg-white shadow-lg rounded-2xl p-8 text-center 
              border hover:shadow-xl transition
            "
                    >
                        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-6">
                            {step.icon}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800">
                            {step.title}
                        </h3>

                        <p className="text-gray-600 mt-3">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12"
            >
                <a
                    href="/subscription"
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition font-medium"
                >
                    Get Started
                </a>
            </motion.div>
        </div>
    );
}
