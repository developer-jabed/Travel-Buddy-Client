"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ITrip } from "@/types/trip.interface";
import { createTrip, updateTrip, deleteTrip } from "@/services/trip/trip.service";
import { toast } from "sonner";

interface TripCartProps {
  trips: ITrip[];
  refreshTrips: () => void; // function to refresh trips after create/update/delete
  loading?: boolean;
}

const formatDate = (dateString: string | Date) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function TripCart({ trips, refreshTrips }: TripCartProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedTraveler, setSelectedTraveler] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState<ITrip | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    interests: [] as string[],
  });

  const statusColors: Record<string, string> = {
    UPCOMING: "bg-blue-100 text-blue-800",
    ONGOING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => {
      const interests = new Set(prev.interests);
      if (checked) interests.add(value);
      else interests.delete(value);
      return { ...prev, interests: Array.from(interests) };
    });
  };

  const handleCreateTrip = () => {
    setFormData({
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      description: "",
      interests: [],
    });
    setIsCreateModalOpen(true);
  };

  const handleUpdateTripModal = (trip: ITrip) => {
    setActiveTrip(trip);
    setFormData({
      title: trip.title,
      destination: trip.destination,
      startDate: formatDate(trip.startDate),
      endDate: formatDate(trip.endDate),
      budget: trip.budget ?? "",
      description: trip.description ?? "",
      interests: trip.interests ?? [],
    });
    setIsUpdateModalOpen(true);
  };

  const handleSubmitCreate = async () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => fd.append(key, String(v))); // convert each array element to string
      } else if (value instanceof Blob) {
        fd.append(key, value); // keep blob as is
      } else {
        fd.append(key, String(value)); // convert anything else to string
      }
    });

    const res = await createTrip(fd);
    if (res.success) {
      toast.success("Trip created successfully!");
      setIsCreateModalOpen(false);
      refreshTrips();
    } else {
      toast.error("Create failed: " + res.message);
    }
  };


  const handleSubmitUpdate = async () => {
    if (!activeTrip) return;
    const payload = { ...formData, budget: Number(formData.budget) };
    const res = await updateTrip(activeTrip.id, payload);
    if (res.success) {
      toast.success("Trip updated successfully!");
      setIsUpdateModalOpen(false);
      refreshTrips();
    } else {
      toast.error("Update failed: " + res.message);
    }
  };

  const handleDeleteTripFunc = async (id: string) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    const res = await deleteTrip(id);
    if (res.success) {
      toast.success("Trip deleted successfully!");
      refreshTrips();
    } else {
      toast.error("Delete failed: " + res.message);
    }
  };

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
          const traveler = trip.user?.TravelerProfile;
          return (
            <div
              key={trip.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
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

              <div className="p-5 space-y-2 text-gray-700">
                <h2 className="text-xl font-semibold">{trip.title}</h2>
                <p className="text-gray-500 text-sm">
                  {trip.description || "No description provided"}
                </p>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span><strong>From:</strong> {formatDate(trip.startDate)}</span>
                  <span><strong>To:</strong> {formatDate(trip.endDate)}</span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[trip.tripStatus]}`}
                  >
                    {trip.tripStatus}
                  </span>
                  <span className="text-indigo-600 font-bold">${trip.budget ?? "N/A"}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleUpdateTripModal(trip)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDeleteTripFunc(trip.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- MODAL: CREATE / UPDATE ---- */}
      {(isCreateModalOpen || isUpdateModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => {
                setIsCreateModalOpen(false);
                setIsUpdateModalOpen(false);
              }}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              {isCreateModalOpen ? "Create Trip" : "Update Trip"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                name="budget"
                placeholder="Budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />

              <div className="flex gap-2 flex-wrap">
                {["Beach", "Adventure", "Food", "Culture"].map((interest) => (
                  <label key={interest} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleInterestsChange}
                    />
                    {interest}
                  </label>
                ))}
              </div>

              <button
                onClick={isCreateModalOpen ? handleSubmitCreate : handleSubmitUpdate}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
              >
                {isCreateModalOpen ? "Create Trip" : "Update Trip"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- TRAVELER POPUP ---- */}
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
                {selectedTraveler.city}, {selectedTraveler.country} • {selectedTraveler.travelStyle}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
