"use client";

import { useEffect, useState } from "react";
import { getAllBuddyRequests } from "@/services/buddyRequest/BuddyRequest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface IBuddyRequest {
  id: string;
  sender: { id: string; name: string; email: string };
  receiver: { id: string; name: string; email: string };
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trip?: any | null;
}

export default function BuddyRequestsPage() {
  const [requests, setRequests] = useState<IBuddyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllBuddyRequests({});
      if (res.success && res.data?.data) {
        setRequests(res.data.data);
      } else {
        setError(res.message || "Failed to fetch buddy requests");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Loading requests...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!requests.length)
    return <p className="text-gray-500 text-center mt-10">No buddy requests found.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl text-center font-bold text-gray-900">Buddy Requests</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="flex flex-col justify-between border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden"
          >
            <CardHeader className="bg-indigo-50 p-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {req.sender.name} → {req.receiver.name}
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                {req.sender.email} → {req.receiver.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 space-y-3 text-gray-700">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    req.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "ACCEPTED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {req.trip && (
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {req.trip.title || req.trip.id}
                  </h2>
                  <p className="text-gray-500 text-sm">{req.trip.description || "No description provided"}</p>
                  <div className="flex justify-between mt-2 text-gray-600 text-sm">
                    <span>
                      <strong>Destination:</strong> {req.trip.destination}
                    </span>
                    <span>
                      <strong>Budget:</strong>{" "}
                      <span className="text-indigo-600 font-bold">{req.trip.budget ?? "N/A"}</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm mt-1">
                    <span>
                      <strong>Start:</strong> {new Date(req.trip.startDate).toLocaleDateString()}
                    </span>
                    <span>
                      <strong>End:</strong> {new Date(req.trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 flex justify-end border-t border-gray-200">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                onClick={() => toast.success("Buddy request action here")}
              >
                Send Buddy Request
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
