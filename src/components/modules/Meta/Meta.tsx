"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getDashboardMeta } from "@/services/meta/meta.service";
import {
  MapPin,
  Users,
  Handshake,
  MessagesSquare,
  Star,
  CreditCard,
  Bell,
  TrendingUp,
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

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <>{count.toLocaleString()}</>;
}

function Sparkline({ data, color }: any) {
  return (
    <ResponsiveContainer width="100%" height={30}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} fill="url(#sparkGradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function TravelCard({ icon: Icon, title, value, color }: any) {
  const sparkData = [
    { value: value * 0.6 },
    { value: value * 0.7 },
    { value: value * 0.8 },
    { value: value * 0.9 },
    { value },
  ];
  const percentage = "+12%";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-4 sm:p-6 rounded-3xl bg-white shadow-md hover:shadow-xl border border-gray-100 transition-all"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            <Counter value={Number(value)} />
          </p>
        </div>
        <div className="p-3 rounded-2xl" style={{ backgroundColor: color + "20" }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      <div className="mt-2">
        <Sparkline data={sparkData} color={color} />
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600 font-medium">
        <TrendingUp size={14} /> {percentage} this month
      </div>
    </motion.div>
  );
}

export default function TravelDashboard() {
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardMeta(); // <-- call backend API
        if (res.success) setMeta(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        Loading dashboard...
      </div>
    );

  // Use real backend weekly data (fallback to zeros if missing)
  const weeklyUsers = meta.weeklyUsers ?? [0, 0, 0, 0];
  const weeklyBuddyRequests = meta.weeklyBuddyRequests ?? [0, 0, 0, 0];
  const weeklyMessages = meta.weeklyMessages ?? [0, 0, 0, 0];
  const weeklyReviews = meta.weeklyReviews ?? [0, 0, 0, 0];
  const weeklyNotifications = meta.weeklyNotifications ?? [0, 0, 0, 0];
  const weeklyTrips = meta.weeklyTrips ?? [0, 0, 0, 0];

  const growthData = [
    { name: "Week 1", users: weeklyUsers[0], requests: weeklyBuddyRequests[0], messages: weeklyMessages[0], reviews: weeklyReviews[0], notifications: weeklyNotifications[0], trips: weeklyTrips[0] },
    { name: "Week 2", users: weeklyUsers[1], requests: weeklyBuddyRequests[1], messages: weeklyMessages[1], reviews: weeklyReviews[1], notifications: weeklyNotifications[1], trips: weeklyTrips[1] },
    { name: "Week 3", users: weeklyUsers[2], requests: weeklyBuddyRequests[2], messages: weeklyMessages[2], reviews: weeklyReviews[2], notifications: weeklyNotifications[2], trips: weeklyTrips[2] },
    { name: "Week 4", users: weeklyUsers[3], requests: weeklyBuddyRequests[3], messages: weeklyMessages[3], reviews: weeklyReviews[3], notifications: weeklyNotifications[3], trips: weeklyTrips[3] },
  ];

  const pieData = [
    { name: "Trips", value: meta.totalTrips ?? 0 },
    { name: "Buddy Requests", value: meta.totalBuddyRequests ?? 0 },
    { name: "Messages", value: meta.totalMessages ?? 0 },
    { name: "Reviews", value: meta.totalReviews ?? 0 },
    { name: "Notifications", value: meta.unreadNotifications ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <TravelCard icon={MapPin} title="Trips" value={meta.totalTrips ?? 0} color="#14B8A6" />
        <TravelCard icon={Users} title="Users" value={meta.totalUsers ?? 0} color="#0EA5E9" />
        <TravelCard icon={Handshake} title="Requests" value={meta.totalBuddyRequests ?? 0} color="#F59E0B" />
        <TravelCard icon={MessagesSquare} title="Messages" value={meta.totalMessages ?? 0} color="#6366F1" />
        <TravelCard icon={Star} title="Reviews" value={meta.totalReviews ?? 0} color="#FACC15" />
        <TravelCard icon={Bell} title="Notifications" value={meta.unreadNotifications ?? 0} color="#E11D48" />
        <TravelCard icon={CreditCard} title="Revenue" value={meta.totalRevenue ?? 0} color="#22C55E" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Pie Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={pieData} innerRadius={80} outerRadius={130} paddingAngle={4} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Users Growth Line */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Weekly Growth</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#14B8A6" strokeWidth={3} />
              <Line type="monotone" dataKey="requests" stroke="#F59E0B" strokeWidth={3} />
              <Line type="monotone" dataKey="messages" stroke="#6366F1" strokeWidth={3} />
              <Line type="monotone" dataKey="reviews" stroke="#FACC15" strokeWidth={3} />
              <Line type="monotone" dataKey="notifications" stroke="#E11D48" strokeWidth={3} />
              <Line type="monotone" dataKey="trips" stroke="#22C55E" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
