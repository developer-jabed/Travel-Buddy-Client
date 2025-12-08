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

    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const router = useRouter();


    // Load all plans
    useEffect(() => {
        const loadPlans = async () => {
            try {
                const res = await getAllSubscriptionPlans({
                    limit: 20,
                    page: 1,
                });

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
            } else {
                toast.error(res.message);
            }
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

            setCheckoutUrl(url);
            toast.success("Redirecting to checkout...");

            router.push(url);

        } catch (error: any) {
            toast.dismiss();
            toast.error(error.message || "Payment process failed");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl text-center font-bold mb-3 text-blue-600">
                Subscription Plans
            </h1>
            <p className="text-gray-500 text-center mb-6">
                Choose a subscription plan that fits your needs.
            </p>

            {loading && <p className="text-gray-500">Loading...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!loading &&
                    plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="shadow-md rounded-xl border bg-white hover:shadow-xl transition p-5">
                                <CardTitle className="capitalize text-xl font-semibold text-gray-800 mb-2">
                                    {plan.plan}
                                </CardTitle>

                                <CardContent className="text-gray-700 space-y-2">
                                    <p>
                                        <strong>Duration:</strong>{" "}
                                        {plan.durationDays} days
                                    </p>
                                    <p>
                                        <strong>Base Price:</strong> $
                                        {plan.basePrice}
                                    </p>
                                    <p>
                                        <strong>Final Price:</strong>{" "}
                                        <span className="text-green-600 font-bold">
                                            ${plan.finalPrice}
                                        </span>
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mt-4 w-full">
                                        <Button
                                            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                                            onClick={() => handleView(plan.id)}
                                        >
                                            View
                                        </Button>

                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white w-full"
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
                <DialogContent className="max-w-md rounded-2xl shadow-xl bg-white p-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-blue-600">
                            Plan Details
                        </DialogTitle>
                    </DialogHeader>

                    {!selectedPlan ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="text-gray-700 space-y-3">
                            <p>
                                <strong>Plan:</strong> {selectedPlan.plan}
                            </p>
                            <p>
                                <strong>Duration:</strong>{" "}
                                {selectedPlan.durationDays} days
                            </p>
                            <p>
                                <strong>Base Price:</strong> $
                                {selectedPlan.basePrice}
                            </p>
                            <p>
                                <strong>Final Price:</strong> $
                                {selectedPlan.finalPrice}
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
