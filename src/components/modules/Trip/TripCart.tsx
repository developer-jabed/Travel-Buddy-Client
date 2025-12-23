"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { createBuddyRequest } from "@/services/buddyRequest/BuddyRequest";
import { getCookie } from "@/services/auth/tokenHandlers";
import router from "next/router";

interface TravelerProfile {
  name: string;
  email: string;
  profilePhoto: string;
  city?: string;
  country?: string;
  travelStyle?: string;
  interests?: string[];
  languages?: string[];
}

interface TripType {
  id: string;
  title: string;
  userId: string;
  destination: string;
  description?: string;
  startDate: string;
  endDate: string;
  budget?: number;
  tripStatus: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  interests?: string[];
  user: { TravelerProfile: TravelerProfile; id: string };
}

interface TripCartProps {
  trips: TripType[];
}

// Date formatter: YYYY-MM-DD
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export default function TripCart({ trips }: TripCartProps) {
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerProfile | null>(null);

  const statusColors: Record<string, string> = {
    UPCOMING: "bg-blue-100 text-blue-800",
    ONGOING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const handleBuddyRequest = async (tripId: string, receiverId: string) => {
    const accessToken = getCookie("accessToken");

    if (!accessToken) {
      toast.error("Please login to send a buddy request!");
      router.push("/login");
      return;
    }

    const res = await createBuddyRequest({ tripId, receiverId });

    if (res?.success) {
      toast.success(res.message || "Buddy request sent!");
    } else {
      toast.error(res?.message || "Failed to send request");
    }
  };

  if (!trips.length)
    return <p className="text-gray-500 text-center mt-6">No trips available</p>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trips.map((trip) => {
          const traveler = trip.user.TravelerProfile;
          const receiverId = trip.userId;

          return (
            <div
              key={trip.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Traveler Profile */}
              {traveler && (
                <div
                  className="flex items-center p-4 gap-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedTraveler(traveler)}
                >
                  <Image
                    src={traveler.profilePhoto || "/default-avatar.png"}
                    alt={traveler.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover w-16 h-16 border-2 border-indigo-400 shadow-sm"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold">{traveler.name}</p>
                    <p className="text-gray-500 text-sm">{traveler.email}</p>
                    <p className="text-gray-400 text-xs">
                      {traveler.city}, {traveler.country} • {traveler.travelStyle}
                    </p>
                  </div>
                </div>
              )}

              {/* Trip Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-gray-700">
                  <h2 className="text-xl font-semibold text-gray-800">{trip.title}</h2>
                  <p className="text-gray-500 text-sm">
                    {trip.description || "No description provided"}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>
                      <strong>From:</strong> {formatDate(trip.startDate)}
                    </span>
                    <span>
                      <strong>To:</strong> {formatDate(trip.endDate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[trip.tripStatus] || "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {trip.tripStatus}
                    </span>
                    <span className="text-indigo-600 font-bold">${trip.budget ?? "N/A"}</span>
                  </div>
                </div>

                {/* Buddy Request Button */}
                <button
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => handleBuddyRequest(trip.id, receiverId)}
                >
                  Send Buddy Request
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traveler Details Popup */}
      {selectedTraveler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold text-lg"
              onClick={() => setSelectedTraveler(null)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center gap-4">
              <Image
                src={selectedTraveler.profilePhoto || "/default-avatar.png"}
                alt={selectedTraveler.name}
                width={100}
                height={100}
                className="rounded-full border-2 border-indigo-400 h-20 w-20 object-cover shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-800">{selectedTraveler.name}</h2>
              <p className="text-gray-500">{selectedTraveler.email}</p>
              <p className="text-gray-400 text-sm text-center">
                {selectedTraveler.city}, {selectedTraveler.country} • {selectedTraveler.travelStyle}
              </p>
              <p className="text-gray-600 text-sm mt-2 text-center">
                Interests: {selectedTraveler.interests?.join(", ") || "None"}
              </p>
              <p className="text-gray-600 text-sm text-center">
                Languages: {selectedTraveler.languages?.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
