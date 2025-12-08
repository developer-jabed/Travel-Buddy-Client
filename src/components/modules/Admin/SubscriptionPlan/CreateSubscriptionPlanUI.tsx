"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { createSubscriptionPlan } from "@/services/Admin/subcriptionPlan/subcriptionPlan";
import { DiscountType, SubscriptionPlan } from "@/types/SubscriptionPlan";

export default function CreateSubscriptionPlanUI() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [plan, setPlan] = useState<SubscriptionPlan>(SubscriptionPlan.MONTHLY);
    const [durationDays, setDurationDays] = useState<number | "">("");
    const [basePrice, setBasePrice] = useState<number | "">("");
    const [discountType, setDiscountType] = useState<DiscountType | "null">("null");
    const [discountValue, setDiscountValue] = useState<number | "">("");

    const handleCreate = async () => {
        if (durationDays === "" || basePrice === "") {
            toast.error("Duration & Base Price required!");
            return;
        }

        setLoading(true);

        const payload = {
            plan,
            durationDays: Number(durationDays),
            basePrice: Number(basePrice),
            discountType: discountType === "null" ? null : discountType,
            discountValue:
                discountType === "null" ? null : Number(discountValue || 0),
            finalPrice:
                discountType === DiscountType.PERCENTAGE
                    ? Number(basePrice) - (Number(basePrice) * Number(discountValue || 0)) / 100
                    : discountType === DiscountType.FLAT
                        ? Number(basePrice) - Number(discountValue || 0)
                        : Number(basePrice),
        };

        const res = await createSubscriptionPlan(payload);

        if (!res?.success) {
            toast.error(res.message || "Failed to create!");
        } else {
            toast.success("Subscription plan created!");
            setOpen(false);
            window.location.reload(); // refresh page
        }

        setLoading(false);
    };

    const inputStyle =
        "w-full border rounded-lg p-2 mt-1 bg-white focus:ring-2 focus:ring-blue-500 transition";

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="px-5 py-2 text-sm font-medium rounded-lg">
                        Create Subscription Plan
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md rounded-xl shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">
                            Create Subscription Plan
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-3">
                        {/* PLAN */}
                        <div>
                            <label className="text-sm font-medium">Plan</label>
                            <select
                                value={plan}
                                onChange={(e) => setPlan(e.target.value as SubscriptionPlan)}
                                className={inputStyle}
                            >
                                {Object.values(SubscriptionPlan).map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* DURATION */}
                        <div>
                            <label className="text-sm font-medium">Duration (days)</label>
                            <input
                                type="number"
                                className={inputStyle}
                                value={durationDays}
                                min={1}
                                placeholder="Enter days"
                                onChange={(e) =>
                                    setDurationDays(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        {/* BASE PRICE */}
                        <div>
                            <label className="text-sm font-medium">Base Price</label>
                            <input
                                type="number"
                                className={inputStyle}
                                value={basePrice}
                                min={0}
                                placeholder="Enter base price"
                                onChange={(e) =>
                                    setBasePrice(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        {/* DISCOUNT */}
                        <div>
                            <label className="text-sm font-medium">Discount Type</label>
                            <select
                                value={discountType}
                                onChange={(e) =>
                                    setDiscountType(e.target.value as DiscountType | "null")
                                }
                                className={inputStyle}
                            >
                                <option value="null">None</option>
                                <option value={DiscountType.PERCENTAGE}>Percentage (%)</option>
                                <option value={DiscountType.FLAT}>Flat</option>
                            </select>
                        </div>

                        {discountType !== "null" && (
                            <div>
                                <label className="text-sm font-medium">Discount Value</label>
                                <input
                                    type="number"
                                    className={inputStyle}
                                    min={0}
                                    value={discountValue}
                                    placeholder="Enter discount"
                                    onChange={(e) =>
                                        setDiscountValue(
                                            e.target.value === "" ? "" : Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter className="mt-6">
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button disabled={loading} onClick={handleCreate}>
                            {loading ? "Creating..." : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
