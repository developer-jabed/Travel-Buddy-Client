"use client";

import { useEffect, useState } from "react";
import { getSentBuddyRequests } from "@/services/buddyRequest/BuddyRequest";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,

} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";

interface IBuddyRequest {
  id: string;
  sender: { id: string; name: string; email: string };
  receiver: { id: string; name: string; email: string };
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trip?: any | null;
}

export default function SentRequestsPage() {
  const [requests, setRequests] = useState<IBuddyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getSentBuddyRequests(); // YOU MUST HAVE THIS API

      if (res.success && res.data?.data) {
        setRequests(res.data.data);
      } else {
        setError(res.message || "Failed to fetch sent buddy requests");
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
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!requests.length)
    return (
      <div className="text-center mt-10 space-y-3">
        <p className="text-gray-500">No sent buddy requests found.</p>

        <Link href="/request">
          <Button className="bg-indigo-600 text-white">Back to Received</Button>
        </Link>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Sent Requests</h1>

        <Link href="/request">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Received Requests
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="flex flex-col justify-between border-gray-200 shadow-md hover:shadow-xl rounded-xl"
          >
            <CardHeader className="bg-indigo-50 p-4">
              <CardTitle className="text-lg font-semibold">
                You (Sender) → {req.receiver.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                you@example.com → {req.receiver.email}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 text-gray-700 space-y-3">
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
                  <h2 className="font-semibold">{req.trip.title}</h2>
                  <p className="text-gray-500 text-sm">{req.trip.description}</p>

                  <div className="flex justify-between text-sm">
                    <span><strong>Destination:</strong> {req.trip.destination}</span>
                    <span><strong>Budget:</strong> {req.trip.budget}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
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

          </Card>
        ))}
      </div>
    </div>
  );
}
