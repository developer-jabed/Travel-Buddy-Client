/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createReview } from "@/services/review/ReviewService";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { createReport } from "@/services/report/ReportService";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBuddyRequest } from "@/services/buddyRequest/BuddyRequest";

const DateText = ({ date }: { date: string }) => {
  if (!date) return <span>...</span>;
  return <span suppressHydrationWarning>{new Date(date).toLocaleString()}</span>;
};

export default function TravelerDetailsClient({ traveler }: any) {
  const reviews = traveler?.user?.reviewsReceived || [];
  const reports = traveler?.user?.reportsReceived || [];

  const averageRating = reviews.length
    ? (
      reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
      reviews.length
    ).toFixed(1)
    : "0.0";

  const ratingBreakdown = useMemo(() => {
    const breakdown: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r: any) => breakdown[r.rating]++);
    return breakdown;
  }, [reviews]);

  const getPercent = (count: number) =>
    reviews.length ? Math.round((count / reviews.length) * 100) : 0;

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [reason, setReason] = useState("");
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const userId = currentUser?.id;

  const handleReviewSubmit = async () => {
    if (!comment.trim()) return toast.error("Please write a comment.");
    setLoadingReview(true);
    const payload = { receiverId: traveler?.user?.id, rating, comment };
    const res = await createReview(payload);
    setLoadingReview(false);

    if (res?.success) {
      toast.success("✈️ Your review has been added!");
      setComment("");
      setRating(5);
    } else {
      toast.error(res?.message || "Failed to submit review.");
    }
  };

  const handleReportSubmit = async () => {
    if (!reason.trim()) return toast.error("Please write a valid reason.");
    setLoadingReport(true);
    const payload = { reporterId: userId, reportedId: traveler?.user?.id, reason, status: "PENDING" as const };
    const res = await createReport(payload);
    setLoadingReport(false);

    if (res?.success) {
      toast.success("🚨 Report submitted.");
      setReason("");
    } else {
      toast.error(res?.message || "Failed to submit report.");
    }
  };

  const handleSendBuddyRequest = async (receiverId: string) => {
    try {
      const res = await createBuddyRequest({ receiverId });
      if (res.success) toast.success("Buddy request sent successfully!");
      else toast.error(res.message || "Failed to send buddy request");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white via-indigo-50 to-indigo-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Image
            src={traveler.profilePhoto || "/default-avatar.png"}
            alt="Traveler Photo"
            width={140}
            height={140}
            className="rounded-full object-cover shadow-2xl border-4 border-indigo-400"
          />
        </motion.div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{traveler.name}</h1>
          <p className="text-gray-600 mt-1">{traveler.email}</p>
          <p className="mt-1 font-medium text-indigo-600">{traveler.travelStyle} Traveler</p>

          {traveler.user?.isVerified ? (
            <span className="bg-green-600 mt-4 text-white flex items-center gap-2 font-semibold text-sm px-4 py-1 rounded-full shadow-lg animate-pulse">
              <CheckCircle size={16} /> Verified
            </span>
          ) : (
            <span className="bg-red-600 mt-4 text-white flex items-center gap-2 font-semibold text-sm px-4 py-1 rounded-full shadow-lg animate-pulse">
              <XCircle size={16} /> Not Verified
            </span>
          )}

          <motion.div whileTap={{ scale: 0.95 }} className="mt-4">
            <Button
              variant="default"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 shadow-lg"
              onClick={() => handleSendBuddyRequest(traveler.user?.id)}
            >
              Send Request
            </Button>
          </motion.div>
        </div>
      </div>

      {/* About + Rating */}
      <Section title="About">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <p className="text-gray-700 max-w-full md:max-w-[70%]">{traveler.bio || "No bio available."}</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 border border-yellow-300 px-6 py-4 rounded-2xl shadow-lg flex flex-col items-center"
          >
            <span className="text-yellow-600 text-2xl font-bold">⭐ {averageRating}</span>
            <span className="text-sm text-gray-600">{reviews.length} reviews</span>
          </motion.div>
        </div>
      </Section>

      {/* Rating Breakdown */}
      <Section title="Rating Breakdown">
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-8 text-sm font-medium">{star}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getPercent(ratingBreakdown[star])}%` }}
                  className="h-full bg-yellow-400"
                />
              </div>
              <span className="w-10 text-sm text-gray-600">{ratingBreakdown[star]}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Personal Info */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoBox label="Age" value={traveler.age} />
        <InfoBox label="Gender" value={traveler.gender} />
        <InfoBox label="City" value={traveler.city} />
        <InfoBox label="Country" value={traveler.country} />
      </div>

      {/* Interests */}
      <Section title="Interests">
        {traveler.interests?.length ? (
          <div className="flex flex-wrap gap-2">{traveler.interests.map((item: string, i: number) => <Tag key={i} text={item} />)}</div>
        ) : <Empty text="No interests added." />}
      </Section>

      {/* Languages */}
      <Section title="Languages">
        {traveler.languages?.length ? (
          <div className="flex flex-wrap gap-2">{traveler.languages.map((item: string, i: number) => <Tag key={i} text={item} />)}</div>
        ) : <Empty text="No languages available." />}
      </Section>

      {/* Reviews */}
      <Section title="Reviews">
        {reviews.length ? (
          reviews.map((r: any, i: number) => <ReviewCard key={i} review={r} />)
        ) : <Empty text="No reviews yet." />}
      </Section>

      {/* Leave a Review */}
      <motion.div
        className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="font-semibold mb-2">Leave a Review</h3>
        <label className="block text-sm">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded p-2 w-full"
        >
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ⭐</option>)}
        </select>
        <label className="block text-sm mt-3">Comment</label>
        <textarea
          rows={3}
          className="border rounded p-2 w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleReviewSubmit}
          disabled={loadingReview}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 shadow-md"
        >
          {loadingReview ? "Submitting..." : "Submit Review"}
        </button>
      </motion.div>

      {/* Reports */}
      <Section title="Reports">
        {reports.length ? reports.map((rp: any, i: number) => <ReportCard key={i} report={rp} />) : <Empty text="No reports found." />}
      </Section>

      {/* Report Form */}
      <motion.div
        className="mt-6 p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="font-semibold text-red-700 mb-2">Report Traveler</h3>
        <label className="block text-sm">Reason</label>
        <textarea
          rows={3}
          className="border rounded p-2 w-full"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          onClick={handleReportSubmit}
          disabled={loadingReport}
          className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 shadow-md"
        >
          {loadingReport ? "Submitting..." : "Submit Report"}
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------ Helper Components ------------------ */
const Section = ({ title, children }: any) => (
  <div className="mt-8">
    <h2 className="text-lg font-semibold">{title}</h2>
    <div className="mt-3">{children}</div>
  </div>
);

const InfoBox = ({ label, value }: any) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
  >
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-semibold">{value || "—"}</p>
  </motion.div>
);

const Tag = ({ text }: any) => (
  <motion.span
    whileHover={{ scale: 1.1 }}
    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer transition-all"
  >
    {text}
  </motion.span>
);

const Empty = ({ text }: any) => (
  <p className="text-gray-500 italic">{text}</p>
);

const ReviewCard = ({ review }: any) => (
  <motion.div
    className="p-4 bg-white rounded-lg shadow-md mb-3 flex gap-3 hover:shadow-xl transition-all"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
  >
    <Image
      src={review?.reviewer?.photoURL || "/default-avatar.png"}
      alt="Reviewer"
      width={50}
      height={50}
      className="rounded-full object-cover shadow-sm"
    />
    <div>
      <p className="font-semibold">{review.reviewer.name}</p>
      <p className="text-sm text-gray-500">{review.reviewer.email}</p>
      <p className="text-xs text-gray-400"><DateText date={review.createdAt} /></p>
      <p className="mt-2 font-semibold text-yellow-600">⭐ {review.rating}</p>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  </motion.div>
);

const ReportCard = ({ report }: any) => (
  <motion.div
    className="p-4 bg-red-100 rounded-lg shadow-md mb-3 hover:shadow-xl transition-all"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
  >
    <p className="font-semibold text-red-700">⚠ Reason: {report.reason}</p>
    <p className="text-xs text-gray-500"><DateText date={report.createdAt} /></p>
  </motion.div>
);
