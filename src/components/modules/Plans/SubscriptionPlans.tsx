/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
} from "@/services/Admin/subcriptionPlan/subcriptionPlan";

import { createSubscription } from "@/services/Subscribe/subscription.api";

export default function SubscriptionPlansPage() {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);

    const router = useRouter();

    // Load all plans
    useEffect(() => {
        const loadPlans = async () => {
            try {
                const res = await getAllSubscriptionPlans({ limit: 20, page: 1 });
                if (res?.success) setPlans(res.data || []);
                else toast.error(res.message || "Failed to load plans");
            } catch (err) {
                toast.error("Error loading subscription plans");
            } finally {
                setLoading(false);
            }
        };
        loadPlans();
    }, []);

    // View plan
    const handleView = async (id: string) => {
        try {
            const res = await getSubscriptionPlanById(id);
            if (res?.success) {
                setSelectedPlan(res.data);
                setViewModalOpen(true);
            } else toast.error(res.message);
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    // Subscribe → Create Stripe Checkout session
    const handleSubscribe = async (plan: any) => {
        try {
            toast.loading("Creating payment session...");

            const res = await createSubscription({
                plan: plan.plan,
                amount: plan.finalPrice,
                paymentMethodId: "stripe-checkout",
            });

            toast.dismiss();

            if (!res?.success || !res?.data?.checkoutUrl) {
                toast.error(res.message || "Payment session failed");
                return;
            }

            const url = res.data.checkoutUrl;
            toast.success("Redirecting to checkout...");
            router.push(url);
        } catch (error: any) {
            toast.dismiss();
            toast.error(error.message || "Payment process failed");
        }
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-4xl text-center font-bold mb-2 text-blue-600 animate-fadeIn">
                Subscription Plans
            </h1>
            <p className="text-gray-500 text-center mb-8 max-w-xl animate-fadeIn">
                Choose a subscription plan that fits your needs. Upgrade anytime to get
                access to premium features and benefits.
            </p>

            {loading && <p className="text-gray-500">Loading...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {!loading &&
                    plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-sm"
                        >
                            <Card className="shadow-lg border border-gray-200 rounded-2xl bg-white hover:shadow-2xl transition-all p-6">
                                <CardTitle className="capitalize text-2xl font-bold text-gray-800 mb-4 text-center">
                                    {plan.plan}
                                </CardTitle>

                                <CardContent className="text-gray-700 space-y-3">
                                    <p className="text-center">
                                        <strong>Duration:</strong> {plan.durationDays} days
                                    </p>
                                    <p className="text-center">
                                        <strong>Base Price:</strong> ${plan.basePrice}
                                    </p>
                                    <p className="text-center">
                                        <strong>Final Price:</strong>{" "}
                                        <span className="text-green-600 font-bold">
                                            ${plan.finalPrice}
                                        </span>
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mt-5 w-full">
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-xl shadow-md"
                                            onClick={() => handleView(plan.id)}
                                        >
                                            View
                                        </Button>

                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white w-full rounded-xl shadow-md"
                                            onClick={() => handleSubscribe(plan)}
                                        >
                                            Subscribe
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
            </div>

            {/* View modal */}
            <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
                <DialogContent className="max-w-md rounded-2xl shadow-2xl bg-white p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-blue-600 text-center">
                            Plan Details
                        </DialogTitle>
                    </DialogHeader>

                    {!selectedPlan ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="text-gray-700 space-y-3 mt-4">
                            <p className="text-center">
                                <strong>Plan:</strong> {selectedPlan.plan}
                            </p>
                            <p className="text-center">
                                <strong>Duration:</strong> {selectedPlan.durationDays} days
                            </p>
                            <p className="text-center">
                                <strong>Base Price:</strong> ${selectedPlan.basePrice}
                            </p>
                            <p className="text-center">
                                <strong>Final Price:</strong> ${selectedPlan.finalPrice}
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
