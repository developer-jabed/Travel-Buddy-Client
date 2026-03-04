/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { getDashboardMeta } from "@/services/meta/meta.service";
import {
  MapPin,
  Users,
  Handshake,
  Star,
  CreditCard,
  Bell,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#14B8A6", "#F59E0B", "#6366F1", "#22C55E", "#F97316", "#E11D48", "#FACC15"];


function Counter({ value }: { value: number | string }) {
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  const targetValue = useMemo(() => {
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return value;
  }, [value]);

  useEffect(() => {
    // Instead of setState inside effect → use a proper animation loop
    let start = 0;
    const duration = 900;
    const step = targetValue / (duration / 16);

    const animate = () => {
      start += step;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
      } else {
        setDisplayValue(Math.floor(start));
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      // No cleanup needed for rAF in this case
    };
  }, [targetValue]);

  return <>{typeof value === "string" ? value : displayValue.toLocaleString()}</>;
}


function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((value) => ({ value }));
  return (
    <ResponsiveContainer width="100%" height={32}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill="url(#sparkGradient)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}


function StatCard({
  icon: Icon,
  title,
  value,
  color,
  trend = "+12%",
  data,
}: {
  icon: any;
  title: string;
  value: number | string;
  color: string;
  trend?: string;
  data?: number[];
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="p-5 sm:p-6 rounded-2xl bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1.5">
            <Counter value={value} />
          </p>
        </div>
        <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>

      {data && <div className="mt-3"><Sparkline data={data} color={color} /></div>}

      <div className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
        <TrendingUp size={14} /> {trend} recent
      </div>
    </motion.div>
  );
}

export default function TravelDashboard() {
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardMeta();
        if (res.success && res.data) {
          setMeta(res.data);
        } else {
          setError(res.message || "Failed to load dashboard data");
        }
      } catch (err: any) {
        setError(err.message || "Connection error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  if (!meta) return null;

  const isAdmin = meta.role === "ADMIN";

  const weeklyTrips         = meta.weeklyTrips         ?? [0,0,0,0];
  const weeklyBuddyRequests = meta.weeklyBuddyRequests ?? [0,0,0,0];
  const weeklyMessages      = meta.weeklyMessages      ?? [0,0,0,0];
  const weeklyReviews       = meta.weeklyReviews       ?? [0,0,0,0];
  const weeklyNotifications = meta.weeklyNotifications ?? [0,0,0,0];

  const totalTrips      = meta.totalTripsPersonal ?? meta.totalTrips ?? 0;
  const avgRating       = meta.averageRating      ?? 0;
  const unreadNotifs    = meta.unreadNotifications ?? 0;
  const pendingRequests = meta.pendingBuddyRequestsForMe ?? meta.pendingBuddyRequests ?? 0;
  const safetyScore     = meta.safetyScore        ?? 80;

  const growthData = [
    { name: "W1", trips: weeklyTrips[0], requests: weeklyBuddyRequests[0], messages: weeklyMessages[0], reviews: weeklyReviews[0], notifs: weeklyNotifications[0] },
    { name: "W2", trips: weeklyTrips[1], requests: weeklyBuddyRequests[1], messages: weeklyMessages[1], reviews: weeklyReviews[1], notifs: weeklyNotifications[1] },
    { name: "W3", trips: weeklyTrips[2], requests: weeklyBuddyRequests[2], messages: weeklyMessages[2], reviews: weeklyReviews[2], notifs: weeklyNotifications[2] },
    { name: "W4", trips: weeklyTrips[3], requests: weeklyBuddyRequests[3], messages: weeklyMessages[3], reviews: weeklyReviews[3], notifs: weeklyNotifications[3] },
  ];

  const pieData = [
    { name: "Trips",         value: totalTrips },
    { name: "Requests",      value: pendingRequests },
    { name: "Messages",      value: meta.totalMessages ?? 0 },
    { name: "Reviews",       value: meta.totalReviewsReceived ?? meta.totalReviews ?? 0 },
    { name: "Unread Notifs", value: unreadNotifs },
  ].filter((item) => item.value > 0);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {isAdmin ? "Platform Overview" : "Your Travel Dashboard"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAdmin ? "System-wide statistics" : "Your activity & profile summary"}
          </p>
        </div>
        {isAdmin && (
          <div className="text-sm bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
            Admin View
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        <StatCard icon={MapPin}        title="Total Trips"         value={totalTrips}      color="#14B8A6" data={weeklyTrips} />
        <StatCard icon={Handshake}     title="Pending Requests"    value={pendingRequests} color="#F59E0B" data={weeklyBuddyRequests} />
        <StatCard icon={Star}          title="Avg Rating"          value={avgRating ? avgRating.toFixed(1) : "—"} color="#FACC15" data={weeklyReviews} />
        <StatCard icon={Bell}          title="Unread Notifications" value={unreadNotifs}   color="#E11D48" data={weeklyNotifications} />

        {isAdmin && (
          <>
            <StatCard icon={Users}      title="Total Users" value={meta.totalUsers ?? 0}   color="#0EA5E9" />
            <StatCard icon={CreditCard} title="Revenue"     value={meta.totalRevenue ?? 0} color="#22C55E" />
          </>
        )}

        {!isAdmin && (
          <StatCard icon={ShieldCheck} title="Safety Score" value={`${safetyScore}%`} color="#6366F1" />
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 sm:p-7 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Breakdown</h3>
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => {
                    // Fixed: safe access to percent
                    if (percent === undefined || percent === null) return name;
                    return `${name} ${(percent * 100).toFixed(0)}%`;
                  }}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-5 sm:p-7 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Trend (Last 4 Weeks)</h3>
          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trips"    name="Trips"    stroke="#14B8A6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="requests" name="Requests" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="messages" name="Messages" stroke="#6366F1" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="reviews"  name="Reviews"  stroke="#FACC15" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="notifs"   name="Notifs"   stroke="#E11D48" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}