"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    UserPlus,
    ClipboardList,
    Users,
    MessageSquare,
    Crown,
    ArrowRight,

    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
    const router = useRouter();

    const steps = [
        {
            id: 1,
            title: "Create Your Profile",
            description: "Set up your free account with travel preferences, interests, and verification for better matching.",
            icon: <UserPlus className="w-8 h-8" />,
        },
        {
            id: 2,
            title: "Plan Your Journey",
            description: "Define destinations, dates, budget, and travel style to create your ideal trip blueprint.",
            icon: <ClipboardList className="w-8 h-8" />,
        },
        {
            id: 3,
            title: "Find Perfect Match",
            description: "Our AI matches you with compatible travel buddies based on interests and preferences.",
            icon: <Users className="w-8 h-8" />,
        },
        {
            id: 4,
            title: "Connect & Chat",
            description: "Communicate securely with matches, share ideas, and finalize travel plans together.",
            icon: <MessageSquare className="w-8 h-8" />,
        },
        {
            id: 5,
            title: "Go Premium",
            description: "Upgrade for advanced features, priority matching, and exclusive travel benefits.",
            icon: <Crown className="w-8 h-8" />,
        },
    ];

    return (
        <main className="relative bg-gray-100 rounded-lg w-[95%] mx-auto min-h-screen overflow-hidden">
            {/* Background Orbs */}
            <motion.div
                className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-20"
                animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-15"
                animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container mx-auto px-6 py-32 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-blue-100"
                    >
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-semibold tracking-wide text-blue-500">
                            Simple & Effective
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
                    >
                        How <span className="text-blue-500 mx-3">Travel Buddy</span> Works
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-gray-600"
                    >
                        Connect with like-minded travelers in 5 simple steps. From planning to premium features,
                        we have streamlined the entire travel companionship experience.
                    </motion.p>
                </div>

                {/* Steps Timeline */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2 bg-gray-300 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{ y: -15, transition: { duration: 0.2 } }}
                                className="relative group"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg bg-white border-2 border-blue-500 text-blue-500">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* Step Card */}
                                <div className="pt-10 pb-8 px-6 rounded-2xl h-full flex flex-col items-center text-center border hover:shadow-xl transition-all duration-300 bg-white border-gray-200 min-h-[320px]">
                                    <div className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 bg-blue-50 text-blue-500">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                                    <p className="text-sm leading-relaxed mb-6 text-gray-600 flex-grow">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <Button
                            onClick={() => router.push("/trip")}
                            className="px-12 py-7 text-lg rounded-xl font-semibold group shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-500 text-white"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Button>

                        <Button
                            onClick={() => router.push("/subscription")}
                            variant="outline"
                            className="px-12 py-7 text-lg rounded-xl font-semibold border-2 group hover:shadow-lg transition-all duration-300"
                        >
                            <Crown className="mr-3 w-5 h-5" />
                            View Premium Plans
                        </Button>
                    </div>

                    {/* Stats */}
             
                </motion.div>
            </div>
        </main>
    );
}
