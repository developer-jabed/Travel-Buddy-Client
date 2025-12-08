/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
} from "@/services/Admin/subcriptionPlan/subcriptionPlan";

export default function SubscriptionPlansPage() {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState<any>({});

    // Load all plans
    const loadPlans = async () => {
        setLoading(true);
        const res = await getAllSubscriptionPlans();

        if (res?.success) {
            setPlans(res.data || []);
            toast.success("Plans loaded successfully!");
        } else {
            toast.error(res.message || "Failed to load subscription plans");
        }

        setLoading(false);
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await getAllSubscriptionPlans();

                if (res?.success) {
                    setPlans(res.data || []);
                } else {
                    toast.error(res.message || "Failed to load subscription plans");
                }
            } catch (error) {
                console.error("Failed to load plans", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);



    // VIEW handler
    const handleView = async (id: string) => {
        const res = await getSubscriptionPlanById(id);
        if (res?.success) {
            setSelectedPlan(res.data);
            setEditMode(false);
            setModalOpen(true);
            toast.info("Viewing plan details");
        } else toast.error(res.message);
    };

    // EDIT handler
    const handleEdit = async (id: string) => {
        const res = await getSubscriptionPlanById(id);
        if (res?.success) {
            setSelectedPlan(res.data);
            setEditData(res.data);
            setEditMode(true);
            setModalOpen(true);
        } else toast.error(res.message);
    };

    // DELETE handler
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this plan?")) return;

        const res = await deleteSubscriptionPlan(id);
        if (res?.success) {
            toast.success("Deleted successfully!");
            loadPlans();
        } else toast.error(res.message);
    };

    // UPDATE handler
    const handleUpdate = async () => {
        const base = Number(editData.basePrice);
        const discount = Number(editData.discountValue || 0);

        let finalPrice = base;

        if (editData.discountType === "PERCENTAGE") {
            finalPrice = base - (base * discount) / 100;
        } else if (editData.discountType === "FLAT") {
            finalPrice = base - discount;
        }

        finalPrice = Number(finalPrice.toFixed(2)); // ensure number

        const payload = {
            plan: editData.plan,
            durationDays: Number(editData.durationDays),
            basePrice: base,
            discountType: editData.discountType || null,
            discountValue: editData.discountType ? discount : null,
            finalPrice,
        };

        const res = await updateSubscriptionPlan(selectedPlan.id, payload);

        if (res?.success) {
            toast.success("Plan updated!");
            setModalOpen(false);
            loadPlans();
        } else toast.error(res.message);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">
                Subscription Plans
            </h1>

            {loading && <p className="text-gray-500">Loading...</p>}

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!loading &&
                    plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <Card className="shadow-md rounded-xl border bg-white hover:shadow-xl transition duration-200 p-4">

                                {/* HEADER */}
                                <div className="flex justify-between items-center">
                                    <CardTitle className="capitalize text-lg font-semibold text-gray-800">
                                        {plan.plan}
                                    </CardTitle>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                                                ⋮
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="rounded-lg shadow-lg">
                                            <DropdownMenuItem onClick={() => handleView(plan.id)}>
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEdit(plan.id)}>
                                                Update
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => handleDelete(plan.id)}
                                            >
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* BODY */}
                                <CardContent className="mt-3 space-y-2 text-gray-700">
                                    <p><strong>Duration:</strong> {plan.durationDays} days</p>
                                    <p>
                                        <strong>Final Price:</strong>{" "}
                                        <span className="text-green-600 font-bold">${plan.finalPrice}</span>
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
            </div>

            {/* MODAL */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-md p-6 rounded-2xl shadow-xl bg-white">

                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-blue-600">
                            {editMode ? "Update Subscription Plan" : "Plan Details"}
                        </DialogTitle>
                    </DialogHeader>

                    {!selectedPlan ? (
                        <p>Loading...</p>
                    ) : editMode ? (
                        /* UPDATE FORM */
                        <div className="space-y-4">

                            {/* PLAN NAME */}
                            <div>
                                <label className="text-sm text-gray-600">Plan Name</label>
                                <input
                                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                                    value={editData.plan}
                                    onChange={(e) =>
                                        setEditData({ ...editData, plan: e.target.value })
                                    }
                                />
                            </div>

                            {/* DURATION */}
                            <div>
                                <label className="text-sm text-gray-600">Duration (Days)</label>
                                <input
                                    type="number"
                                    className="w-full border rounded-lg p-2 mt-1"
                                    value={editData.durationDays}
                                    onChange={(e) =>
                                        setEditData({ ...editData, durationDays: Number(e.target.value) })
                                    }
                                />
                            </div>

                            {/* BASE PRICE */}
                            <div>
                                <label className="text-sm text-gray-600">Base Price</label>
                                <input
                                    type="number"
                                    className="w-full border rounded-lg p-2 mt-1"
                                    value={editData.basePrice}
                                    onChange={(e) =>
                                        setEditData({ ...editData, basePrice: Number(e.target.value) })
                                    }
                                />
                            </div>

                            <Button
                                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </Button>
                        </div>
                    ) : (
                        /* VIEW MODE */
                        <div className="space-y-3 text-gray-700">
                            <p><strong>Plan:</strong> {selectedPlan.plan}</p>
                            <p><strong>Duration:</strong> {selectedPlan.durationDays} days</p>
                            <p><strong>Base Price:</strong> ${selectedPlan.basePrice}</p>
                            <p><strong>Final Price:</strong> ${selectedPlan.finalPrice}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
