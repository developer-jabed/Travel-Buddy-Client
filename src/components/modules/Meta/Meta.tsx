/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
    MapPin,
    Users,
    Handshake,
    MessagesSquare,
    ShieldCheck,
    Star,
    Ticket,
    CreditCard,
    Bell,
} from "lucide-react";
import { getDashboardMeta } from "@/services/meta/meta.service";


export function useDashboardMetaData() {
    const [meta, setMeta] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const res = await getDashboardMeta();
            if (!res.success) setError(res.message);
            else setMeta(res.data);
        };
        load();
    }, []);

    return { meta, error };
}

// --------------------
// Fancy Card Component
// --------------------
function TravelCard({ icon: Icon, title, value, gradient }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20 flex items-center gap-4 hover:shadow-2xl hover:scale-[1.03] transition cursor-pointer"
        >
            <div className={`p-4 rounded-full bg-gradient-to-br ${gradient}`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
                <h3 className="text-gray-200 text-sm">{title}</h3>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
        </motion.div>
    );
}

// --------------------
// Main Dashboard
// --------------------
export default function TravelDashboard() {
    const { meta, error } = useDashboardMetaData();

    if (error) return <p className="text-red-400">{error}</p>;
    if (!meta) return <p className="text-gray-400 animate-pulse">Loading...</p>;

    return (
        <div className="p-6 bg-gradient-to-br from-[#0a1a2f] to-[#112d4e] min-h-screen">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-6"
            >
                ✈ Travel Dashboard Overview
            </motion.h2>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Common for All Users */}
                <TravelCard
                    icon={MapPin}
                    title="Total Trips"
                    value={meta.totalTrips ?? 0}
                    gradient="from-blue-500 to-blue-700"
                />

                <TravelCard
                    icon={Handshake}
                    title="Buddy Requests"
                    value={meta.totalBuddyRequests ?? 0}
                    gradient="from-indigo-500 to-indigo-700"
                />

                <TravelCard
                    icon={MessagesSquare}
                    title="Messages"
                    value={meta.totalMessages ?? 0}
                    gradient="from-purple-500 to-purple-700"
                />

                <TravelCard
                    icon={Star}
                    title="Reviews"
                    value={meta.totalReviews ?? 0}
                    gradient="from-yellow-500 to-yellow-700"
                />

                <TravelCard
                    icon={ShieldCheck}
                    title="Safety Score"
                    value={meta.safetyScore ?? 80}
                    gradient="from-green-500 to-green-700"
                />

                <TravelCard
                    icon={Bell}
                    title="Notifications"
                    value={meta.notificationCount ?? 0}
                    gradient="from-pink-500 to-pink-700"
                />

                {/* Traveler-specific */}
                {meta?.upcomingTrips !== undefined && (
                    <TravelCard
                        icon={Ticket}
                        title="Upcoming Trips"
                        value={meta.upcomingTrips}
                        gradient="from-orange-500 to-orange-700"
                    />
                )}

                {meta?.pendingBuddyRequests !== undefined && (
                    <TravelCard
                        icon={Handshake}
                        title="Pending Buddy Requests"
                        value={meta.pendingBuddyRequests}
                        gradient="from-violet-500 to-violet-700"
                    />
                )}

                {/* Admin-specific */}
                {meta?.totalUsers !== undefined && (
                    <TravelCard
                        icon={Users}
                        title="All Users"
                        value={meta.totalUsers}
                        gradient="from-teal-500 to-teal-700"
                    />
                )}

                {meta?.totalReports !== undefined && (
                    <TravelCard
                        icon={ShieldCheck}
                        title="User Reports"
                        value={meta.totalReports}
                        gradient="from-red-500 to-red-700"
                    />
                )}

                {meta?.totalRevenue !== undefined && (
                    <TravelCard
                        icon={CreditCard}
                        title="Revenue"
                        value={`$${meta.totalRevenue}`}
                        gradient="from-rose-500 to-rose-700"
                    />
                )}
            </div>

            {/* STATUS DISTRIBUTION */}
            {meta?.tripStatusBreakdown && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20"
                >
                    <h3 className="text-white text-lg font-semibold mb-4">
                        Trip Status Overview
                    </h3>

                    {meta.tripStatusBreakdown.map((s: any) => (
                        <div key={s.status} className="mb-4">
                            <div className="flex justify-between text-gray-200 mb-1">
                                <span>{s.status}</span>
                                <span>{s.count}</span>
                            </div>
                            <div className="w-full bg-gray-700 h-3 rounded-full">
                                <div
                                    className="h-3 bg-blue-500 rounded-full"
                                    style={{ width: `${s.count * 10}px` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
