/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import {
  Users,
  MapPin,
  Handshake,
  DollarSign,
  AlertTriangle,
  Clock,
  FileWarning,
  UserCheck,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { getDashboardMetaData } from "@/services/meta/meta.service"

const CHART_COLORS = [
  "#4f46e5", // indigo-600
  "#059669", // emerald-600
  "#d97706", // amber-600
  "#dc2626", // rose-600
  "#7c3aed", // violet-600
]

export default function AdminDashboard() {
  const [meta, setMeta] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardMetaData().then((res) => {
      if (res.success) setMeta(res.data.data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const weeklyData = [
    { name: "W1", trips: meta?.weeklyTrips?.[0] ?? 0, requests: meta?.weeklyBuddyRequests?.[0] ?? 0 },
    { name: "W2", trips: meta?.weeklyTrips?.[1] ?? 0, requests: meta?.weeklyBuddyRequests?.[1] ?? 0 },
    { name: "W3", trips: meta?.weeklyTrips?.[2] ?? 0, requests: meta?.weeklyBuddyRequests?.[2] ?? 0 },
    { name: "W4", trips: meta?.weeklyTrips?.[3] ?? 0, requests: meta?.weeklyBuddyRequests?.[3] ?? 0 },
  ]

  const pieData = [
    { name: "Trips",     value: meta?.totalTripsGlobal ?? 0 },
    { name: "Users",     value: meta?.totalUsers ?? 0 },
    { name: "Requests",  value: meta?.totalBuddyRequestsGlobal ?? 0 },
    { name: "Reports",   value: meta?.totalReports ?? 0 },
  ].filter(d => d.value > 0)

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-10 lg:space-y-14">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-1.5 text-gray-600">
              Real-time platform overview
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium border-gray-300">
            Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Badge>
        </div>

        <Separator />

        {/* Revenue – standout but clean */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6 lg:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-lg bg-emerald-100">
                  <DollarSign className="h-7 w-7 text-emerald-700" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Total Revenue</h2>
              </div>
              <div className="text-5xl lg:text-6xl font-extrabold text-gray-900">
                <CountUp end={meta?.totalRevenue ?? 0} separator="," duration={1.8} prefix="$" />
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <Badge className="bg-emerald-100 text-emerald-800 px-4 py-1.5 text-base">
                  {meta?.totalSuccessfulPayments ?? 0} payments
                </Badge>
                <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                  +12% this month
                </Badge>
              </div>
            </div>

            <div className="w-full lg:w-72">
              <Progress
                value={78}
                className="h-3 bg-gray-100 [&>div]:bg-emerald-600 rounded-full"
              />
              <p className="mt-2 text-xs text-gray-500 text-center font-medium">
                Progress toward monthly target
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-10" />

        {/* KPI Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            { title: "Total Users",     value: meta?.totalUsers ?? 0,        icon: Users,        color: "indigo" },
            { title: "Verified Users",  value: meta?.totalVerifiedUsers ?? 0, icon: UserCheck,    color: "emerald" },
            { title: "Total Trips",     value: meta?.totalTripsGlobal ?? 0,   icon: MapPin,       color: "teal" },
            { title: "Buddy Requests",  value: meta?.totalBuddyRequestsGlobal ?? 0, icon: Handshake, color: "amber" },
            { title: "Pending Requests",value: meta?.pendingBuddyRequestsGlobal ?? 0, icon: Clock,    color: "orange" },
            { title: "Total Reports",   value: meta?.totalReports ?? 0,       icon: FileWarning,  color: "rose" },
            { title: "Pending Reports", value: meta?.pendingReports ?? 0,     icon: AlertTriangle,color: "red" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{item.title}</p>
                      <p className={`text-3xl lg:text-4xl font-bold mt-1 text-${item.color}-700`}>
                        <CountUp end={item.value} separator="," duration={1.5} />
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-${item.color}-50`}>
                      <item.icon className={`h-7 w-7 text-${item.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Platform Distribution</CardTitle>
              <CardDescription className="text-gray-600">Overview of core entities</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent = 0 }) => Math.round(percent * 100) > 4 ? `${name} ${Math.round(percent * 100)}%` : ""}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Weekly Activity</CardTitle>
              <CardDescription className="text-gray-600">Trips & requests trend</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer>
                <BarChart data={weeklyData} barGap={12}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tick={{ fill: "#6b7280" }} />
                  <YAxis axisLine={false} tick={{ fill: "#6b7280" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="trips" name="Trips" fill="#4f46e5" radius={[6,6,0,0]} />
                  <Bar dataKey="requests" name="Requests" fill="#059669" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500">
          Dashboard • Data last refreshed {new Date().toLocaleTimeString()} • Dhaka, BD
        </div>
      </div>
    </div>
  )
}