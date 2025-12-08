/* eslint-disable @typescript-eslint/no-explicit-any */

import { getDashboardMeta } from "@/services/meta/meta.service";
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

function TravelCard({ icon: Icon, title, value, gradient }: any) {
    return (
        <div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20 flex items-center gap-4"
        >
            <div className={`p-4 rounded-full bg-gradient-to-br ${gradient}`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
                <h3 className="text-gray-200 text-sm">{title}</h3>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
}

export default async function TravelDashboard() {
    const res = await getDashboardMeta();

    if (!res.success) {
        return <p className="text-red-400">{res.message}</p>;
    }

    const meta = res.data;

    return (
        <div className="p-6 bg-gradient-to-br from-[#0a1a2f] to-[#112d4e] min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-6">
                ✈ Travel Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

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
        </div>
    );
}
