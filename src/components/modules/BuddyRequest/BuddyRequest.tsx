/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getReceivedBuddyRequests } from "@/services/buddyRequest/BuddyRequest";
import { updateBuddyRequest } from "@/services/buddyRequest/BuddyRequest";
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
import Link from "next/link";

interface IBuddyRequest {
  id: string;
  sender: { id: string; name: string; email: string };
  receiver: { id: string; name: string; email: string };
  status: string;
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
      const res = await getReceivedBuddyRequests();
      // console.log("Received →", res);

      if (res.success && res.data?.data) {
        setRequests(res.data.data);
      } else {
        setError(res.message || "Failed to fetch buddy requests");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, status: "ACCEPTED" | "REJECTED") => {
    const toastId = toast.loading("Processing...");

    const res = await updateBuddyRequest(id, { status });

    if (res.success) {
      toast.success(`Request ${status.toLowerCase()} successfully!`, {
        id: toastId,
      });
      fetchRequests();
    } else {
      toast.error(res.message || "Failed to update", { id: toastId });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return <p className="text-gray-500 text-center mt-10">Loading requests...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!requests.length)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500 mb-4">No buddy requests found.</p>
        <Link
          href="/sent-request"
          className="text-indigo-600 underline font-semibold"
        >
          View My Sent Requests
        </Link>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Received Buddy Requests
        </h1>

        <Link href="/sent-request">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            View My Sent Requests
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="flex flex-col justify-between border-gray-200 shadow-md hover:shadow-xl transition duration-300 rounded-xl"
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

              {req.trip && (
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    {req.trip.title || req.trip.id}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {req.trip.description || "No description provided"}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      <strong>Destination:</strong> {req.trip.destination}
                    </span>
                    <span>
                      <strong>Budget:</strong>{" "}
                      <span className="text-indigo-600 font-bold">
                        {req.trip.budget ?? "N/A"}
                      </span>
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>
                      <strong>Start:</strong>{" "}
                      {new Date(req.trip.startDate).toLocaleDateString()}
                    </span>
                    <span>
                      <strong>End:</strong>{" "}
                      {new Date(req.trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 flex justify-end gap-3 border-t">
              {req.status === "PENDING" && (
                <>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleUpdate(req.id, "ACCEPTED")}
                  >
                    Accept
                  </Button>

                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleUpdate(req.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
