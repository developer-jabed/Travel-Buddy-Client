"use client";

import React, { useState } from "react";
import Image from "next/image";
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

// Format date
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

export default function TripCart({ trips }: TripCartProps) {
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerProfile | null>(null);

  const statusColors: Record<string, string> = {
    UPCOMING: "bg-blue-100 text-blue-800",
    ONGOING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const handleViewDetails = (id: string) => {
    router.push(`/trip/${id}`);
  };

  const handleCreateTrip = () => {
    router.push("/create-trip");
  };

  const handleCreateMeetup = (tripId: string) => {
    router.push(`/meetup/create?tripId=${tripId}`);
  };

  if (!trips.length)
    return <p className="text-gray-500 text-center mt-6">No trips available</p>;

  return (
    <>
      {/* ---- HEADER CREATE TRIP BUTTON ---- */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateTrip}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
        >
          + Create Trip
        </button>
      </div>

      {/* ---- TRIP CARDS ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => {
          const traveler = trip.user.TravelerProfile;

          return (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Traveler Info */}
              {traveler && (
                <div
                  className="flex items-center p-4 gap-3 border-b border-gray-200 cursor-pointer"
                  onClick={() => setSelectedTraveler(traveler)}
                >
                  <Image
                    src={traveler.profilePhoto || "/default-avatar.png"}
                    alt={traveler.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-indigo-400"
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
              <div className="p-5 space-y-2 text-gray-700">
                <h2 className="text-xl font-semibold">{trip.title}</h2>
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
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[trip.tripStatus]
                    }`}
                  >
                    {trip.tripStatus}
                  </span>
                  <span className="text-indigo-600 font-bold">${trip.budget ?? "N/A"}</span>
                </div>

                {/* VIEW DETAILS */}
                <button
                  onClick={() => handleViewDetails(trip.id)}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  View Details
                </button>

                {/* CREATE MEETUP BUTTON */}
                <button
                  onClick={() => handleCreateMeetup(trip.id)}
                  className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  + Create Meetup
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- TRAVELER PROFILE POPUP ---- */}
      {selectedTraveler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => setSelectedTraveler(null)}
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-4">
              <Image
                src={selectedTraveler.profilePhoto || "/default-avatar.png"}
                alt={selectedTraveler.name}
                width={96}
                height={96}
                className="rounded-full border-2 border-indigo-400 object-cover"
              />

              <h2 className="text-xl font-bold">{selectedTraveler.name}</h2>
              <p className="text-gray-500">{selectedTraveler.email}</p>
              <p className="text-gray-400 text-sm">
                {selectedTraveler.city}, {selectedTraveler.country} •{" "}
                {selectedTraveler.travelStyle}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Interests: {selectedTraveler.interests?.join(", ") || "None"}
              </p>
              <p className="text-gray-600 text-sm">
                Languages: {selectedTraveler.languages?.join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
